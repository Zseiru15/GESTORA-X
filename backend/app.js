import express from 'express';
import cors from 'cors';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas básicas
app.get('/', (req, res) => {
  res.json({ 
    message: '🚀 API de GESTORA-X funcionando correctamente',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK',
    message: 'Servidor en funcionamiento'
  });
});

// ⚠️ ELIMINA CUALQUIER LÍNEA QUE TENGA '*' SOLO
// En lugar de app.use('*', ...) usa:

// Manejo de rutas no encontradas - FORMA CORRECTA
app.use((req, res) => {
  res.status(404).json({
    error: 'Ruta no encontrada',
    path: req.originalUrl,
    method: req.method
  });
});

export default app;