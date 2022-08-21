import {DataTypes, InferAttributes, InferCreationAttributes, Model} from "sequelize";
import sequelize from "~/server/db";

class Train extends Model<InferAttributes<Train>, InferCreationAttributes<Train>> {
    declare id: number;
    declare type: string;
    declare color: string;
}

Train.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    color: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    sequelize,
    modelName: 'train'
});

Train.sync().then(() => {
    console.log('Init Train model');
});

export default Train;
