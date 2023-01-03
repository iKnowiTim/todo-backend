# todo-backend

# Задание заказчика

Хочу, да мне просто необходимо, чтобы я мог просматривать свой список задач!
Так что Вам придется:

1. Определить модели данных (прецеденты)
2. Доски должны хранить в себе списки, а те в свою очередь задачи с тегами
3. Пользователь имеет возможность хранить несколько досок. 4
4. У задач всегда есть заголовок, необязательное описание и список тегов

Удачи!

# Entities:

1. User
2. Board
3. List
4. Task (задачи)
5. Tag

# Прецеденты:

1. Создать доску
2. Создать список в доске
3. Создать задачу в списке
4. Регистрация пользователя
5. Авторизация пользователя
6. Изменить доску (title, description)
7. Изменить список (title, description)
8. Изменить задачу (title, description, completed)
9. Просмотр доски
10. Просмотр листа
11. Просмотр задачи
12. Удаление доски (хранение на сервере)
13. Удаление листа (хранение на сервере)
14. Удаление задачи (хранение на сервере)
15. Вывод всех досок
16. Вывод всех списков в доске
17. Вывод всех задач в листе
18. Создать доску
19. Создать список внутри доски
20. Создать задачу внутри списка
21. Переместить задачу из одного списка в другой в одной доске

# Требования:

1. Хранить значения времени, когда впервые создали доску, списка и задачи.
2. Удаленные доски, списки, задачи, несмотря на удаление, должны быть сохранены.
3. Возможность просматривать историю изменений
4. Просмотр ресурсов на доске - списки. Просмотр ресурсов в списке - задачи. Просмотр ресурсов в задачах - теги.

# Structure_entities:

```
interface User {
 id: number,
 username: string,
 login: string,
 password: string,
 boards: Board[],
 createdAt: Date,
 updatedAt: Date,
 deletedAt: Date,
}
```

```
interface Board {
id: number,
description?: string,
title: string,
lists: List[],
createdAt: Date,
updatedAt: Date,
deletedAt: Date,
}

```

```
interface List {
id: number,
title: string,
description?: string,
tasks: Task[],
createdAt: Date,
updatedAt: Date,
deletedAt: Date
}

```

```
interface Task {
id: number,
title: string,
description?: string,
tags?: Tag[],
completed: boolean,
createdAt: Date,
updatedAt: Date,
deletedAt: Date
}

```

```
interface Tag {
  description?: string
}
```

# description_request_methods

# Board

```
GET /boards

200 OK
{
  id: number,
  title: string,
  description: string,
  listsCount: number,
  tasksCount: number,
  createdAt: Date,
  updatedAt: Date
}[]

401 unauthorized
404 not found


GET /boards/${id}
200 OK
{
  id: number,
  title: string,
  description: string,
  createdAt: Date,
  updatedAt: Date
  lists: {
    id: number,
    title: string,
    description: string,
    createdAt: Date,
    updatedAt: Date
    tasks: {
      id: number,
      title: string,
      description?: string,
      createdAt: Date,
      updatedAt: Date
      tags: {
        description: string
      }[]
    }[]
  }[]
}

```

```
POST /boards/${id}
{
  title: string,
  description?: string
}

201 Created
{
  id: number,
  title: string,
  description: string,
  createdAt: Date,
  updatedAt: Date
}

401 unauthorized
404 not found
```

```
PATCH /boards/${id}
200 OK
{
  title?: string,
  description?: string
}
401 unauthorized
404 not found


201 OK
{
  id: number,
  title: string,
  description: string,
  updatedAt: Date
}
```

```
DELETE /boards/${id}
200 Deleted

401 unauthorized
404 not found
```

# List

```

GET /boards/${id}/lists

200 OK

{
  id: number,
  title: string,
  description: string,
  tasksCount: number,
  createdAt: Date,
  updatedAt: Date
}[]

401 unauthorized
404 not found



GET /lists/${id}

200 OK
{
  id: number,
  title: string,
  description: string,
  createdAt: Date,
  updatedAt: Date,
  tasks: {
    id: number,
    title: string,
    description: string,
    completed: boolean
    createdAt: Date,
    updatedAt: Date
  }[]
}
401 unauthorized
404 not found
```

```
POST /boards/${id}/lists
{
  title: string,
  description?: string,
}


201 created
{
  id: number,
  title: string,
  description: string,
  createdAt: Date,
  updatedAt: Date
}

401 unauthorized
404 not found
```

```
PATCH /lists/${id}
{
  title?: string,
  description?: string
}


201 OK
{
  id: number,
  title: string,
  description: string,
  updatedAt: Date
}

401 unauthorized
404 not found
```

```
DELETE /lists/${id}
200 Deleted

401 unauthorized
404 not found
```

# Task

```
GET /lists/${id}/tasks

200 OK
{
  id: number,
  title: string,
  description: string,
  completed: boolean,
  createdAt: Date,
  updatedAt: Date
  tags: {
    description: string
  }[]
}[]

401 unauthorized
404 not found

```

```
POST /lists/${id}/tasks

{
  title: string,
  description?: string,
}

401 unauthorized
404 not found

201 created
{
  id: number,
  title: string,
  description: string,
  createdAt: Date,
  updatedAt: Date
}
```

```
PATCH /tasks/${id}
{
  title?: string,
  description?: string
}

201 Patched
{
  id: number,
  title: string,
  description: string,
  updatedAt: Date
}

401 unauthorized
404 not found
```

```
DELETE /tasks/${id}
200 Deleted

401 unauthorized
404 not found
```

# user

```

```

```

```
