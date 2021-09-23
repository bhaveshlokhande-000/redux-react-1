# Node API for Basic User Management

This API uses JSON Webtokens to perform authentication of a user.

## Install the dependencies for this API
```bash
npm install 
```
This command will install the following packages
* **jsonwebtoken** - For managing the JSON Web Tokens
* **bcryptjs** - For hashing and managing the users password
* **express-validator** - For performing server-side input validation
* **multer** - For handling images sent to the server
* **uuid** - For generating universally unique identification strings
* **nodemon** - This is a development dependency for providing hot reload for the server running on your machine.

## Running the server for the API
```bash
npm run dev
```
The dev script executes the command **nodemon server.js** which will fire up the server
```bash
Server started at port 5000 
```

## Using the API

#### URL
Prefix all request urls with "http://localhost:5000/api/vi"

<hr/>

### 1. ADD A USER

#### Route:  
&nbsp;&nbsp;&nbsp;&nbsp;POST _/user_

#### Content-Type:
&nbsp;&nbsp;&nbsp;&nbsp;form-data or json

#### Request Body
&nbsp;&nbsp;&nbsp;&nbsp;Required fields: 
* **name**
* **email**
* **password** - At least 6 digits

&nbsp;&nbsp;&nbsp;&nbsp;Optional fields:
* **profile_picture** - Only images allowed
* **phone** - Exactly 10 digits

#### Response Body
* **message** - User registered with ID [user_id]

<hr/>

### 2. LOGIN

#### Route:  
&nbsp;&nbsp;&nbsp;&nbsp;POST _/auth_

#### Content-Type:
&nbsp;&nbsp;&nbsp;&nbsp;json

#### Request Body:
&nbsp;&nbsp;&nbsp;&nbsp;Required fields: 
* **email**
* **password**

### Response Body:
* **token** - JSON Web token returned by server. This token is required in all further requests to protected routes
<hr/>

### 3. GET USER INFO

#### Route:  
&nbsp;&nbsp;&nbsp;&nbsp;GET _/user_

#### Request Headers:
* **Bearker Token** - [req.headers.authorization]

#### Response Body:
* **name**
* **email**
* **id**
<hr/>

### 4. GET ALL USERS INFO

#### Route:  
&nbsp;&nbsp;&nbsp;&nbsp;GET _/user/users_

#### Request Headers:
* **Bearker Token** - [req.headers.authorization]

#### Response Body:
* Array of user objects, each with the following fields
  - name
  - email
  - phone (?)
  - profile_picture (?)
  - id
<hr/>

### 4. UPDATE OWN INFO

#### Route:  
&nbsp;&nbsp;&nbsp;&nbsp;POST _/user/update_

#### Request Headers:
* **Bearker Token** - [req.headers.authorization]

#### Content-Type:
&nbsp;&nbsp;&nbsp;&nbsp;form-data or json
#### Request Body:
&nbsp;&nbsp;&nbsp;&nbsp;[fields to be updated]  
&nbsp;&nbsp;&nbsp;&nbsp;_password field is not accepted_  
&nbsp;&nbsp;&nbsp;&nbsp;_changing email will invalidate authentication and require user to login again_  

#### Response Body:
* **message** - User with [name] has been updated

<hr/>

### 4. CHANGE PASSWORD

#### Route:  
&nbsp;&nbsp;&nbsp;&nbsp;POST _/auth/change-password_

#### Request Headers:
* **Bearker Token** - [req.headers.authorization]

#### Content-Type:
&nbsp;&nbsp;&nbsp;&nbsp;json
#### Request Body:
* **old_password**
* **new_password**  
&nbsp;&nbsp;&nbsp;&nbsp;_changing email will invalidate authentication and require user to login again_  

#### Response Body:
* **message** - Password for [name] has been updated
<hr/>

### 5. STATIC IMAGES

&nbsp;&nbsp;&nbsp;&nbsp;_All profile picture uploaded are statically server at /uploads/[profile_picture] where profile picture value is taken from the user data_
