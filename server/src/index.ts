import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config({ path: '../.env' });

type CorsOptions = {
  origin: string;
  method: 'GET' | 'POST' | 'PUT';
};

type FeatureFlag = {
  isTelegramShareEnabled: boolean;
};

const server = express();
const port = process.env.SERVER_PORT || 5000;
const corsOptions: CorsOptions = {
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  method: 'GET',
};

server.use(cors(corsOptions));
server.get('/api/feature-flags', (req, res) => {
  const featureFlag: FeatureFlag = {
    isTelegramShareEnabled: true,
  };
  res.json(featureFlag);
});

server.listen(port);
