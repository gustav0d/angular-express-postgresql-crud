import express from 'express';
import cors from 'cors';

import { startDbConnection } from './database.ts';
import { config } from './config.ts';
import { router } from './router.ts';
import { serverErrorCatcher } from './modules/error/serverErrorCatcher.ts';

const app = express();

const PORT = config.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.use(serverErrorCatcher);

try {
  await startDbConnection();

  app.listen(PORT, () => {
    console.log(`⚡️ Server is running on port ${PORT}`);
    console.log(`🌐 API URL: http://localhost:${PORT}`);
  });
} catch (error) {
  console.error('❌ Error starting the server:', error);
  process.exit(1);
}
