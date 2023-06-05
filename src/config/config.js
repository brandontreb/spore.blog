const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');
const fs = require('fs');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    PORT: Joi.number().default(3000),    
    JWT_SECRET: Joi.string().required().description('JWT secret key'),
    JWT_ACCESS_EXPIRATION_MINUTES: Joi.number().default(30).description('minutes after which access tokens expire'),
    JWT_REFRESH_EXPIRATION_DAYS: Joi.number().default(30).description('days after which refresh tokens expire'),    
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,  
  jwt: {
    secret: envVars.JWT_SECRET,
    accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,    
  },  
  hugo: {
    config:  (() => {return fs.existsSync('data/hugo/config.json') ? JSON.parse(fs.readFileSync('data/hugo/config.json', {"flag": 'rs'}, 'utf8')) : {}})(),
    contentDir: 'data/hugo/content',
    staticDir: 'data/hugo/static',
  },
  user: (() => {return fs.existsSync('data/user.json') ? JSON.parse(fs.readFileSync('data/user.json', {"flag": 'rs'}, 'utf8')) : null})()
};
