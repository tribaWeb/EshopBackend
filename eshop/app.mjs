import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import session from 'express-session';

import indexRoutes from './routes/index.mjs';
import productsRoutes from './routes/products.mjs';
import adminRoutes from './routes/admin.mjs';
import authRoutes from './routes/auth.mjs';
import { requireAdmin } from './middleware/auth.mjs';

const app = express();
const PORT = 3000;

// Nastavení __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Nastavení session (musí být před routami)
app.use(session({
    secret: 'tajny_klic', // Silný tajný klíč
    resave: false, // Minimalizace zbytečných zápisů do session
    saveUninitialized: true, // Uložení nové session, i když není inicializována
}));

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.use('/', indexRoutes);
app.use('/products', productsRoutes);

// Ochrana administrace (middleware musí být použito před /admin routou)
app.use('/admin', requireAdmin, adminRoutes);

// Route pro autentizaci
app.use('/auth', authRoutes);

// Start server
app.listen(PORT, () => console.log(`Server běží na http://localhost:${PORT}`));
