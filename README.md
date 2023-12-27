![githubCover (1)](https://github.com/buravlev-arthur/games-selling-statistic/assets/14940878/3db1daf8-24bb-46fb-85c9-02f4fd98992a)
# GameStats

> Веб-приложение, отображающее данные о динамике изменения стоимости компьютерных игр и количеству товарных единиц на российских маркетплейсах.
> 
> Демонстрация: <http://188.225.84.218:82> 

## Стек технологий

**Код**: Nuxt 3, Quasar module, TypeScript, SCSS

**Используемые библиотеки**: ECharts, Knex

**Тестирование**: Vitest

**Качество кода**: ESLint, Prettier, Stylelint

## Разработка

```bash
# клонирование проекта (через ssh)
git clone git@github.com:buravlev-arthur/games-selling-statistic.git

# установка bun
npm i -g bun

# установка проекта
cd games-selling-statistic && bun i

# запуск dev-сервера
bun run dev

# тестирование
bun run test

# сборка проекта
bun run build
```

## Деплой проекта

```bash
# сборка проекта на локальной машине
bun run build

# копирование сборки через ssh на сервер
scp -r <project-folder>/.output <username>@<ip or domain>:/<path>

# установка bun на сервере (если не установлен)
npm i -g bun

# установка зависимостей
cd <path>/.output/server && bun i

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
pm2 start --name Games_selling_frontend --interpreter $NPM_GLOBALS_PATH <path>/.output/server/index.mjs
```
