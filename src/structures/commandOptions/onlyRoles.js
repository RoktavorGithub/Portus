export const onlyRolesFN = (client, message, command) => {
    if (!command.onlyRoles || !Array.isArray(command.onlyRoles) || !message.guild) return true;
    
    if (command.onlyRoles.some((roleID) => message.member?.roles.cache.has(roleID))) return true;
    else {
        if (command.returnErrors === false || command.returnOnlyRolesError === false) return false;
        message.reply(`\`⛔ | You can't use this command because you don't have the role:\`\n${command.onlyRoles.map((roleID) => `↳ <#${roleID}>`).join("\n")}`);
        

        return false;
    };
};