import { EmbedBuilder } from "discord.js";

export const Slash = {
    name: "ping",
    description: "Shows the bot's latency.",
    run: (interaction, client) => {
        const messageLatency = interaction.createdTimestamp - Date.now();
        const clientLatency = client.ws.ping;
        const embed = new EmbedBuilder()
        .setColor("Green")
        .setTitle("Bot Latency")
        .addFields(
            {
                name: "📊 API Latency",
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
        interaction.reply({ embeds: [embed] });
    }
}; // Simple /Ping command
