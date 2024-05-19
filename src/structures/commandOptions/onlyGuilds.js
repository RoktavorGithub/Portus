export const onlyGuildsFN = (client, message, command) => {
    if (!command.onlyGuilds || !Array.isArray(command.onlyGuilds) || !message.guild) return true;
    
    if (command.onlyGuilds.some((guildID) => message.guild?.id == guildID)) return true;
    else {
        if (command.returnErrors === false || command.returnOnlyGuildsError === false) return false;
        message.reply(`\`⛔ | This command can't be ran in this guild. Please run it in these guilds:\`\n${command.onlyGuilds.map((guildID) => `↳ <#${guildID}>`).join("\n")}`);

        return false;
    };
};