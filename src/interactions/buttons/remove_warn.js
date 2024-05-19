import { ActionRowBuilder, UserSelectMenuBuilder, PermissionFlagsBits } from "discord.js";

export const Button = {
    name: "remove_warn",
    anyUserPermissions: [PermissionFlagsBits.ModerateMembers],
    deferReply: true,
    run: async (interaction) => {
        const row = new ActionRowBuilder().addComponents(
            new UserSelectMenuBuilder()
            .setCustomId("remove_WarnSelectMenu")
            .setPlaceholder("Choose...")
            .setMaxValues(1)
        );

        await interaction.followUp({
            content: "`📁 | Choose a user:`",
            components: [row]
        })
    }
}