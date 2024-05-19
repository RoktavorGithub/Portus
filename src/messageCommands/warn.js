import { ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionFlagsBits } from "discord.js";
export const MsgCommand = {
    name: "warn",
    anyUserPermissions: [PermissionFlagsBits.ModerateMembers],
    run: async (client, message, args) => {
        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
            .setCustomId("warn")
            .setLabel("Warn A Member")
            .setEmoji({ name: "📖" })
            .setStyle(ButtonStyle.Danger),

            new ButtonBuilder()
            .setCustomId("see_warn")
            .setLabel("Check Warns")
            .setEmoji({ name: "📋" })
            .setStyle(ButtonStyle.Primary),

            new ButtonBuilder()
            .setCustomId("remove_warn")
            .setLabel("Remove Warns")
            .setEmoji({ name: "✅" })
            .setStyle(ButtonStyle.Success)
        );

        message.channel.send({
            content: "`📁 | Choose an option:`",
            components: [row]
        });
    },
}