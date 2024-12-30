import express from 'express';
import db from '../database.mjs';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM products');
        const products = result.rows;
        console.log('Session v /products:', req.session); // Debug
        res.render('products', { 
            title: 'Seznam produktů', 
            products, 
            session: req.session || {} // Předání session do šablony
        });
    } catch (err) {
        console.error('Chyba při načítání produktů:', err.stack);
        res.status(500).send('Chyba při načítání produktů.');
    }
});

export default router;
