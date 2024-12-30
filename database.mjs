import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config(); // Načtení proměnných z .env souboru

const { Pool } = pg; // Získání Pool z defaultního exportu pg

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    ssl: {
        rejectUnauthorized: false, // Povinné pro připojení k Render databázi
    },
});

export default pool;
