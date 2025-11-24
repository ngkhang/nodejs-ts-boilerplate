import Joi from 'joi';

import type { ProcessEnv } from '@/types/env.type';

export const envSchema = Joi.object<ProcessEnv>()
  .keys({
    NODE_ENV: Joi.valid('development', 'production', 'test').required(),
    APP_HOST: Joi.string().hostname().required(),
    APP_PORT: Joi.number().port().required(),
  })
  .unknown();
