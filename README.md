# Messaging App

## About 
---

This project was built for a 2nd semester class project. I used React.js, Express.js, MongoDB, and Node.js (MERN) to build this app. It also includes Socket.io to handle the messaging capabilities. 


## Getting Started
---

+ **Development** => npm run dev
+ **Production** => npm start
+ **Create Production build** => npm run build 


## Pages
---

1. **Forms Page**
	+ Login Form View
	+ Signup Form View

2. **Message Dashboard Page**


## Models
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

<<<<<<< HEAD
=======

>>>>>>> master
## REST API Guide
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

+ Add/Delete friends from a 'User' model
+ Private chat functionality
	+ Active User list side bar changes/makes a new chat when you click and 'activerUser'


colors:

	primary => 
	rgba(255, 102, 102, 1)

	shade =>
	

	secondary => 
 	rgba(83, 66, 146, 1);
	other => 
		rgba(245, 251, 71, 1);

	bg => 
	rgba(235, 235, 235, 1);