import { ActionRowBuilder, UserSelectMenuBuilder, PermissionFlagsBits } from "discord.js";

export const Button = {
    name: "see_warn",
    anyUserPermissions: [PermissionFlagsBits.ModerateMembers],
    deferReply: true,
    run: async (interaction) => {
        const row = new ActionRowBuilder().addComponents(
            new UserSelectMenuBuilder()
            .setCustomId("check_WarnSelectMenu")
            .setPlaceholder("Choose...")
            .setMaxValues(1)
        );

        await interaction.followUp({
            content: "`📁 | Choose a user:`",
            components: [row]
        })
    }
}