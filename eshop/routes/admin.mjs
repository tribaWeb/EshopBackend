import express from 'express';
import db from '../database.mjs';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM products');
        const products = result.rows;
        res.render('admin', { 
            title: 'Administrace produktů', 
            products, 
            session: req.session || {} // Předání session do šablony
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Chyba při načítání produktů.');
    }
});

// Přidání nového produktu
router.post('/add', async (req, res) => {
    const { name, description, price } = req.body;
    try {
        await db.query('INSERT INTO products (name, description, price) VALUES ($1, $2, $3)', [name, description, price]);
        res.redirect('/admin');
    } catch (err) {
        console.error(err);
        res.status(500).send('Chyba při přidávání produktu.');
    }
});

router.post('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const { name, description, price } = req.body;
    try {
        await db.query('UPDATE products SET name = $1, description = $2, price = $3 WHERE id = $4', [name, description, price, id]);
        res.redirect('/admin');
    } catch (err) {
        console.error(err);
        res.status(500).send('Chyba při úpravě produktu.');
    }
});
router.get('/edit/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query('SELECT * FROM products WHERE id = $1', [id]);
        const product = result.rows[0];
        res.render('edit', { 
            title: 'Upravit produkt', 
            product, 
            session: req.session || {} // Předání session do šablony
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Chyba při načítání produktu.');
    }
});
// Smazání produktu
router.post('/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM products WHERE id = $1', [id]);
        res.redirect('/admin');
    } catch (err) {
        console.error(err);
        res.status(500).send('Chyba při mazání produktu.');
    }
});

export default router;
