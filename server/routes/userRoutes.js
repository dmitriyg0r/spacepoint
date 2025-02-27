const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const pool = require('../config/database');

// Настройка multer для загрузки файлов
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, '../../uploads/avatars');
    // Создаем директорию, если она не существует
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'avatar-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Не поддерживаемый формат файла'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  }
});

// Маршрут для загрузки аватара
router.post('/upload-avatar', upload.single('avatar'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Файл не загружен' });
    }

    const userId = req.body.userId;
    const avatarUrl = `/uploads/avatars/${req.file.filename}`;

    // Получаем текущий аватар пользователя
    const result = await pool.query(
      'SELECT avatar_url FROM users WHERE id = $1',
      [userId]
    );

    const oldAvatarUrl = result.rows[0]?.avatar_url;

    // Обновляем URL аватара в базе данных
    await pool.query(
      'UPDATE users SET avatar_url = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2',
      [avatarUrl, userId]
    );

    // Удаляем старый файл аватара, если это не дефолтный аватар
    if (oldAvatarUrl && !oldAvatarUrl.includes('default.png')) {
      const oldFilePath = path.join(__dirname, '../..', oldAvatarUrl);
      if (fs.existsSync(oldFilePath)) {
        fs.unlinkSync(oldFilePath);
      }
    }

    res.json({
      success: true,
      avatarUrl: avatarUrl
    });
  } catch (error) {
    console.error('Ошибка при загрузке аватара:', error);
    
    // Удаляем загруженный файл в случае ошибки
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    
    res.status(500).json({
      error: 'Произошла ошибка при загрузке аватара'
    });
  }
});

module.exports = router; 