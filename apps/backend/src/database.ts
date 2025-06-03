import { Sequelize } from 'sequelize';
import { config } from './config.ts';

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: config.DB_HOST || 'localhost',
  username: config.DB_USER || 'postgres',
  password: config.DB_PASSWORD || 'postgres',
  database: config.DB_NAME || 'task_management',
  port: config.DB_PORT || 5432,
  logging: false,
});

export const testDbConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log(
      '✅ Connection to the database has been established successfully.',
    );
    return true;
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
    return false;
  }
};

export default sequelize;
