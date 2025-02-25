import './News.css';

function News() {
  return (
    <div className="news-container">
      <div className="news-header">
        <h2>Новости</h2>
      </div>
      
      <div className="news-content">
        <div className="news-item">
          <div className="news-item-header">
            <h3>Запуск новой социальной сети</h3>
            <span className="news-date">15 ноября 2023</span>
          </div>
          <p className="news-text">
            Мы рады сообщить о запуске нашей новой социальной сети! Здесь вы сможете общаться с друзьями, 
            делиться новостями и находить интересный контент.
          </p>
          <div className="news-actions">
            <button className="like-button">❤️ 24</button>
            <button className="comment-button">💬 5</button>
          </div>
        </div>
        
        <div className="news-item">
          <div className="news-item-header">
            <h3>Новые функции в разделе чата</h3>
            <span className="news-date">18 ноября 2023</span>
          </div>
          <p className="news-text">
            Мы добавили новые функции в раздел чата: групповые беседы, отправка файлов и голосовые сообщения.
            Попробуйте прямо сейчас!
          </p>
          <div className="news-actions">
            <button className="like-button">❤️ 18</button>
            <button className="comment-button">💬 3</button>
          </div>
        </div>
        
        <div className="news-item">
          <div className="news-item-header">
            <h3>Раздел игр теперь доступен</h3>
            <span className="news-date">20 ноября 2023</span>
          </div>
          <p className="news-text">
            Мы запустили раздел игр, где вы можете играть в мини-игры прямо в браузере. 
            Соревнуйтесь с друзьями и устанавливайте рекорды!
          </p>
          <div className="news-actions">
            <button className="like-button">❤️ 32</button>
            <button className="comment-button">💬 7</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default News; 