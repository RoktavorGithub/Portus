export const allClientPermissionsFN = (client, message, command) => {
    if (!command.allClientPermissions || !Array.isArray(command.allClientPermissions) || !message.guild) return true;
    const missingPermissions = message.guild?.members?.me?.permissions.missing(command.allClientPermissions);
    if (!missingPermissions?.length) return true;
    else {
        if (command.returnErrors === false || command.returnAllClientPermissionsError === false) return false;
        message.reply(`\`⛔ | This bot is missing multiple permissions to execute this command. Give the bot the following permissions:\n${missingPermissions.map((permission) => `↳ \`${permission}\``).join("\n")}\``);

        return false;
    };
};