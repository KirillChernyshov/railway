import {DataTypes, Model, InferAttributes, InferCreationAttributes} from "sequelize";
import jwt from 'jsonwebtoken';
import sequelize from "~/server/db";
import {useRuntimeConfig} from "#imports";

const config = useRuntimeConfig();

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    declare id: number;
    declare name: string;
    declare user_role: number;
    declare email: string;
    declare password: string;
    declare token: string;

    async generateAuthToken() {
        const token = jwt.sign({ id: this.id }, config.jwtSecretWord);
        await this.update({ token: token });

        return token
    };
}

User.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    user_role: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    token: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    sequelize,
    modelName: 'rw_user'
});

User.sync().then(() => {
    console.log('Init User model');
});

export default User;
