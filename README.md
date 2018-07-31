# rest-api

Creating a REST API with Node.js

## Dependencies

 - Install node.js:
   ```
   curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
   sudo apt install -y nodejs
   ```

 - Install build tools:
   ```  
   sudo apt install -y build-essential gcc g++ make
   ```

## Routes

 Routes that will be create:

 - /products
   - GET
   - POST (restrict)

 - /products/{id}
   - GET 
   - PATCH (restrict)
   - DELETE (restrict)

 - /orders
   - GET (restrict)
   - POST (restrict) 

 - /orders/{id}
   - GET (restrict)
   - DELETE (restrict)

## Creating API

### Step #1 - Create the project

 - Initialize project and named it:
   ```
   npm init
   package name: <your-project-name>
   ```

### Step #2 - Install node dependencies

 - Install _express_ framework to make building the API easier:
   ```
   npm install --save express
   ```

 - Install _nodemon_ to monitoring changes in files and refresh API automatically:
   ```
   npm install --save-dev nodemon
   ```

   Include nodemon in _scripts_ session on _package.json_ file. They must see likes:
   ```
   "name": "rest-api",
   "version": "1.0.0",
   "description": "A Node.js RESTful API ",
   "main": "index.js",
   "scripts": {
     "test": "echo \"Error: no test specified\" && exit 1",
     __"start": "nodemon server.js"__
   },
   "keywords": [
     "node",
     "restful",
     "api"
   ],
   . 
   .
   .
   ```

   Now, run API server from npm with the follow command:
   ```
   npm start
   ```

   __Obs:__ It's no longer necessary stop and run server.js with each update in the files.

 - Install _morgan_ package to logging Node.js requests:
   ```
   npm install --save morgan
   ```

 - Install _body-parser_ to parser body requests:
   ```
   npm install --save body-parser
   ```

 - Install mongoose to manage mongoDB transaction, schemas, etc:
   ```
   npm install --save mongoose
   ```
 
### Step #3 - Create serve.js file

### Step #4 - Create app.js file

### Step #5 - Create route files

 Create route files and import them in _app.js_ file:

 - Create _/api/routes/products.js_ file;
 - Create _/api/routes/orders.js_ file;


## Creating Database

### Install MongoDB Community Edition

 More info: https://docs.mongodb.com/master/tutorial/install-mongodb-on-ubuntu/

 - Import the public key used by the package management system:
   ```
   sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 9DA31620334BD75D9DCB49F368818C72E52529D4
   ```

 - Create a list file for MongoDB - Ubuntu16.04:
   ```
   echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/4.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.0.list
   ```

 - Reload local package database:
   ```
   sudo apt update
   ```

 - Install de MongoDB packages:
   ```
   sudo apt install -y mongodb-org
   ```

### Run MongoDB Community Edition

 - __Start__ MongoDB:
   ```
   sudo service mongod start
   ```

 - __Verify__ that the mongod process has started successfully by checking the contents of the log file at /var/log/mongodb/mongod.log for a line reading.
   ```
   [initandlisten] waiting for connections on port 27017
   ```

 - As needed, you can __stop__ the mongod process by issuing the following command.
   ```
   sudo service mongod stop
   ```

 - Issue the following command to __restart__ mongod.
   ```
   sudo service mongod restart
   ```

 - Start a mongo __shell__ on the same host machine as the mongod. Use the --host command line option to specify the localhost address (in this case 127.0.0.1) and port that the mongod listens on.
   ```
   mongo --host 127.0.0.1:27017
   ```
