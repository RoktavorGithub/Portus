export const anyClientPermissionsFN = (client, message, command) => {
    if (!command.anyClientPermissions || !Array.isArray(command.anyClientPermissions) || !message.guild) return true;
    if (command.anyClientPermissions.some((permission) => message.guild?.members.me?.permissions.has(permission))) return true;
    else {
        if (command.returnErrors === false || command.returnAnyClientPermissionsError === false) return false;
        message.reply(`\`⛔ | The bot is lacking the permission to execute this command. Give this bot the following permission:\`\n${command.anyClientPermissions.map((permission) => `↳ \`${permission}\``).join("\n")}`);

        return false;
    };
};