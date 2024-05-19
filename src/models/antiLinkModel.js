import { Sequelize, DataTypes } from "sequelize";

const sequelize = new Sequelize("postgresql://postgres:lol@localhost:5432/postgres");

export const AntiLink = sequelize.define("antilink", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    guildid: {
        type: DataTypes.STRING,
        allowNull: false
    },

    antilinkstatus: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    }
    }, {
        tableName: "antilink",
        schema: "antilink",
        timestamps: false
});