import express from 'express';

const router = express.Router();

const adminCredentials = {
    username: 'admin',
    password: 'admin123',
};

// Přihlašovací stránka
router.get('/login', (req, res) => {
    res.render('login', { title: 'Přihlášení', error: '' }); // Vždy předáváme `error`
});
router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error('Chyba při odhlašování:', err);
        }
        res.redirect('/auth/login');
    });
});
// Zpracování přihlášení
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (username === adminCredentials.username && password === adminCredentials.password) {
        req.session.isAdmin = true; // Nastavení session
        console.log('Session po přihlášení:', req.session); // Debug log
        res.redirect('/products');
    } else {
        res.render('login', { 
            title: 'Přihlášení', 
            error: 'Nesprávné přihlašovací údaje' 
        });
    }
});

export default router;
