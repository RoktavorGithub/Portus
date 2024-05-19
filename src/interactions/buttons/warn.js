import { ActionRowBuilder, PermissionFlagsBits, UserSelectMenuBuilder } from "discord.js";

export const Button = {
    name: "warn",
    anyUserPermissions: [PermissionFlagsBits.ModerateMembers],
    deferReply: true,
    run: async (interaction) => {
        const row = new ActionRowBuilder().addComponents(
            new UserSelectMenuBuilder()
            .setPlaceholder("Choose...")
            .setCustomId("warnSelectMenu")
            .setMaxValues(1)
        );

        interaction.editReply({
            content: "`📁 | Please choose a user to warn:`",
            components: [row]
        });
    },
};