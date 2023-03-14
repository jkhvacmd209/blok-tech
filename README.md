# Blok Tech project by Joppe Koops
This is a project I am working on for [blok tech](https://github.com/cmda-bt) at [CMD Amsterdam](https://github.com/CMDA). 
The concept is a website where filmmakers and location managers can find recording locations. For the project we have to work on one specific feature. I'm working on a method to post locations to the website. If you want to read about the process and how my feature works you can read the [wiki](https://github.com/jkhvacmd209/blok-tech/wiki).


## How to install this project
Clone this repository from github by running the following command:

```
git clone https://github.com/jkhvacmd209/blok-tech.git
```

After that install the node modules needed for the project. Run the following command in the cloned folder.

```
npm install
```

For the application to connect to the database and the *Google Places API* you will need to create a `.env` file. You can rename the `.env-sample` file and fill in the necessary information.

You can get your `DB_` login information from [mongoDB](https://www.mongodb.com/docs/drivers/node/current/fundamentals/connection/connect/#std-label-node-connect-to-mongodb).

You will also need a *Google Places API* key. You can get that from [Google Cloud](https://console.cloud.google.com/apis/library/places-backend.googleapis.com)

Now you will be able to start the project with

```
npm start
```

## Licence
This project is licensed under a [MIT License](https://github.com/jkhvacmd209/blok-tech/blob/main/LICENSE). Copyright © 2023 Joppe Koops