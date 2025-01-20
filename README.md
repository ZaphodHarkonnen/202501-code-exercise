# Layout

This solution is split into two parts.

* exercise-frontend
* exercist-backend

## exercise-frontend

A ReactJS webapp using NextJS.

This can be started with a VSCode launch.json configuration.
Or using `npm run dev` within the exercise-frontend folder.

### example .env for frontend

This was the .env contents used during development.

```
NEXT_PUBLIC_API_URI="http://localhost:3001"
```

## exercise-backend

A NodeJS web API using the ExpressJS framwork.

This can be started with a VSCode launch.json configuration.
Or using `npm run start` in the exercise-backend folder.

### example .env for backend

This was the .env contents used during development.

```
MONGODB_CONNECTION_STRING="mongodb://127.0.0.1:27017"
PORT="3001"
```

## MongoDB

This solution uses a MongoDB database for persistance of documents.

It was developed using a MongoDB instance on the local computer.
The location of the MongoDB instance is configurable via the .env in the exercise-backend configuration.
