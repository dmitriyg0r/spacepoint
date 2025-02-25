import { useState } from 'react';
import './Navigation.css';

function Navigation({ activePage, onNavigate, user }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  return (
    <nav className="main-navigation">
      <div className="nav-container">
        <div className="nav-logo">
          <h1>Социальная сеть</h1>
        </div>
        
        <div className={`nav-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          <a 
            href="#" 
            className={activePage === 'news' ? 'active' : ''} 
            onClick={() => onNavigate('news')}
          >
            <span className="nav-icon">📰</span>
            <span className="nav-text">Новости</span>
          </a>
          <a 
            href="#" 
            className={activePage === 'chat' ? 'active' : ''} 
            onClick={() => onNavigate('chat')}
          >
            <span className="nav-icon">💬</span>
            <span className="nav-text">Чат</span>
          </a>
          <a 
            href="#" 
            className={activePage === 'games' ? 'active' : ''} 
            onClick={() => onNavigate('games')}
          >
            <span className="nav-icon">🎮</span>
            <span className="nav-text">Игры</span>
          </a>
          <a 
            href="#" 
            className={activePage === 'profile' ? 'active' : ''} 
            onClick={() => onNavigate('profile')}
          >
            <span className="nav-icon">👤</span>
            <span className="nav-text">Профиль</span>
          </a>
        </div>
        
        <div className="nav-user">
          {user && (
            <div className="user-info">
              <img src={user.avatar || "https://via.placeholder.com/40"} alt="Аватар" />
              <span>{user.name}</span>
            </div>
          )}
          <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navigation; 