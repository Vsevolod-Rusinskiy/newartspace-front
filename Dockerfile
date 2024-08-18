# Этап сборки
FROM node:20.9.0-alpine AS builder

# Установка необходимых системных библиотек для sharp
RUN apk add --no-cache libc6-compat && mkdir /app

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /app

# Копируем package.json и yarn.lock, чтобы установить зависимости
COPY package.json yarn.lock ./

# Устанавливаем все зависимости без выполнения скриптов
ENV CI=true
RUN yarn install --frozen-lockfile

# Копируем остальной исходный код приложения
COPY . .

# Собираем приложение
RUN yarn build

# Этап продакшн
FROM node:20.9.0-alpine

# Установка необходимых системных библиотек для sharp
RUN apk add --no-cache libc6-compat && mkdir /app

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /app

COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Копируем package.json и yarn.lock для установки зависимостей
COPY --from=builder /app/package.json /app/yarn.lock ./

# Устанавливаем только продакшн зависимости
RUN yarn install --production --frozen-lockfile

# В докере наше приложение должно слушать порт 3000
EXPOSE 3000

# Команда для запуска приложения
CMD ["yarn", "start"]
