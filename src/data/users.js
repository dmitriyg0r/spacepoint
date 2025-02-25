// Тестовые данные пользователей
export const users = [
  {
    id: 1,
    email: 'user@example.com',
    password: 'password123',
    name: 'Иван Петров',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    friends: 42,
    photos: 128
  },
  {
    id: 2,
    email: 'anna@example.com',
    password: 'anna123',
    name: 'Анна Смирнова',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    friends: 87,
    photos: 243
  },
  {
    id: 3,
    email: 'test@test.com',
    password: 'test',
    name: 'Тестовый Пользователь',
    avatar: 'https://randomuser.me/api/portraits/lego/1.jpg',
    friends: 5,
    photos: 10
  }
];

// Тестовые посты
export const posts = {
  1: [
    {
      id: 101,
      userId: 1,
      content: 'Привет всем! Это моя первая публикация в новой социальной сети.',
      likes: 15,
      comments: 3,
      date: '2023-11-10'
    },
    {
      id: 102,
      userId: 1,
      content: 'Сегодня прекрасная погода! Иду гулять в парк.',
      likes: 24,
      comments: 5,
      date: '2023-11-12'
    },
    {
      id: 103,
      userId: 1,
      content: 'Изучаю React и создаю свою социальную сеть. Очень интересно!',
      likes: 32,
      comments: 7,
      date: '2023-11-15'
    }
  ],
  2: [
    {
      id: 201,
      userId: 2,
      content: 'Всем привет от Анны! Рада быть здесь.',
      likes: 28,
      comments: 6,
      date: '2023-11-08'
    },
    {
      id: 202,
      userId: 2,
      content: 'Поделюсь своим любимым рецептом пирога с яблоками...',
      likes: 45,
      comments: 12,
      date: '2023-11-14'
    }
  ],
  3: [
    {
      id: 301,
      userId: 3,
      content: 'Тестовый пост для проверки функциональности.',
      likes: 5,
      comments: 1,
      date: '2023-11-16'
    }
  ]
}; 