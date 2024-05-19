import { ActionRowBuilder, PermissionFlagsBits, UserSelectMenuBuilder } from "discord.js";

export const MsgCommand = {
    name: "timeoutselectmenu",
    aliases: ["timeout"],
    anyUserPermissions: [PermissionFlagsBits.ModerateMembers],
    run: (client, message) => {
        const selectMenu = new ActionRowBuilder().addComponents(
            new UserSelectMenuBuilder()
            .setCustomId("TimeoutSelectMenu")
            .setPlaceholder("Choose...")
            .setMaxValues(1)
        )

            message.channel.send({
                content: "`📁 | Choose a user:`",
                components: [selectMenu]
            });
    }
}