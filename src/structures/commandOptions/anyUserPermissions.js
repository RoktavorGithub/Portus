export const anyUserPermissionsFN = (client, message, command) => {
    if (!command.anyUserPermissions || !Array.isArray(command.anyUserPermissions) || !message.guild) return true;
    if (command.anyUserPermissions.some((permission) => message.member?.permissions.has(permission))) return true;
    else {
        if (command.returnErrors === false || command.returnAnyUserPermissionsError === false) return false;
        message.reply(`\`⛔ | You lack the permission to execute this command. Please get the following permission:\`\n${command.anyUserPermissions.map((permission) => `↳ \`${permission}\``).join("\n")}`);
        
        return false;
    };
};