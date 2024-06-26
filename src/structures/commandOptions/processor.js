import { allClientPermissionsFN } from "./allClientPermissions.js";
import { allUserPermissionsFN } from "./allUserPermissions.js";
import { anyClientPermissionsFN } from "./anyClientPermissions.js";
import { anyUserPermissionsFN } from "./anyUserPermissions.js";
import { channelCooldownFN } from "./channelCooldown.js";
import { globalCooldownFN } from "./globalCooldown.js";
import { guildCooldownFN } from "./guildCooldown.js";
import { onlyChannelsFN } from "./onlyChannels.js";
import { onlyGuildsFN } from "./onlyGuilds.js";
import { onlyRolesFN } from "./onlyRoles.js";
import { onlyUsersFN } from "./onlyUsers.js";
import { ownerOnlyFN } from "./ownerOnly.js";

export default async (client, message, command, interactionType) => {
    const allClientPermissions = allClientPermissionsFN(client, message, command);
    const anyClientPermissions = anyClientPermissionsFN(client, message, command);
    const allUserPermissions = allUserPermissionsFN(client, message, command);
    const anyUserPermissions = anyUserPermissionsFN(client, message, command);
    const channelCooldown = await channelCooldownFN(client, message, command, interactionType);
    const globalCooldown = await globalCooldownFN(client, message, command, interactionType);
    const guildCooldown = await guildCooldownFN(client, message, command, interactionType);
    const onlyChannels = onlyChannelsFN(client, message, command);
    const onlyGuilds = onlyGuildsFN(client, message, command);
    const onlyRoles = onlyRolesFN(client, message, command);
    const onlyUsers = onlyUsersFN(client, message, command);
    const ownerOnly = ownerOnlyFN(client, message, command);
    const finalCorrection = [
        allClientPermissions, 
        anyClientPermissions, 
        allUserPermissions, 
        anyUserPermissions, 
        channelCooldown, 
        guildCooldown, 
        globalCooldown, 
        onlyChannels, 
        onlyGuilds, 
        onlyRoles, 
        onlyUsers, 
        ownerOnly
    ];
    if (finalCorrection.includes(false)) return false;
    else return true;
};