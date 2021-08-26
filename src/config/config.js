import dotenv from 'dotenv';

dotenv.config();

const config = {
  mongoDbDetails: {
    dbUrl: process.env.MONGO_DB_URL,
  },
  serverDetails: {
    port: process.env.PORT,
    hostName: process.env.HOSTNAME,
  },
  isProduction: process.env.NODE_ENV 
};

export default config;
