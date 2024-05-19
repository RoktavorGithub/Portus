export const globalCooldownFN = async (client, message, command, interactionType) => {
    if (!command.guildCooldown || isNaN(command.guildCooldown)) return true;

    const dbData = `globalCooldown.${interactionType}.${command.name}.${message.member.id}`;
    const currentTime = Date.now();
    const storedTime = client.cooldownDB?.get(dbData) ?? 0;

    if (Math.floor(currentTime - storedTime) >= command.guildCooldown || !storedTime) {
        client.cooldownDB?.set(dbData, currentTime);
        return true;
    }
    else {
        if (command.returnErrors === false || command.returnGlobalCooldownError === false) return false;
        message.reply(`\`⛔ | You are currently at cooldown. Please try again in <t:${Math.floor(Math.floor(storedTime + command.guildCooldown) / 1000)}:R>.\``);

        return false;
    };
};