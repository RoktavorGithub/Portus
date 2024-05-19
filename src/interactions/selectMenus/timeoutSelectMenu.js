export const Menu = {
    name: "TimeoutSelectMenu",
    deferReply: true,
    run: async (interaction) => {
        const userId = interaction.values[0];
        const user = interaction.guild.members.cache.get(userId);
        const botMember = interaction.guild.members.cache.get(interaction.client.user.id);
        const member = interaction.member;

        if (!user) {
            return interaction.followUp({
                content: "`⛔ | User not found...`"
            });
        }

        if (user.roles.highest.postion >= botMember.roles.highest.position || user.roles.highest.position >= member.roles.highest.position) {
            return interaction.followUp({
                content: "`⛔ | You can't time out this user because they have a higher role than me or you.`"
            });
        }

        await user.timeout(20000)
            await interaction.followUp({
                content: `\`✅ |\` ${user}\`has been timed out!\``
        });
    },
};