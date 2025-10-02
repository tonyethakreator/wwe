// Configuration settings for different environments

const config = {
  development: {
    mongoURI: process.env.MONGO_URI || 'mongodb://localhost:27017/wwe_access_org',
    jwtSecret: process.env.JWT_SECRET || 'wwe_access_dev_secret',
    jwtExpire: '24h',
    port: process.env.PORT || 5000
  },
  production: {
    mongoURI: process.env.MONGO_URI,
    jwtSecret: process.env.JWT_SECRET,
    jwtExpire: '12h',
    port: process.env.PORT || 5000
  },
  test: {
    mongoURI: 'mongodb://localhost:27017/wwe_access_org_test',
    jwtSecret: 'wwe_access_test_secret',
    jwtExpire: '24h',
    port: process.env.PORT || 5000
  }
};

// Determine which environment to use
const env = process.env.NODE_ENV || 'development';

module.exports = config[env];