import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, PermissionFlagsBits } from "discord.js";
import { AntiLink } from "../models/antiLinkModel.js";

export const MsgCommand = {
    name: "antilink",
    aliases: ["al"],
    anyUserPermissions: [PermissionFlagsBits.Administrator],
    run: async (client, message, args)  => {
        try {
            const antilinkstatus = await AntiLink.findOne({
                where: {
                    guildid: message.guild.id
                },
            });
            const embed = new EmbedBuilder()
            .setTitle("🔗 | Anti-Link System")
            .setDescription("# ANTI-LINK/ADVERTISEMENT FEATURE:\n`This feature will automatically detect links and delete it. This will ensure that a server can be free of malicious links.`\n# LEGENDS:\n `🟢 = Anti-Link is On, 🔴 = Anti-Link is Off, ⚫ = No Data of the Server`")
            .setColor("Blue")
            .setTimestamp();
    
            const row = new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                .setCustomId("als")
                .setLabel("Toggle Anti-Link")
                .setStyle(ButtonStyle.Secondary)
                .setEmoji({ name: antilinkstatus ? (antilinkstatus.antiLinkStatus ? "🟢" : "🔴") : "⚫" })
            );
    
            message.channel.send({
                embeds: [embed],
                components: [row]
            });
        } catch (error) {
            console.log("Error fetching Anti-Link Status Data:", error);
        };
    },
};