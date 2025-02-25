import { useState } from 'react';
import './Games.css';

function Games() {
  const [games] = useState([
    {
      id: 1,
      title: 'Крестики-нолики',
      image: 'https://via.placeholder.com/300x200?text=Tic-Tac-Toe',
      description: 'Классическая игра в крестики-нолики для двух игроков.',
      players: '2 игрока',
      category: 'Логические'
    },
    {
      id: 2,
      title: 'Змейка',
      image: 'https://via.placeholder.com/300x200?text=Snake',
      description: 'Управляйте змейкой, собирайте еду и растите, не врезаясь в стены и в себя.',
      players: '1 игрок',
      category: 'Аркады'
    },
    {
      id: 3,
      title: 'Тетрис',
      image: 'https://via.placeholder.com/300x200?text=Tetris',
      description: 'Классический тетрис - складывайте фигуры и очищайте линии.',
      players: '1 игрок',
      category: 'Головоломки'
    },
    {
      id: 4,
      title: 'Шашки',
      image: 'https://via.placeholder.com/300x200?text=Checkers',
      description: 'Классическая игра в шашки с компьютером или другим игроком.',
      players: '1-2 игрока',
      category: 'Настольные'
    },
    {
      id: 5,
      title: 'Пазлы',
      image: 'https://via.placeholder.com/300x200?text=Puzzles',
      description: 'Собирайте пазлы разной сложности из красивых изображений.',
      players: '1 игрок',
      category: 'Головоломки'
    },
    {
      id: 6,
      title: 'Судоку',
      image: 'https://via.placeholder.com/300x200?text=Sudoku',
      description: 'Заполняйте сетку цифрами от 1 до 9, чтобы в каждой строке, столбце и блоке 3×3 все цифры встречались только один раз.',
      players: '1 игрок',
      category: 'Логические'
    }
  ]);
  
  const [activeCategory, setActiveCategory] = useState('Все');
  
  const categories = ['Все', 'Логические', 'Аркады', 'Головоломки', 'Настольные'];
  
  const filteredGames = activeCategory === 'Все' 
    ? games 
    : games.filter(game => game.category === activeCategory);
  
  return (
    <div className="games-container">
      <div className="games-header">
        <h2>Игры</h2>
        <div className="games-categories">
          {categories.map(category => (
            <button 
              key={category}
              className={activeCategory === category ? 'active' : ''}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      
      <div className="games-grid">
        {filteredGames.map(game => (
          <div key={game.id} className="game-card">
            <div className="game-image">
              <img src={game.image} alt={game.title} />
              <button className="play-button">Играть</button>
            </div>
            <div className="game-info">
              <h3>{game.title}</h3>
              <p className="game-description">{game.description}</p>
              <div className="game-meta">
                <span className="game-players">{game.players}</span>
                <span className="game-category">{game.category}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Games; 