import { join } from 'path';
import dotenv from 'dotenv-safe';

const cwd = process.cwd();
const root = join.bind(cwd);

dotenv.config({
  path: root('.env'),
  sample: root('.env.example'),
});

const ENV = process.env;

const config = {
  PORT: parseInt(ENV.PORT ?? '3000'),
  DB_HOST: ENV.DB_HOST ?? 'localhost',
  DB_USER: ENV.DB_USER ?? 'postgres',
  DB_PASSWORD: ENV.DB_PASSWORD ?? 'postgres',
  DB_NAME: ENV.DB_NAME ?? 'task_management',
  DB_PORT: parseInt(ENV.DB_PORT ?? '5432'),
};

export { config };
