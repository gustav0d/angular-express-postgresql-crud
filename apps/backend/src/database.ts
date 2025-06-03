import { Sequelize } from 'sequelize';
import { config } from './config.ts';

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: config.DB_HOST,
  username: config.DB_USER,
  password: config.DB_PASSWORD,
  database: config.DB_NAME,
  port: config.DB_PORT,
  logging: false,
});

export const startDbConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log(
      '✅ Connection to the database has been established successfully.',
    );

    await sequelize.sync({ alter: true });
    console.log('✅ Database synchronized successfully');

    return true;
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
    return false;
  }
};

export default sequelize;
