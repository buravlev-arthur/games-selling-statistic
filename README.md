# Статистика продаж компьютерных игр

## Деплой проекта

```bash
# сборка проекта на локальной машине
bun run build

# копирование сборки через ssh на сервер
scp -r project-folder/.output <username>@<ip or domain>:/path

# установка bun на сервере (если не установлен)
npm i -g bun

# установка зависимостей
cd /path/.output/server && bun i

# установка переменных окружения на сервере
export NUXT_DB_HOST="<ip or domain>"
export NUXT_DB_PORT="<db port>"
export NUXT_DB_NAME="<db name>"
export NUXT_DB_USER="<db user>"
export NUXT_DB_PASSWORD="<db password>"
export NPM_GLOBALS_PATH="$(npm root -g)/bun/bin/bun"
export HOST="127.0.0.1"
export PORT="8082"

# запуск приложения через pm2
pm2 start --name Games_selling_frontend --interpreter $NPM_GLOBALS_PATH /path/.output/server/index.mjs
```
