<div align="center">

[![](https://github.com/ignatov-ru/social_network/workflows/ESLint/badge.svg)](https://github.com/ignatov-ru/social_network/actions?query=workflow%3AESLint)
[![](https://github.com/ignatov-ru/social_network/workflows/EditorConfig/badge.svg)](https://github.com/ignatov-ru/social_network/actions?query=workflow%3AEditorConfig)
<img src="https://img.shields.io/badge/StyleLint-used%20by%20-brightgreen" />
<img src="https://img.shields.io/badge/Commitizen-used%20by%20-brightgreen" />

</div>

# Описание

&#9996; Это <a href="https://ignatov-ru.github.io/social_network/#/">социальная сеть</a> на React + Redux. Для входа в тестовый аккаунт нажмите **Login to test account**.

Разработка стартовала с <a href="https://github.com/facebook/create-react-app">Create React App</a>. Все компоненты находятся в `./src`.

Некоторое, что используется в проекте:

- React Hooks
- Typescript
- Material UI для стилизации элементов форм
- axios для запросов на сервер
- <a href="https://social-network.samuraijs.com/docs">Данный</a> серверный API

# Что реализовано
## В целом в проекте:
&#120823; &#127759; **Авторизация**
   - Валидация email на клиенте
   - Показ ошибок с сервера

&#120824; &#127912; **Смена темы**  по нажатию кнопки на нативном CSS
   - Сохранение темы в _Local Storage_
   <div align="center"><img src="./readme_content/gif/change_theme.gif" width='75%' /></div>

&#120825; &#9989; **Отзывчиво-адаптивная вёрстка** для всех экранов от 320px
   <div align="center"><img src="./readme_content/gif/adaptive.gif" width='75%' /></div>

&#120826; &#9989; **Настроена маршрутизация** (_react-router-dom_)
   - Несуществующий URL перенаправляет на профиль
   - Redirect неавторизованных пользователей на страницу авторизации

&#120827; &#9989;**Показ preloader** при загрузках

---

## Пройдёмся по страницам в навигации соц. сети:
1. **Профиль** &#11088;:
   - &#9998; Редактирование профиля и статуса, сохранение данных на сервере

   - &#128683; Вывод ошибки с сервера при указании некорректного URL в контактах профиля
   - &#128290; Счётчик введённых символов на формах профиля и статуса с подсветкой при наборе максимального кол-ва символов
   - &#10060; Закрытие статуса по клику вне его
   - 🔒 Блокировка кнопок сохранения до изменений в формах
   <div align="center"><img src="./readme_content/gif/change_status.gif" width='75%' /></div>&#32;&#32;

   - &#9998; Смена аватара и сохранение фото на сервере

   - &#10133; Добавление постов на стену, удаление постов по одному или сразу несколько (+ анимация), сохранение постов в _Local Storage_
   <div align="center"><img src="./readme_content/gif/wall.gif" width='75%' /></div>
1. **Чат** &#128172;:
   - Общий чат среди авторизованных пользователей на [social-network](https://social-network.samuraijs.com/). _P.S.: в чате показываются 100 последних сообщений, очистка чата происходит раз в сутки_

   - Отображение списка текущих участников чата
   - Показ всех участников по нажатию кнопки
   - Сортировка участников по имени
1. **Найти пользователей** &#128587;:
   - Подписка/ отписка на пользователей, отображение подписок на странице "Друзья", сохранение данных на сервере
   - Дозагрузка с сервера пользователей свыше 10 человек внизу страницы по нажатию кнопки &#11015;
   - Показ целиком имени и статуса пользователя длиной более 19 символов во всплывающем окне при наведении на них
   - &#128270; **Поле поиска**:
      - Синхронизация вводимого в поиск текста с query parameters URL и, наоборот, отображение по параметрам URL предвведённого поиска (_queryString_)
      <div align="center"><img src="./readme_content/gif/search_url.gif" width='75%' /></div>

      - Поиск среди всех пользователей, авторизованных на <a href="https://social-network.samuraijs.com/">social-network</a> по имени
1. **Друзья** &#129309;:
   - Показ только друзей

   - _Остальной функционал как в "Найти пользователей", кроме поля поиска_
   - &#128270; **Поле поиска**:
      - debounce &#8987; при поиске 600 ms (_lodash_)
      - Поиск по имени среди друзей

&#127937; Пока всё :&#41;

# Разработка

Вы можете запустить этот проект локально, просто сделайте:
```
git clone git@github.com:ignatov-ru/social_network.git
(или создайте форк, а затем клонируйте его вместо клона моего проекта уже из своего репозитория)

cd social_network
npm install
npm start
```