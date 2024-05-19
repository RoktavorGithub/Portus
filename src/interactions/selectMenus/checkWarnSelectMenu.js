import { EmbedBuilder } from "discord.js";
import { Warn } from "../../models/warnModel.js";
import moment from "moment";

export const Menu = {
    name: "check_WarnSelectMenu",
    deferReply: true,
    run: async (interaction) => {
        const userid = interaction.values[0];
        const user = interaction.guild.members.cache.get(userid);

        try {
            const warnings = await Warn.findAll({
                where: {
                    user_id: userid
                },
                order: [["timestamp", "DESC"]]
            });

            const embedDescription = warnings.map(async (warning, index) => {
                const moderator = await interaction.guild.members.cache.get(warning.moderator_id);
                const timestamp = moment(warning.timestamp).format("MMMM D, YYYY h:mm:ss A");

                return [
                    `**Warning Case ${index + 1}:**`,
                    `\`🔨 | Moderator:\` ${moderator}`,
                    `\`📋 | Reason: ${warning.reason}\``,
                    `\`📟 | Date Warned: ${timestamp.toString()}\``
                ].join("\n");
            });

            const resolvedDescriptions = await Promise.all(embedDescription)
            if (warnings.length > 0) {
                const embed = new EmbedBuilder()
                .setTitle(`📁 | Warning Cases:`)
                .setDescription(`${resolvedDescriptions.join("\n\n\n")}`)
                .setColor("Green")
    
                await interaction.editReply({
                    content: `\`📁 | Showing all warnings cases for:\` ${user}`,
                    embeds: [embed]
                });
            } else {
                const embed = new EmbedBuilder()
                .setTitle(`📁 | Warning Cases:`)
                .setDescription("`✅ | No existing warns for this user.`")
                .setColor("Green")
                await interaction.editReply({
                    embeds: [embed]
                });
            }
        } catch (error) {
            console.log("Error fetching documents:", error);
            await interaction.editReply({
                content: "`⛔ | An error occured with the database. Please try again.`"
            });
        };
    },
};