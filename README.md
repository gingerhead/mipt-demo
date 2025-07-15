## Setup

1. Скопируйте .env.example в .env и установите переменные (при необходимости) 
2. Скопируйте .env в папку server ```cp .env ./server/.env```
2. В терминале выполните команду ```npm run install ```
3. Запустите docker compose с DB командой
```
./integration/bin/main.sh up
```
(В другом терминале)
4. Запустите ```cd ./server && npx prisma migrate deploy```
5. Запустите ```npx prisma generate```
6. Запустите ```npx prisma db seed```

## Запуск

### Dev

```
// В одном терминале
./integration/bin/main.sh up

// В другом терминале (из корня проекта)
npm run start:dev
```

http://localhost:8080

#### Reset db, run migrations, run seed
```
cd ./server && npx prisma migrate reset
```
