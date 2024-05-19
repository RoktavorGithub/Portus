export const channelCooldownFN = async (client, message, command, interactionType) => {
    if (!command.channelCooldown || isNaN(command.channelCooldown) || !message.guild) return true;

    const dbData = `channelCoolown.${message.channel.id}.${interactionType}.${command.name}.${message.member.id}`;
    const currentTime = Date.now();
    const storedTime = client.cooldownDB?.get(dbData) ?? 0;

    if (Math.floor(currentTime - storedTime) >= command.channelCooldown || !storedTime) {
        client.cooldownDB?.set(dbData, currentTime);
        return true;
    }
    else {
        if (command.returnErrors === false || command.returnChannelCooldownError === false) return false;
        message.reply(`\`⛔ | You are currently at cooldown. Please try again in <t:${Math.floor(Math.floor(storedTime + command.channelCooldown) / 1000)}:R>.\``);

        return false;
    };
};