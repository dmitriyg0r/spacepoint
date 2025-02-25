import { useState } from 'react';
import './Login.css';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Здесь будет логика аутентификации
    // Для примера просто проверим наличие данных
    if (!email || !password) {
      setError('Пожалуйста, заполните все поля');
      return;
    }
    
    // Имитация успешного входа
    onLogin({ email, name: 'Пользователь', id: 1 });
  };

  return (
    <div className="login-container">
      <div className="login-form-container">
        <h2>Вход в аккаунт</h2>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Введите ваш email"
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