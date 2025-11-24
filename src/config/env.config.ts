import dotenv from 'dotenv';

import { envSchema } from '@/schemas/env.schema';
import type { EnvConfig, ProcessEnv } from '@/types/env.type';
import { formatJoiErrors } from '@/utils/format.util';

import type { ValidationResult } from 'joi';

dotenv.config({
  path: ['.env.local', '.env'],
  debug: true,
});

const envValid: ValidationResult<ProcessEnv> = envSchema
  .prefs({ errors: { label: 'key' } })
  .validate(process.env, { abortEarly: false, stripUnknown: true });

if (envValid.error) {
  console.error('Validation errors:');
  console.error({
    name: envValid.error.name,
    errors: formatJoiErrors(envValid.error),
  });
  process.exit(1);
}

const envConfig: EnvConfig = {
  nodeEnv: envValid.value.NODE_ENV,
  app: {
    host: envValid.value.APP_HOST,
    port: envValid.value.APP_PORT,
  },
};

export default envConfig;
