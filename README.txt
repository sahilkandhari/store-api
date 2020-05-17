1) Start the server with by typing in terminal the command "npm run start" or "npm run dev" to run in development mode

2) Open Postman and first set up the environment variables 'url' and 'authToken' and set this particular environment from the top drop down menu
	
	url = localhost:3000/api 
	authToken will be set dynamically in the next step

3) Create a new collection "Store API" and edit the collection, go into 'Authorization' tab, there select 'Bearer Token' and assign the variable "{{authToken}}"


4) Create a new request namely "Create User", select the 'POST' method and pass the following data in 'Body'(select JSON) and 'Tests' respectively and send the request to the path '{{url}}/users' to create a new user

	Body : {
		 "name" : "Zach",
   		 "address":{
       			 "street":"Park street",
      			  "city":"Mumbai"},
 		 "orders" : [
        		{
            		"orderId" : 101,
            		"date" : "10-2-2020",
            		"status" : "pending",
            		"items" : []
        		}
    		],
		"email" : "test2@test2.com",
    		"password" : "ZachLavine8"
		}

	Tests : 
		if(pm.response.code === 201) {
    			pm.environment.set('authToken', pm.response.json().token)
		}

5) Create a new request namely "User Login", select the 'POST' method  pass the following data in 'Body'(select JSON) and 'Tests' respectively and send the request to the path '{{url}}/users/login' to login an existing user

	Body : {
	"email" : "test2@test2.com",
	"password" : "ZachLavine8"
	}

	Tests : 
		if(pm.response.code === 201) {
    			pm.environment.set('authToken', pm.response.json().token)
		}

6) Create a new request namely "Read Profile", select the 'GET' method and send the request to the path '{{url}}/users/me' to read current logged in user profile

7) Create a new request namely "User Logout", select the 'POST' method and send the request to the path '{{url}}/users/logout' to logout from the latest session

8) Create a new request namely "LogoutAll", select the 'POST' method and send the request to the path '{{url}}/users/logoutAll' to logout from the all sessions

9) Create a new request namely "Update User", select the 'PATCH' method and pass the following data in 'Body'(select JSON) and send the request to the path '{{url}}/users/me' to update user

	Body : {
		"name" : "Zach Lavine"
		}	

10) Create a new request namely "Delete User", select the 'DELETE' method and send the request to the path '{{url}}/users/me' to delete the logged in user

11) Create a new request namely "Create product", select the 'POST' method and pass the following data in 'Body'(select JSON) and send the request to the path '{{url}}/products' to create a new product

	Body : {
		"_id" : 2,
	     "name" : "Carrot",
	     "price" : 3,
	     "InStock" : true,
	     "stock" : 50,
	     "marker" : "veg"
	}

12) Create a new request namely "Update product", select the 'PATCH' method and pass the following data in 'Body'(select JSON) and send the request to the path '{{url}}/products' to update an existing product

	Body : {
	"price" : 4
	} 
 

13) Create a new request namely "Get product by name", select the 'GET' method and send request to {{url}}/products/:name to get a product by name, replace the 'name' part in the url with the name of the product ex :- {{url}}/products/Spinach

14) Create a new request namely "Get product by name", select the 'GET' method and send request to {{url}}/products/:marker to get a product by category, ex :- {{url}}/products/?marker=veg

15) Create a new request namely "Delete Product", select the 'DELETE' method and send the request to the path '{{url}}/products/:name' to delete the product by name, ex :- {{url}}/products/Carrot

16) Create a new request namely "Create cart", select the 'POST' method and pass the following data in 'Body'(select JSON) and send the request to the path '{{url}}/users/me/cart' to create a new cart for the logged in user

	Body : {
		"products" : [
				{
					"productId" : 1,
					"quantity" : 3
				},
				{
					"productId" :2,
					"quantity" : 3
				}
			]
		}


17) Create a new request namely "Update cart", select the 'PATCH' method and pass the following data in 'Body'(select JSON) and send the request to the path '{{url}}/users/me/cart' to update the existing cart of loggen in user

	Body : {
		"products" : [
				{
					"productId" :2,
					"quantity" : 5
				}
			]
	}


18) Create a new request namely "Get Cart", select the 'GET' method and send the request to the path '{{url}}/users/me/cart' to get the cart data of the logged in user profile

19) Create a new request namely "Delete Cart", select the 'DELETE' method and send the request to the path '{{url}}/users/me/cart' to delete the cart of the logged in user 

20) Run the "npm test" command in the terminal to run all test cases

