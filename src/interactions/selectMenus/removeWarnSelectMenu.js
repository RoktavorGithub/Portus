import pkg from "pg";

const { Pool } = pkg;
const pool = new Pool({
    user: "postgres",
    password: "lol",
    host: "localhost",
    port: 5432,
    database: "postgres",
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000
});

export const Menu = {
    name: "remove_WarnSelectMenu",
    deferReply: true,
    run: async (interaction) => {
        const userid = interaction.values[0];
        const user = interaction.guild.members.cache.get(userid);

        try {
            const query = "DELETE FROM warnings WHERE user_id = $1";
            const values = [userid];

            const { rowCount } = await pool.query(query, values);

            if (rowCount === 0) {
                await interaction.editReply({
                    content: `\`✅ |\` ${user} \`has no existing warns!\``
                });
            } else {
                await interaction.editReply({
                    content: `\`✅ |\` ${user} \`has been removed of all warnings!\``
                });
            };
        } catch (error) {
            console.log(error)
            await interaction.editReply({
                content: "`⛔ | An error occured with the database. Please try again.`"
            });
        };
    },
};