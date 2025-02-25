import { useState, useEffect } from 'react';
import { posts } from '../data/users';
import './Profile.css';

function Profile({ user, onLogout }) {
  const [userPosts, setUserPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  
  // Загружаем посты пользователя при монтировании компонента
  useEffect(() => {
    // Получаем посты текущего пользователя из тестовых данных
    const userPostsData = posts[user.id] || [];
    setUserPosts([...userPostsData]);
  }, [user.id]);
  
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
  
  return (
    <div className="profile-container">
      <div className="profile-content">
        <aside className="profile-sidebar">
          <div className="profile-info">
            <div className="profile-avatar">
              <img src={user.avatar || "https://via.placeholder.com/150"} alt="Аватар пользователя" />
            </div>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
            <div className="profile-stats">
              <div className="stat">
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
        </aside>
        
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