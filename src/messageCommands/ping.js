import { EmbedBuilder } from "discord.js";

export const MsgCommand = {
    name: "ping",
    run: (client, message) => {
        const messageLatency = message.createdTimestamp - Date.now();
        const clientLatency = client.ws.ping;
        const embed = new EmbedBuilder()
        .setColor("Green")
        .setTitle("Bot Latency")
        .addFields(
            {
                name: "📊 Message Latency",
                value: `${messageLatency} ms`,
                inline: true    
            },
            {
                name: "<:njs:1226739911550570567> Client Latency",
                value: `${clientLatency} ms`,
                inline: true
            },
        )
        .setFooter({ text: "Portus Technologies" })
        .setTimestamp();
        message.channel.send({ embeds: [embed] })
    }
}; 