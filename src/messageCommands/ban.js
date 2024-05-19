import { ActionRowBuilder, PermissionFlagsBits, UserSelectMenuBuilder } from "discord.js";

export const MsgCommand = {
    name: "banselectmenu",
    aliases: ["ban"],
    anyUserPermissions: [PermissionFlagsBits.BanMembers],
    run: (client, message) => {
        const selectMenu = new ActionRowBuilder().addComponents(
            new UserSelectMenuBuilder()
            .setCustomId("BanSelectMenu")
            .setPlaceholder("Choose...")
            .setMaxValues(1)
        )

            message.channel.send({
                content: "`📁 | Choose a user:`",
                components: [selectMenu]
            });
    }
}