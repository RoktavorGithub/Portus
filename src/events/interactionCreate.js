import commandOptionsChecker from "../structures/commandOptions/processor.js";

export const Event = {
    name: "interactionCreate",
    run: async (interaction, client) => {
        try {
            switch (true) {
                case interaction.isChatInputCommand():
                    await handleSlashCommand(interaction, client);
                    break;
                case interaction.isAutocomplete():
                    await handleAutocomplete(interaction, client);
                    break;
                case interaction.isContextMenuCommand():
                    await handleContextMenu(interaction, client);
                    break;
                case interaction.isAnySelectMenu():
                    await handleSelectMenu(interaction, client);
                    break;
                case interaction.isButton():
                    await handleButton(interaction, client);
                    break;
                case interaction.isModalSubmit():
                    await handleModal(interaction, client);
                    break;
                default:
                    console.error(`Unhandled interaction type: ${interaction.type}`);
                    await interaction.reply({
                        content: "`Unsupported interaction type!`",
                        ephemeral: true,
                    });
            }
        } catch (error) {
            console.error(error);
            await interaction.reply({
                content: "`There was an error while executing this interaction!`",
                ephemeral: true,
            });
        }
    },
};

async function handleButton(interaction, client) {
    const buttonInteraction = client.buttonCommands.get(interaction.customId);
    if (!buttonInteraction) {
        console.log("No button command found for customId:", interaction.customId);
        return;
    }

    // Defer the reply if the button interaction may take longer than 3 seconds
    if (buttonInteraction.deferReply) {
        await interaction.deferReply({
            ephemeral: true
        });
    }

    if (!await commandOptionsChecker(client, interaction, buttonInteraction, "Button")) return;
    await buttonInteraction.run(interaction, client);
}

async function handleModal(interaction, client) {
    const modalInteraction = client.modalForms.get(interaction.customId);
    if (!modalInteraction) return;

    // Defer the reply if the modal interaction may take longer than 3 seconds
    if (modalInteraction.deferReply) {
        await interaction.deferReply({
            ephemeral: true
        });
    }

    if (!await commandOptionsChecker(client, interaction, modalInteraction, "ModalForm")) return;
    await modalInteraction.run(interaction, client);
}

async function handleAutocomplete(interaction, client) {
    const slashCommand = client.slashCommands.get(interaction.commandName);
    if (!slashCommand || !slashCommand.autocomplete) return;

    // Defer the reply if the autocomplete interaction may take longer than 3 seconds
    if (slashCommand.autocomplete.deferReply) {
        await interaction.deferReply({
            ephemeral: true
        });
    }

    if (!await commandOptionsChecker(client, interaction, slashCommand, "SlashCommand")) return;
    await slashCommand.autocomplete(interaction, client);
}
async function handleSelectMenu(interaction, client) {
    const selectMenuInteraction = client.selectMenus.get(interaction.customId);
    if (!selectMenuInteraction) return;

    // Defer the reply if the select menu interaction may take longer than 3 seconds
    if (selectMenuInteraction.deferReply) {
        await interaction.deferReply({
            ephemeral: true
        });
    }

    if (!await commandOptionsChecker(client, interaction, selectMenuInteraction, "SelectMenu")) return;
    await selectMenuInteraction.run(interaction, client);
}
// InteractionCreate event to handle all interactions and execute them.