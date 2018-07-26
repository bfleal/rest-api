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

 - Install express framework to make building the API easier:
   ```
   npm install --save express
   ```

 - Install nodemon to monitoring changes in files and refresh API automatically:
   ```
   npm install --save-dev nodemon
   ```

 - Include nodemon to _scripts_ session on _package.json_ file. They must see likes:
   ```
   "name": "rest-api",
   "version": "1.0.0",
   "description": "A Node.js RESTful API ",
   "main": "index.js",
   "scripts": {
     "test": "echo \"Error: no test specified\" && exit 1",
     "start": "nodemon server.js"
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

### Step #3 - Create serve.js file

### Step #4 - Create app.js file

### Step #5 - Create route files
