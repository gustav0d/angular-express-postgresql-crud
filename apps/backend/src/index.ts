import express from 'express';
import cors from 'cors';

import { testDbConnection } from './database.ts';
import { config } from './config.ts';

const app = express();

const PORT = config.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Collaborative Task Management API' });
});

(async () => {
  try {
    const dbConnected = await testDbConnection();

    app.listen(PORT, () => {
      console.log(`⚡️ Server is running on port ${PORT}`);
      console.log(`🌐 API URL: http://localhost:${PORT}`);
    });

    if (!dbConnected) {
      console.error(
        '❌ Failed to connect to the database. Server not started.',
      );
    }
  } catch (error) {
    console.error('❌ Error starting the server:', error);
    process.exit(1);
  }
})();
