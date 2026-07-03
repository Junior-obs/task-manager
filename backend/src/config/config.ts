export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    type:
      (process.env.DB_TYPE as 'mysql' | 'better-sqlite3') || 'better-sqlite3',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT, 10) || 3306,
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'task_manager_db',
  },
  jwt: {
    secret:
      process.env.JWT_SECRET ||
      'CLE_SECRETE_SUPER_SECURISANTE_UNIPRO_2026_GI_C',
    expiresIn: process.env.JWT_EXPIRES_IN || '1d',
  },
  weatherApiKey: process.env.WEATHER_API_KEY || '',
});
