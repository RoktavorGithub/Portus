import { Sequelize, DataTypes } from "sequelize";

const sequelize = new Sequelize("postgresql://postgres:lol@localhost:5432/postgres");

export const Warn = sequelize.define("warnings", {
    user_id: {
        type: DataTypes.STRING,
        allowNull: false
    },
    moderator_id: {
        type: DataTypes.STRING,
        allowNull: false
    },
    reason:  {
        type: DataTypes.TEXT,
        allowNull: false
    },
    timestamp: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false
    }
}, {
    timestamps: false
});
