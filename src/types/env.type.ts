export type NodeEnv = 'development' | 'production' | 'test';

export interface EnvConfig {
  nodeEnv: NodeEnv;
  app: {
    host: string;
    port: number;
  };
}

export interface ProcessEnv {
  NODE_ENV: NodeEnv;
  APP_HOST: string;
  APP_PORT: number;
}
