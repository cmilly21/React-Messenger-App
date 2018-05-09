# Messaging App

## About 
---

This project was built for a 2nd semester class project. I used React.js, Express.js, MongoDB, and Node.js (MERN) to build this app. It also includes Socket.io to handle the messaging capabilities. 


## Getting Started
---

+ **Development** => npm run dev
+ **Production** => npm start
+ **Create Production build** => npm run build 


## Client Side
---

1. **Forms Page**
	+ Login Form View
	+ Signup Form View

2. **Message Dashboard Page**
	+ User must have web token in localstorage to be authenticated and authorized to use this page
	+ All incoming messages are stored into browser storage space


## Node Server

+ Handles Restful API for user login / creation and also has an endpoint to autheticate a web token tokens sent
+ Handles messaging by using web sockets. Message sent to server from client then sends to all clients connected to server
+ Handles connection to MongoDB

## Data Models
---

+ #### User Model

| 		Key		|	Value		| 						Rules									|
| ------------ | ----------|---------------------------------------------- |
| **name:**		| username 	|(string, required, unique, trims whitespace)	|
|**password:** | password 	|(string, required, trims whitespace)				|

+ #### Message Model

|	Key			 |		Value			 |					Rules				  |
| ------------- | --------------- | ---------------------------- |
| **id:**	    |	id_number 	 	 | (number, unique, required)	  |
| **sender:** 	 |	senders_name    | (string, unique, required)   |
| **receiver:** | receivers_name  | (string, unique, required)   |
| **message:**  | text_message    | (string, required) 			  |

+ #### Chat Model

|      Key     	|     Value    |        Rules         	|
| --------------- | ------------ | --------------------- |
|	**id:** 			| name 			|	 ?????              	|
|	**name:** 		| chat_name 	| (string, required)   	|
| **messages:**	| message_list | (array of [MESSAGES])	|
|	**users:**     | user_list 	|	(array of [USERS])   |     

+ #### JWT Token Model

|
|
|
|

## REST API
---

+ #### Login 

	+ **route:** /users/login
	+ **method:** POST
	+ **data:** [USER MODEL] 
	{
		name: username
		password: password
	}
	+ **comments:** 
	User fills out form and needs to fill out both username and password input fields. Sends info to route if given both

+ #### Signup / Create Account

	+ **route:** /users/signup
	+ **method:** POST
	+ **data:** [USER MODEL]
	{
		name: username
		password: password
	}
	+ **comments:**

+ #### Authorize Web Token

	+ **route:** /auth/autheticate
	+ **method:** POST
	+ **data:** [JWT TOKEN MODEL]
	{
		token: jwt_token
	}
	+ **comments:** 
		1. System checks whether there is a token in the browser's local storage. 
		2. Checks if it is a valid token - tokens expire 12 hours after a login success.
		3.  Server returns a **success response** object and redirects to the message dashboard page. 

		If at any point it does not pass any of these steps the server returns a **failure response** object and you can NOt leave the Form Dashboard Page


---


## To Do List

+ Adding and Deleting friends functionality
+ Private chat functionality
	+ Active User list side bar changes/makes a new chat when you click and 'activerUser'
+ Having Messages stored in MongoDB rather than browser