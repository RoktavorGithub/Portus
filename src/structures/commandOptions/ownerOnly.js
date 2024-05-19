import { OWNER_IDS } from "../../config.js";

export const ownerOnlyFN = (client, message, command) => {
    if (!command.ownerOnly || typeof command.ownerOnly !== "boolean") return true;

    if (OWNER_IDS.some((userID) => userID == (message.user ?? message.author)?.id)) return true;
    else {
        if (command.returnErrors === false || command.returnOwnerOnlyError === false) return false;
        message.reply("`⛔ | You can't access this command. This command is reserved for the developer of the bot.`");
        
        return false;
    };
};