export const allUserPermissionsFN = (client, message, command) => {
    if (!command.allUserPermissions || !Array.isArray(command.allUserPermissions) || !message.guild) return true;
    const missingPermissions = message.member?.permissions.missing(command.allUserPermissions);
    if (!missingPermissions?.length) return true;
    else {
        if (command.returnErrors === false || command.returnAllUserPermissionsError === false) return false;
        message.reply(`\`⛔ | You lack multiple permissions to execute this command. Please get the following permissions:\`\n${missingPermissions.map((permission) => `↳ \`${permission}\``).join("\n")}`);
        
        return false;
    };
};