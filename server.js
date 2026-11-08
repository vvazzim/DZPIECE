import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());

// Health Check for Render
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    app: 'DZPIECE',
    timestamp: new Date().toISOString()
  });
});

// Serve Vite Production Build
const distPath = path.join(__dirname, 'dist');
app.use(express.static(distPath));

// SPA Fallback for any client-side routes
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 DZPIECE Web Service running on port ${PORT}`);
});
