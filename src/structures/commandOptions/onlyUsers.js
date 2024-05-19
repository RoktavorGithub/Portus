export const onlyUsersFN = (client, message, command) => {
    if (!command.onlyUsers || !Array.isArray(command.onlyUsers)) return true;
    
    if (command.onlyUsers.some((userID) => (message.user ?? message.author)?.id == userID)) return true;
    else {
        if (command.returnErrors === false || command.returnOnlyUsersError === false) return false;
        message.reply("`⛔ | You can't use this command as it is reserved for authorized users.`");
        
        return false;
    };
};