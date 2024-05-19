import { EmbedBuilder } from "discord.js";
import { Warn } from "../../models/warnModel.js";
import moment from "moment";

export const Menu = {
    name: "warnSelectMenu",
    deferReply: true,
    run: async (interaction) => {
        const userid = interaction.values[0];
        const user = interaction.guild.members.cache.get(userid);
        const botMember = interaction.guild.members.cache.get(interaction.client.user.id);
        const member = interaction.member;

        if (user.roles.highest.postion >= botMember.roles.highest.position || user.roles.highest.position >= member.roles.highest.position) {
            return interaction.followUp({
                content: "`⛔ | You can't warn this user because they have a higher role than me or you.`"
            });
        };
        try {
            await interaction.editReply({
                content: "`📝 | Please send the reason for the warn in the chat:`"
            });

            const filter = (m) => m.author.id === interaction.user.id;
            const collector = interaction.channel.createMessageCollector({
                filter,
                time: 60000,
                max: 1
            });

            collector.on("collect", async (message) => {
                const moderator = interaction.user.id;
                const reason = message.content;
                const timestamp = moment(Date.now()).format("MMMM D, YYYY h:mm:ss A");
                const newWarn = await Warn.create({
                    user_id: userid,
                    moderator_id: moderator,
                    reason,
                    timestamp: new Date()
                });

                const totalWarnings = await Warn.count({
                    where: {
                        user_id: userid
                    }
                });

                const embed = new EmbedBuilder()
                .setTitle("📁 | Warn Information")
                .addFields(
                    { name: "📋 | User Warned:", value: `${user}`, inline: true },
                    { name: "🔨 | Moderator", value: `<@${moderator}>`, inline: true },
                    { name: "📄 | Reason", value: `\`${reason}\``, inline: true },
                    { name: "⌚ | Timestamp", value: `\`${timestamp}\``, inline: true },
                    { name: "📂 | Total Warnings:", value: `\`${totalWarnings.toString()}\``, inline: true }
                )
                .setThumbnail(user.displayAvatarURL());
                
                await interaction.editReply({
                    content: `\`✅ |\` ${user} \`has been successfully warned.\``,
                    embeds: [embed]
                });

                console.log("New warn record created:", newWarn);
                collector.stop();
            });

            collector.on("end", async (collected) => {
                if (collected.size === 0) {
                    await interaction.editReply({
                        content: "`⛔ | You didn't provide a reason for the wwarning within the time limit.`"
                    });
                };
            });
        } catch (error) {
            console.error("Error creating warn record:", error);
            await interaction.editReply({
                content: "`⛔ | An error occured while creating the warn record. Please try again.`"
            });
        }
    },
};