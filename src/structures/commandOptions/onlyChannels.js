export const onlyChannelsFN = (client, message, command) => {
    if (!command.onlyChannels || !Array.isArray(command.onlyChannels) || !message.guild) return true;
    
    if (command.onlyChannels.some((channelId) => message.channel?.id == channelId)) return true;
    else {
        if (command.returnErrors === false || command.returnOnlyChannelsError === false) return false;
        message.reply(`\`⛔ | This command can't be executed in this channel. You will have to run this command in these channels:\`\n${command.onlyChannels.map(channelId => `↳ <#${channelId}>`).join("\n")}`);

        return false;
    };
};