import { useState } from 'react';
import './Chat.css';

function Chat() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, sender: 'Анна', text: 'Привет! Как дела?', time: '10:15', isOwn: false },
    { id: 2, sender: 'Вы', text: 'Привет! Всё хорошо, спасибо! Как у тебя?', time: '10:17', isOwn: true },
    { id: 3, sender: 'Анна', text: 'Тоже неплохо. Что нового?', time: '10:18', isOwn: false },
    { id: 4, sender: 'Вы', text: 'Изучаю React и создаю социальную сеть :)', time: '10:20', isOwn: true },
    { id: 5, sender: 'Анна', text: 'Звучит интересно! Удачи с проектом!', time: '10:22', isOwn: false },
  ]);
  
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    const newMessage = {
      id: Date.now(),
      sender: 'Вы',
      text: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isOwn: true
    };
    
    setMessages([...messages, newMessage]);
    setMessage('');
  };
  
  return (
    <div className="chat-container">
      <div className="chat-sidebar">
        <div className="chat-search">
          <input type="text" placeholder="Поиск чатов..." />
        </div>
        
        <div className="chat-list">
          <div className="chat-item active">
            <img src="https://randomuser.me/api/portraits/women/2.jpg" alt="Аватар" />
            <div className="chat-item-info">
              <h4>Анна Смирнова</h4>
              <p>Звучит интересно! Удачи с проектом!</p>
            </div>
            <span className="chat-time">10:22</span>
          </div>
          
          <div className="chat-item">
            <img src="https://randomuser.me/api/portraits/men/3.jpg" alt="Аватар" />
            <div className="chat-item-info">
              <h4>Иван Петров</h4>
              <p>Привет! Как насчет встречи завтра?</p>
            </div>
            <span className="chat-time">Вчера</span>
          </div>
          
          <div className="chat-item">
            <img src="https://randomuser.me/api/portraits/women/5.jpg" alt="Аватар" />
            <div className="chat-item-info">
              <h4>Мария Иванова</h4>
              <p>Спасибо за информацию!</p>
            </div>
            <span className="chat-time">Вчера</span>
          </div>
        </div>
      </div>
      
      <div className="chat-main">
        <div className="chat-header">
          <div className="chat-header-user">
            <img src="https://randomuser.me/api/portraits/women/2.jpg" alt="Аватар" />
            <div>
              <h3>Анна Смирнова</h3>
              <span className="online-status">В сети</span>
            </div>
          </div>
          <div className="chat-header-actions">
            <button>📞</button>
            <button>📹</button>
            <button>⋮</button>
          </div>
        </div>
        
        <div className="chat-messages">
          {messages.map(msg => (
            <div key={msg.id} className={`message ${msg.isOwn ? 'own' : ''}`}>
              <div className="message-content">
                <p>{msg.text}</p>
                <span className="message-time">{msg.time}</span>
              </div>
            </div>
          ))}
        </div>
        
        <form className="chat-input" onSubmit={handleSendMessage}>
          <button type="button" className="attach-button">📎</button>
          <input 
            type="text" 
            placeholder="Введите сообщение..." 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit" className="send-button">📤</button>
        </form>
      </div>
    </div>
  );
}

export default Chat; 