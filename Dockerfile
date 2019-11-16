
FROM node:alpine

# делаем каталог 'app' текущим рабочим каталогом
WORKDIR /app
# устанавливаем простой HTTP-сервер для статики
RUN npm install -g express socket.io mongodb

# копируем файлы и каталоги проекта в текущий рабочий каталог (т.е. в каталог 'app')
COPY src .
COPY dist ./dist

EXPOSE 3000

CMD ["node", "express.js"]
