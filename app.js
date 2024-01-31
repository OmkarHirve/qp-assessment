const express = require('express')
const app = express()
const { APPLICATION_PORT } = require('./config/constants')
const usersRouter = require('./controllers/users')
const adminRouter = require('./controllers/admin')
const connection = require('./datastore/connection')


async function initializeApp() {

    try {
      await connection.dbConnect();
      app.use(express.json()); // for parsing application/json
      app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
      app.use("/admin", adminRouter);
      app.use("/user", usersRouter);

      app.listen(APPLICATION_PORT, (error) => {
        if (error) {
          console.error("Error while starting the application");
          process.exit(1);
        }
        console.log("Application is running at port ", APPLICATION_PORT);
      });
    } catch (error) {
        console.error("Error while starting the application", error)
        process.exit(1);
    }
}

initializeApp()
