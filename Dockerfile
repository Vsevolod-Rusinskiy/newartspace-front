# Этап сборки
FROM node:20.9.0-alpine AS builder

# Установка необходимых системных библиотек для sharp
RUN apk add --no-cache libc6-compat

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /app

# Копируем package.json и yarn.lock, чтобы установить зависимости
COPY package.json yarn.lock ./

# Устанавливаем все зависимости
RUN yarn install --frozen-lockfile

# Копируем остальной исходный код приложения
COPY . .

# Собираем приложение
RUN yarn build

# Этап продакшн
FROM node:20.9.0-alpine

# Установка необходимых системных библиотек для sharp
RUN apk add --no-cache libc6-compat

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /app

# Копируем только собранные файлы из этапа сборки
COPY --from=builder /app /app

# Устанавливаем только продакшн зависимости
RUN yarn install --production --frozen-lockfile

# В докере наше приложение должно слушать порт 3000
EXPOSE 3000

# Команда для запуска приложения
CMD ["yarn", "start"]
