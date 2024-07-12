import * as dotenv from 'dotenv';
dotenv.config();

const { MONGO_URL, JWT_SECRET_KEY, PORT } = process.env;

export const configEnvs = {
  mongoURL: MONGO_URL,
  jwt: JWT_SECRET_KEY,
  port: PORT,
};
