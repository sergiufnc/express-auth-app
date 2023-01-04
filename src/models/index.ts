import { Sequelize } from 'sequelize';
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_USER } from '../config';

import UserModel from './user.model';

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: "mysql",
});

const db: any = {};

db.sequelize = sequelize;

db.users = UserModel(sequelize, Sequelize);

export default db
