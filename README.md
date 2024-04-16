This is a backend code using [Express.js](https://expressjs.com/) for [React.js](https://react.dev/) project.

## Getting Started

First, install all dependencies:
```bash
yarn install
``` 
If you need to install yarn, please refer to this [link](https://yarnpkg.com/getting-started/install)

To run the demo webpage, you also need to clone the code for the [frontend](https://github.com/yeouvi29/backend-guild-pt-react-fe)

Before start the server, create **.env** file on the root directory.
In the file, add these
```
MONGODB_URI=your_mongodb_uri
CLIENT_URL="http://localhost:3000"
```

Then, start the server with this command in terminal:

```bash
yarn start
```

Then, you'll see `Backend server is running on http://localhost:8000` in terminal.

After starting the server, install dependencies for the frontend and start the frontend server.

## Deploy on Heroku
You can check the deployed site on [https://backend-guild-react.netlify.app/](https://backend-guild-react.netlify.app/)

There are many ways to deploy Node.js code, but I chose [Heroku](https://heroku.com/) for this project.