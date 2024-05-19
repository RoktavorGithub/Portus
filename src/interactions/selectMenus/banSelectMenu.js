import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";

export const Menu = {
    name: "BanSelectMenu",
    deferReply: true,
    run: async (interaction) => {
        await interaction.message.delete();
        const userId = interaction.values[0];
        const user = interaction.guild.members.cache.get(userId);
        const botMember = interaction.guild.members.cache.get(interaction.client.user.id);
        const member = interaction.member;

        if (!user) {
            return interaction.followUp({
                content: "`⛔ | User not found...`"
            });
        };

        if (user.roles.highest.postion >= botMember.roles.highest.position || user.roles.highest.position >= member.roles.highest.position) {
            return interaction.followUp({
                content: "`⛔ | You can't ban this user because they have a higher role than me or you.`"
            });
        };

        await user.ban();
        const transcriptr = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
            .setLabel("Ban Transcript")
            .setCustomId("transcript")
            .setEmoji("📝")
            .setStyle(ButtonStyle.Primary)
        )
        interaction.message.delete();
        interaction.followUp({
            content: `\`✅ | \`${user} \`has been banned!\``,
            components: [transcriptr]
        });
    },
};