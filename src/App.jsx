import { useState } from 'react';
import Login from './components/Login';
import Profile from './components/Profile';
import Navigation from './components/Navigation';
import News from './components/News';
import Chat from './components/Chat';
import Games from './components/Games';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [activePage, setActivePage] = useState('profile');

  const handleLogin = (userData) => {
    setUser(userData);
    setActivePage('news'); // После входа показываем новости
  };

  const handleLogout = () => {
    setUser(null);
  };

  const handleNavigate = (page) => {
    setActivePage(page);
  };

  // Рендерим активную страницу
  const renderPage = () => {
    switch (activePage) {
      case 'news':
        return <News />;
      case 'chat':
        return <Chat />;
      case 'games':
        return <Games />;
      case 'profile':
        return <Profile user={user} onLogout={handleLogout} />;
      default:
        return <News />;
    }
  };

  return (
    <div className="app">
      {user ? (
        <>
          <Navigation 
            activePage={activePage} 
            onNavigate={handleNavigate} 
            user={user} 
          />
          <div className="page-container">
            {renderPage()}
          </div>
        </>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;