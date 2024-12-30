import pkg from 'pg';
const { Client } = pkg;

const db = new Client({
    user: 'postgres', // Uživatelské jméno
    host: 'localhost', // Server
    database: 'eshop', // Název databáze
    password: 'Alenka12', // Heslo
    port: 5432, // Port (standardně 5432)
});

// Připojení k databázi
db.connect()
    .then(() => console.log('Připojeno k databázi!'))
    .catch(err => console.error('Chyba při připojování k databázi:', err.stack));

export default db;
