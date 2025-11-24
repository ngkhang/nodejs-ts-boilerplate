import dotenv from 'dotenv';

dotenv.config({
  path: ['.env.local', '.env'],
  debug: true,
});

type NodeEnv = 'development' | 'production' | 'test';
interface EnvVars {
  nodeEnv: NodeEnv;
  app: {
    host: string;
    port: number;
  };
}

const envConfig: EnvVars = {
  nodeEnv: (process.env.NODE_ENV || 'development') as NodeEnv,
  app: {
    host: process.env.APP_HOST || 'localhost',
    port: Number(process.env.APP_PORT),
  },
} as const;

export default envConfig;
