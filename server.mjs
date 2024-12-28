import express from 'express';
import fs from 'fs';
import path from 'path';
import { readCSV, writeCSV } from './modules/csvReader.mjs';

const app = express();
const PORT = 3000;
const __dirname = path.resolve();

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json()); // Pro práci s JSON requesty

const filePath = path.join(__dirname, 'data', 'products.csv');

// Načtení produktů
app.get('/api/products', async (req, res) => {
  try {
    const products = await readCSV(filePath);
    res.json(products);
  } catch (error) {
    console.error('Chyba při načítání produktů:', error);
    res.status(500).json({ error: 'Nepodařilo se načíst data.' });
  }
});

// Přidání produktu
app.post('/api/products', async (req, res) => {
  try {
    const newProduct = req.body;
    const products = await readCSV(filePath);

    // Generování nového ID
    newProduct.id = products.length > 0 ? Math.max(...products.map(p => +p.id)) + 1 : 1;

    products.push(newProduct);
    await writeCSV(filePath, products);

    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Chyba při přidávání produktu:', error);
    res.status(500).json({ error: 'Nepodařilo se přidat produkt.' });
  }
});

// Aktualizace produktu
app.put('/api/products/:id', async (req, res) => {
  try {
    const id = +req.params.id;
    const updatedProduct = req.body;

    const products = await readCSV(filePath);
    const index = products.findIndex(p => +p.id === id);

    if (index === -1) {
      return res.status(404).json({ error: 'Produkt nenalezen.' });
    }

    products[index] = { ...products[index], ...updatedProduct };
    await writeCSV(filePath, products);

    res.json(products[index]);
  } catch (error) {
    console.error('Chyba při aktualizaci produktu:', error);
    res.status(500).json({ error: 'Nepodařilo se aktualizovat produkt.' });
  }
});

// Smazání produktu
app.delete('/api/products/:id', async (req, res) => {
  try {
    const id = +req.params.id;

    const products = await readCSV(filePath);
    const filteredProducts = products.filter(p => +p.id !== id);

    if (products.length === filteredProducts.length) {
      return res.status(404).json({ error: 'Produkt nenalezen.' });
    }

    await writeCSV(filePath, filteredProducts);
    res.status(204).send();
  } catch (error) {
    console.error('Chyba při mazání produktu:', error);
    res.status(500).json({ error: 'Nepodařilo se smazat produkt.' });
  }
});

// Spuštění serveru
app.listen(PORT, () => {
  console.log(`Server běží na http://localhost:${PORT}`);
});
