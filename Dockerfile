# Используем официальный образ Node.js версии 20.9.0
FROM node:20.9.0-alpine

# Установка необходимых системных библиотек для sharp
RUN apk add --no-cache libc6-compat

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /app

# Копируем package.json и yarn.lock, чтобы установить зависимости
COPY package.json yarn.lock ./

# Устанавливаем зависимости с использованием Yarn в режиме production
RUN yarn install --production --frozen-lockfile

# Копируем остальной исходный код приложения
COPY . .

# Собираем приложение
RUN yarn build

# В докере наше приложение должно слушать порт 3000
EXPOSE 3000

# Команда для запуска приложения
CMD ["yarn", "start"]
