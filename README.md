#TODO
-add CURS BDD
-edit services for user and post

- edit controller for user and post
- Protect route POST/ posts/ (create post)
- Protect route DELETE / post/:id (delete post)
- Protect route UPDATE /posts/:id (update post)

#TODO 2 (RELATION)

- Create into db relation use> (OneToMany)
  -add user relation to insert new post
- Check owner of post when delete or update

#Back (API)

- express
  -postgres

## Routes

-users (CRUD)
-posts (CRUD)

## Tables

### User

- id [int PK]
  -username [varchar]
  -password [varchar]
  -email [varchar]
  -creates_at [timestamp]

### Post

- id [Ink PK]
- user_id [Int FK] (Many To One)
- title [varchar]
- content [varchar]
- creates_at [timestamp]
  -image_path[varchar]

#Step to init project (Back)

- create folred (api)
  -npm init
  -typescript init
  -install dependencies (express, typescript, ts-node-dev, nodemon, dotenv)
  -create files and folders project(index.ts, folder src)
  -create routes (users, posts)
- test with Postman
  -config docker-compose (service: postgres, admoner)
  -up containers
  -create database and tables
  -install dependencies postgres
  -connecnt db

## folder erchitecture (api)

-packages.json
-tsconfig.json
-docker-compose.yml
-.env
-.gitignore

-src/

- -index.ts
- routes/
- controllers/
  -config/
  -db.ts

# auth-blog-2
# auth-blog-new
