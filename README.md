# Бекенд локального сайта
Скрипты на udev в отдльном [репозитории](https://github.com/guest363/linux-udev-mount-script)

# Требования:
Есть два варианта использования:
1. Через Docker - предпочтительный:
    * Нужен только Docker
2. Без использования Docker'a:
    * MongoDB >= 3.6
    * NodeJS >= 8.9

# Запуск
Проект сотсоит из двух частей [frontend](https://github.com/guest363/local-web-portal-frontend) и этот репозиторий с beckend. 
* Нужно скачать оба репозитория и положить их на один уровень вложенности в папках:
RootFolder
    |- frontend
    |- backend (этот репозиторий

* В папке backend выполнить команду ''' npm install '''
* Если есть Docker:
    * выполнить команду ''' docker-compose up '''
* Без Docker:
    * В файле ./src/variables.js изменить константы:
        * dbRootName имя для свой базы, по умолчанию Tyumen
        * dbPort порт MongoDB, по умолчанию 27017 (default для MongoDB)
        * hostAndContainerName IP адрес компьютера, по умолчанию localhost
    * выполнить команду ''' node backend.js '''

# Описание
Запуском занимается forever-monitor который делит проект на 2 части:
1. API к базе данных на Express.js и отдача статического SPA
2. Скрипт нативного для Windows пинга устройст взятых из базы

API работает отчасти по HTTP, отчасти по Socket. 
Все взаимодействие с API идет через адрес \api\PATH.
Каждая функциональная часть рабита на модули, которые зависят только от модуля 'moduleAuth' который предоставляет возсожность аутентификации для HTTP и Socket.
Для общения с MongoDB из ORM Moongose.

