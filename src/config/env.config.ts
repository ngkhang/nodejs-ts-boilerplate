import dotenv from 'dotenv';
import Joi from 'joi';

import { formatJoiErrors } from '@/utils/format.util';

dotenv.config({
  path: ['.env.local', '.env'],
  debug: true,
});

type NodeEnv = 'development' | 'production' | 'test';
interface EnvConfig {
  nodeEnv: NodeEnv;
  app: {
    host: string;
    port: number;
  };
}

interface ProcessEnv {
  NODE_ENV: NodeEnv;
  APP_HOST: string;
  APP_PORT: number;
}

const envSchema = Joi.object<ProcessEnv>()
  .keys({
    NODE_ENV: Joi.valid('development', 'production', 'test').required(),
    APP_HOST: Joi.string().hostname().required(),
    APP_PORT: Joi.number().port().required(),
  })
  .unknown();

const result: Joi.ValidationResult<ProcessEnv> = envSchema
  .prefs({ errors: { label: 'key' } })
  .validate({ ...process.env, email: 'abc' }, { abortEarly: false, stripUnknown: true });

if (result.error) {
  console.error('Validation errors:');
  console.error({
    name: result.error.name,
    errors: formatJoiErrors(result.error),
  });
  process.exit(1);
}

const envConfig: EnvConfig = {
  nodeEnv: result.value.NODE_ENV,
  app: {
    host: result.value.APP_HOST,
    port: result.value.APP_PORT,
  },
};

export default envConfig;
