http://peaceful-dawn-6754.herokuapp.com/api/

#Rewards API
This is a REST service built to keep track of of users and their loyalty transactions.

##Requirements
* Npm 1.4+
* Node 0.10+

##Install
1. Clone this repo
2. Update the config/{env}.json file (keep in mind that config values will fall back to default.json when not found in other files)
3. 		export NODE_ENV={env}
where {env} is the name of the config file you want to use (ex. dev.json)
3. 		npm install
4. 		npm start

##Caveats
* Currently only supports mongodb connections
* There is no authentication for any of the API requests (anyone can query the API)
* Although there are a few frameworks being used, with more time, each would have to be tested thoroughly for performance issues. Writing a few from scratch might also be the right way to go
* There is limited logging/error catching due to timeing constraints.



## REST API
The rest API is currently hosted at the following url:

	http://peaceful-dawn-6754.herokuapp.com/api/

The following lists all the actions allowed.  Prepend the above url to any of the actions below.


### 1. Create user

Creates a user with a default of 0 points and no transactions.

	POST /users/
	
##### Headers

- *Content-Type*: application/json

##### Body

```
{
  	"email":"{STRING}",
	"first_name":"{STRING}",
	"last_name":"{STRING}"
}
```


#### Response

```
{
	 "message": "User created"
}
```


### 2. Create point transaction

Creates a point transaction and adds that amount to a user's total.  There is a check to make sure user's point never gets below 0. Transactions that do cause that will be rejected.


##### Headers

- *Content-Type*: application/json



There are two urls to do this (for fun)
#### _Method 1_

	POST /users/{ID}/transactions
	
- Where **{ID}** is a user id.

##### Body

```
{
  	"amount":{INTEGER}
}
```
#### _Method 2_

	POST /transactions


##### Body

```
{
  	"amount":{INTEGER},
  	"user_id":"{STRING}"  	
}
```

#### Response

```
{
	 "message": "Transaction Added"
}
```



### 3. Get all users

Returns a list of all the users.

	GET /users
	

##### Headers

- *Content-Type*: application/json


#### Response

```
[
    {
        "email": "john@smith.com",
        "first_name": "john",
        "last_name": "smith",
        "_id": "53ec17b58041ec0b004a8e53",
        "points": 2
    }
    ...
]
```


### 4. Get all transactions

Returns a list of all transactions.

	GET /transactions
	

##### Headers

- *Content-Type*: application/json


#### Response

```
[
    {
        "user_id": "53ec17b58041ec0b004a8e53",
        "amount": 2,
        "_id": "53ec18ad8041ec0b004a8e54",
        "created_at": "2014-08-14T02:02:21.583Z"
    }
    ...
]
```

### 5. Get a specific user

Returns a list of all the users.

	GET /users/{ID}
	
	
- Where **{ID}** is a user id.
- Adding a '?with=transactions' query string will populate the user with all their corresponding transactions

##### Headers

- *Content-Type*: application/json


#### Response (no query string)

```
{
    "email": "john@smith.com",
    "first_name": "john",
    "last_name": "smith",
    "_id": "53ec17b58041ec0b004a8e53",
    "points": 2
}
```
#### Response (?with=transactions)

```
{
    "email": "john@smith.com",
    "first_name": "john",
    "last_name": "smith",
    "_id": "53ec17b58041ec0b004a8e53",
    "points": 2
    "transactions": [
        {
            "user_id": "53ec17b58041ec0b004a8e53",
            "amount": 2,
            "_id": "53ec18ad8041ec0b004a8e54",
            "created_at": "2014-08-14T02:02:21.583Z"
        }
        ...        
    ]
}
```

### 6. Get all transactions for a specific user

Returns a list of all transactions for a user.

	GET /users/{ID}/transactions
	
- Where **{ID}** is a user id.

##### Headers

- *Content-Type*: application/json


#### Response

```
[
    {
        "user_id": "53ec17b58041ec0b004a8e53",
        "amount": 2,
        "_id": "53ec18ad8041ec0b004a8e54",
        "created_at": "2014-08-14T02:02:21.583Z"
    }
    ...
]
```


### 7. Updates a specific user
Deletes a user

	DELETE /users/{ID}
	
	
- Where **{ID}** is a user id.

##### Headers

- *Content-Type*: application/json


##### Body

```
{
  	"email":"{STRING}",
	"first_name":"{STRING}",
	"last_name":"{STRING}"
}
```

- All body parameters are optional

#### Response

```
{
    "message": "User updated"
}
```


### 8. Delete a specific user
Deletes a user

	DELETE /users/{ID}
	
	
- Where **{ID}** is a user id.

##### Headers

- *Content-Type*: application/json



#### Response (no query string)

```
{
    "message": "User deleted"
}
```


