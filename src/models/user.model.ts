import { User } from "@/interfaces/users.interface";

const UserModel = (sequelize, Sequelize) => {
    const UserModel: User = sequelize.define("user", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        email: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        }
    });

    return UserModel;
};

export default UserModel;