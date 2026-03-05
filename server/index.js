import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3031;

// Middleware
app.use(cors());
app.use(bodyParser.json());

let db;

// Initialize Database
async function initDb() {
    db = await open({
        filename: join(__dirname, 'database.db'),
        driver: sqlite3.Database
    });

    await db.exec(`
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT,
      phone TEXT,
      message TEXT,
      is_read BOOLEAN DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS packages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      price TEXT,
      details TEXT,
      type TEXT DEFAULT 'standard',
      is_popular BOOLEAN DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY,
      value TEXT
    );
  `);

    // Seed initial data if empty
    const packageCount = await db.get('SELECT count(*) as count FROM packages');
    if (packageCount.count === 0) {
        await db.run('INSERT INTO packages (name, price, details, is_popular) VALUES (?, ?, ?, ?)',
            'الباقة الأساسية', '199', 'مساحة 2 تيرا\nدعم فني 12/7\nتثبيت وسيرفر محلي', 0);
        await db.run('INSERT INTO packages (name, price, details, is_popular) VALUES (?, ?, ?, ?)',
            'باقة المحترفين', '399', 'مساحة 10 تيرا\nدعم فني 24/7\nتطبيقات الموبايل\nنسخ احتياطي تلقائي', 1);
        await db.run('INSERT INTO packages (name, price, details, is_popular) VALUES (?, ?, ?, ?)',
            'الباقة المؤسسية', '899', 'مساحة غير محدودة\nدعم فني VIP\nتخصيص كامل للنظام\nسيرفرات فائقة السرعة', 0);
    }

    const settingsCount = await db.get('SELECT count(*) as count FROM settings');
    if (settingsCount.count === 0) {
        await db.run('INSERT INTO settings (key, value) VALUES (?, ?)', 'phone', '+966 5XX XXX XXX');
        await db.run('INSERT INTO settings (key, value) VALUES (?, ?)', 'whatsapp', '966XXXXXXXXX');
        await db.run('INSERT INTO settings (key, value) VALUES (?, ?)', 'email', 'hello@servrk.com');
        await db.run('INSERT INTO settings (key, value) VALUES (?, ?)', 'instagram', '#');
        await db.run('INSERT INTO settings (key, value) VALUES (?, ?)', 'facebook', '#');
        await db.run('INSERT OR IGNORE INTO settings (key, value) VALUES (?, ?)', 'tiktok', '#');
        await db.run('INSERT OR IGNORE INTO settings (key, value) VALUES (?, ?)', 'passcode', '1234');
        await db.run('ALTER TABLE messages ADD COLUMN is_read BOOLEAN DEFAULT 0');
    }
    try {
    } catch (e) {
        console.log(`Error: ${e}`);
    }
}

// Routes - Auth
app.post('/api/login', async (req, res) => {
    const { passcode } = req.body;
    try {
        const savedPasscode = await db.get('SELECT value FROM settings WHERE key = ?', 'passcode');
        if (savedPasscode && passcode === savedPasscode.value) {
            res.json({ success: true, token: 'servrk-secret-session' });
        } else {
            res.status(401).json({ success: false, message: 'رمز الدخول غير صحيح' });
        }
    } catch (err) {
        res.status(500).json({ error: 'خطأ في الخادم' });
    }
});

// Routes - Messages
app.post('/api/messages', async (req, res) => {
    const { name, email, phone, message } = req.body;
    try {
        const result = await db.run('INSERT INTO messages (name, email, phone, message) VALUES (?, ?, ?, ?)', name, email, phone, message);
        res.status(201).json({ id: result.lastID });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/messages', async (req, res) => {
    try {
        const messages = await db.all('SELECT * FROM messages ORDER BY created_at DESC');
        res.json(messages);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/api/messages/:id/read', async (req, res) => {
    const { id } = req.params;
    try {
        await db.run('UPDATE messages SET is_read = 1 WHERE id = ?', id);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Routes - Packages
app.get('/api/packages', async (req, res) => {
    try {
        const packages = await db.all('SELECT * FROM packages');
        res.json(packages);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/packages', async (req, res) => {
    const { name, price, details, is_popular } = req.body;
    try {
        const result = await db.run('INSERT INTO packages (name, price, details, is_popular) VALUES (?, ?, ?, ?)', name, price, details, is_popular ? 1 : 0);
        res.status(201).json({ id: result.lastID });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/api/packages/:id', async (req, res) => {
    const { id } = req.params;
    const { name, price, details, is_popular } = req.body;
    try {
        await db.run('UPDATE packages SET name = ?, price = ?, details = ?, is_popular = ? WHERE id = ?', name, price, details, is_popular ? 1 : 0, id);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/packages/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await db.run('DELETE FROM packages WHERE id = ?', id);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Routes - Settings
app.get('/api/settings', async (req, res) => {
    try {
        const rows = await db.all('SELECT * FROM settings');
        const settings = {};
        rows.forEach(row => {
            settings[row.key] = row.value;
        });
        res.json(settings);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/settings', async (req, res) => {
    const settings = req.body;
    try {
        for (const [key, value] of Object.entries(settings)) {
            await db.run('INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)', key, value);
        }
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Start Server
initDb().then(() => {
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
}).catch(err => {
    console.error('Failed to initialize database:', err);
});
