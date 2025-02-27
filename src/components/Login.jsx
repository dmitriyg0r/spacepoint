import { useState } from 'react';
import './Login.css';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Простая проверка для тестового пользователя
    if (username === 'test' && password === 'test') {
      onLogin({
        id: 3,
        username: 'test',
        name: 'Тестовый Пользователь',
        avatar: 'https://randomuser.me/api/portraits/lego/1.jpg',
        friends: 5,
        photos: 10
      });
    } else {
      setError('Неверный логин или пароль');
    }
  };

  return (
    <div className="login-container">
      <div className="login-form-container">
        <h2>Вход в аккаунт</h2>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Логин</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Введите ваш логин"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Пароль</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Введите ваш пароль"
              required
            />
          </div>
          
          <button type="submit" className="login-button">Войти</button>
        </form>
        
        <div className="login-footer">
          <p>Еще нет аккаунта? <a href="#">Зарегистрироваться</a></p>
          <p><a href="#">Забыли пароль?</a></p>
        </div>
      </div>
    </div>
  );
}

export default Login; 