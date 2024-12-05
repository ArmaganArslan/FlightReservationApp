const Joi = require('joi');

const envSchema = Joi.object({
  PORT: Joi.number().default(5000),
  MONGODB_URI: Joi.string().required(),
  SCHIPHOL_APP_ID: Joi.string().required(),
  SCHIPHOL_APP_KEY: Joi.string().required(),
  API_BASE_URL: Joi.string().required(),
  NODE_ENV: Joi.string().valid('development', 'production').default('development')
}).unknown();

const validateEnv = () => {
  const { error, value } = envSchema.validate(process.env);
  
  if (error) {
    throw new Error(`Environment validation error: ${error.message}`);
  }

  return value;
};

module.exports = validateEnv; 