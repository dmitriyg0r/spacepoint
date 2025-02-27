const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
require('dotenv').config();

// Импорт маршрутов
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
// const postRoutes = require('./routes/postRoutes');
// const commentRoutes = require('./routes/commentRoutes');
// const chatRoutes = require('./routes/chatRoutes');
// const gameRoutes = require('./routes/gameRoutes');

// Импорт middleware
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Статические файлы
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use(express.static(path.join(__dirname, '../public')));

// Если мы в production, обслуживаем статические файлы из build директории
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));
}

// API маршруты
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
// app.use('/api/posts', postRoutes);
// app.use('/api/comments', commentRoutes);
// app.use('/api/chat', chatRoutes);
// app.use('/api/games', gameRoutes);

// Базовый маршрут для API
app.get('/api', (req, res) => {
  res.json({ message: 'API социальной сети работает!' });
});

// Все остальные GET-запросы направляем на index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Обработка ошибок
app.use(errorHandler);

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});

