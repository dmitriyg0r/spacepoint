import { useState, useEffect, useRef } from 'react';
import { posts } from '../data/users';
import './Profile.css';

function Profile({ user, onLogout }) {
  const [userPosts, setUserPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [isFriendsListVisible, setIsFriendsListVisible] = useState(false);
  const fileInputRef = useRef(null);
  
  // Загружаем посты пользователя при монтировании компонента
  useEffect(() => {
    // Получаем посты текущего пользователя из тестовых данных
    const userPostsData = posts[user.id] || [];
    setUserPosts([...userPostsData]);
  }, [user.id]);
  
  // Закрытие модального окна при нажатии Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setIsFriendsListVisible(false);
      }
    };
    
    if (isFriendsListVisible) {
      document.addEventListener('keydown', handleEscape);
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isFriendsListVisible]);

  // Блокировка скролла при открытом модальном окне
  useEffect(() => {
    if (isFriendsListVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isFriendsListVisible]);
  
  const handleAddPost = (e) => {
    e.preventDefault();
    if (!newPost.trim()) return;
    
    const post = {
      id: Date.now(),
      userId: user.id,
      content: newPost,
      likes: 0,
      comments: 0,
      date: new Date().toISOString().split('T')[0]
    };
    
    setUserPosts([post, ...userPosts]);
    setNewPost('');
  };
  
  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  const handleAvatarChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Проверяем тип файла
    if (!file.type.startsWith('image/')) {
      alert('Пожалуйста, выберите изображение');
      return;
    }

    // Проверяем размер файла (например, максимум 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Размер файла не должен превышать 5MB');
      return;
    }

    const formData = new FormData();
    formData.append('avatar', file);
    formData.append('userId', user.id);

    try {
      const response = await fetch('http://localhost:5000/api/users/upload-avatar', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Ошибка при загрузке аватара');
      }

      const data = await response.json();
      
      if (data.success) {
        // Обновляем URL аватара в интерфейсе
        const newAvatarUrl = `http://localhost:5000${data.avatarUrl}`;
        // Здесь нужно обновить состояние пользователя в вашем приложении
        // Например, через контекст или Redux
        console.log('Аватар успешно загружен:', newAvatarUrl);
        
        // Перезагружаем страницу или обновляем состояние пользователя
        window.location.reload();
      }
    } catch (error) {
      console.error('Ошибка:', error);
      alert('Произошла ошибка при загрузке аватара');
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-content">
        <aside className="profile-sidebar">
          <div className="profile-sidebar-content">
            <div className="profile-info">
              <div className="profile-avatar" onClick={handleAvatarClick}>
                <img src={user.avatar || "https://via.placeholder.com/150"} alt="Аватар пользователя" />
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleAvatarChange}
                  accept="image/*"
                  style={{ display: 'none' }}
                />
              </div>
              <h2>{user.name}</h2>
              <p>{user.email}</p>
              <div className="profile-stats">
                <div className="stat" onClick={() => setIsFriendsListVisible(true)} style={{ cursor: 'pointer' }}>
                  <span className="stat-value">{user.friends || 0}</span>
                  <span className="stat-label">Друзья</span>
                </div>
                <div className="stat">
                  <span className="stat-value">{userPosts.length}</span>
                  <span className="stat-label">Посты</span>
                </div>
                <div className="stat">
                  <span className="stat-value">{user.photos || 0}</span>
                  <span className="stat-label">Фото</span>
                </div>
              </div>
              <button className="edit-profile-button">Редактировать профиль</button>
            </div>
          </div>
        </aside>
        
        {/* Модальное окно со списком друзей */}
        {isFriendsListVisible && (
          <>
            <div className="modal-overlay" onClick={() => setIsFriendsListVisible(false)}></div>
            <div className="friends-modal">
              <div className="friends-modal-header">
                <h3>Друзья</h3>
                <button className="close-modal" onClick={() => setIsFriendsListVisible(false)}>✕</button>
              </div>
              <div className="friends-modal-content">
                <div className="friends-search">
                  <input type="text" placeholder="Поиск друзей..." />
                </div>
                <div className="friends-grid">
                  {[
                    {
                      id: 1,
                      name: 'Анна Смирнова',
                      avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
                      isOnline: true
                    },
                    {
                      id: 2,
                      name: 'Иван Петров',
                      avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
                      isOnline: false
                    },
                    {
                      id: 3,
                      name: 'Мария Иванова',
                      avatar: 'https://randomuser.me/api/portraits/women/5.jpg',
                      isOnline: true
                    },
                    {
                      id: 4,
                      name: 'Алексей Козлов',
                      avatar: 'https://randomuser.me/api/portraits/men/7.jpg',
                      isOnline: false
                    },
                    {
                      id: 5,
                      name: 'Елена Соколова',
                      avatar: 'https://randomuser.me/api/portraits/women/8.jpg',
                      isOnline: true
                    }
                  ].map(friend => (
                    <div key={friend.id} className="friend-item">
                      <div className="friend-avatar">
                        <img src={friend.avatar} alt={friend.name} />
                        <span className={`online-status ${friend.isOnline ? 'online' : 'offline'}`}></span>
                      </div>
                      <span className="friend-name">{friend.name}</span>
                      <button className="message-friend">Написать</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
        
        <main className="profile-main">
          <div className="post-form-container">
            <form onSubmit={handleAddPost} className="post-form">
              <textarea
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                placeholder="Что у вас нового?"
                rows="3"
              />
              <button type="submit">Опубликовать</button>
            </form>
          </div>
          
          <div className="posts-container">
            <h3>Мои публикации</h3>
            {userPosts.length > 0 ? (
              userPosts.map(post => (
                <div key={post.id} className="post">
                  <div className="post-header">
                    <div className="post-author">
                      <img src={user.avatar || "https://via.placeholder.com/40"} alt="Аватар" />
                      <div>
                        <h4>{user.name}</h4>
                        <span className="post-date">{post.date}</span>
                      </div>
                    </div>
                  </div>
                  <div className="post-content">
                    <p>{post.content}</p>
                  </div>
                  <div className="post-actions">
                    <button className="like-button">
                      <span>❤️</span> {post.likes}
                    </button>
                    <button className="comment-button">
                      <span>💬</span> {post.comments}
                    </button>
                    <button className="share-button">
                      <span>🔄</span> Поделиться
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="no-posts">У вас пока нет публикаций. Создайте свой первый пост!</p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Profile;