# rest-api

Creating a REST API with Node.js

## Dependencies

 - Install node.js:
   ```
   curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

 - Install build tools
   ```  
   sudo apt-get install -y build-essential
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

## Step #1
 - Initialize project and named it:
  npm init
  package name: <your-project-name>
