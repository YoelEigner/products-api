require('dotenv').config();

exports.config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_NAME,
    port: 1433,
    options: {
        trustedConnection: false,
        trustServerCertificate: true
    }
};
