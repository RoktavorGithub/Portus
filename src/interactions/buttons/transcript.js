import { AttachmentBuilder } from "discord.js";
import { writeFile } from "fs/promises";
import path from "path";
import { dirname } from "node:path";
import { access, constants } from "fs/promises";

export const Button = {
    name: "transcript",
    deferReply: true,
    run: async (interaction) => {
        try {
            const scriptDir = dirname(new URL(import.meta.url).pathname);
            let currentDir = scriptDir;

            while (true) {
                try {
                    await access(currentDir, constants.F_OK);
                    break;
                } catch (err) {
                    if (err.code === "ENOENT") {
                        currentDir = path.dirname(currentDir);
                        continue;
                    } else {
                        throw err;
                    }
                }
            }

            console.log("Using directory:", currentDir);

            const transcriptData = await getTranscriptData(interaction);
            if (!transcriptData.length) {
                return interaction.editReply({
                    content: "`⛔ | No transcript data found...`",
                    ephemeral: true
                });
            }

            const transcriptContent = transcriptData.map((message) => {
                return `${message.author}: ${message.content}`
            }).join("\n");

            const transcriptFilePath = path.join(currentDir, "transcript.txt");
            console.log("Tanscript file path:", transcriptFilePath)
            await writeFile(transcriptFilePath, transcriptContent);

            const transcriptFile = new AttachmentBuilder(transcriptFilePath, "transcript.txt");
            await interaction.editReply({
                content: `\`✅ | Transcript File:\``,
                files: [transcriptFile]
            });
        } catch (error) {
            console.error(error);
            await interaction.editReply({
                content: "`⛔ | Failed to create transcript.`"
            });
        }
    }
}

 async function getTranscriptData(interaction) {
    if (!interaction || !interaction.channel || !interaction.channel.messages) {
        console.error("Invalid interaction object:", interaction);
        return [];
    }
    try {
        const messages = await interaction.channel.messages.fetch({
            limit: 100
        });

        let userBanMessage = null;
        const botMessages = messages.filter(
            message => {
                if (message.author.bot) {
                    // If the user's message started with "p%ban", check if the bot's message indicates a successful ban
                    if (userBanMessage && message.content.trim().endsWith("`has been banned!`")) {
                        // Stop fetching messages once the ban is successful
                        userBanMessage = null;
                        return false;
                    }
                    return true;
                } else {
                    // Check if the user's message starts with "p%ban"
                    if (message.content.trim().startsWith("p%ban")) {
                        userBanMessage = message;
                        return true;
                    }
                    return false;
                }
            }
        );

        return botMessages.map(message => ({
            author: message.author.username,
            content: message.content
        }));       
    } catch (error) {
        console.error("Error fetching messages:", error);
        throw error;
    }
}