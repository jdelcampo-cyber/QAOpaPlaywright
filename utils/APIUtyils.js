class APIUtils {
    constructor(apiContext, loginPayload, newloginPayload) {
        this.apiContext = apiContext;
        this.loginPayload = loginPayload;
        this.newloginPayload = newloginPayload;
    }
    async getToken() //login API = create mew method
    {
       const loginResponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login',
            {
                data: this.loginPayload,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            }); //200, 201
        const loginResponseJson = await loginResponse.json();
        console.log("Login API Response:", loginResponseJson);
        if (!loginResponseJson.token) {
            throw new Error(`Login failed: ${JSON.stringify(loginResponseJson)}`);
        }
        return loginResponseJson.token;
    }

    async getEventHubToken() {
        const loginResponse = await this.apiContext.post('https://api.eventhub.rahulshettyacademy.com/api/auth/login',
            {
                data: {
                    email: this.loginPayload.userEmail ?? this.loginPayload.email,
                    password: this.loginPayload.userPassword ?? this.loginPayload.password,
                },
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            });
        const loginResponseJson = await loginResponse.json();
        console.log("EventHub Login API Response:", loginResponseJson);
        if (!loginResponseJson.token) {
            throw new Error(`EventHub login failed: ${JSON.stringify(loginResponseJson)}`);
        }
        return loginResponseJson.token;
    }

    async getnewToken() //login API = create mew method
    {
       const loginResponse = await this.apiContext.post('https://rahulshettyacademy.com/client/#/auth/login',
            {
                data: this.newloginPayload,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }); //200, 201
        const loginResponseJson = await loginResponse.json();
        console.log("Login API Response:", loginResponseJson);
          if (!loginResponseJson.token) {
    throw new Error(`Login failed: ${JSON.stringify(loginResponseJson)}`);
  }
        return loginResponseJson.token;
    }

    async createOrder(orderPayload) //createorder API = create mew method
    {
        let response = {};  // create new object
        response.token = await this.getEventHubToken();
        if (!response.token) {
            throw new Error('Login failed: token is undefined');
        }
        const orderResponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/order/create-order',
            {
                data: orderPayload,
                headers:
                {
                    'Authorization': `Bearer ${response.token}`,
                    'Content-Type': 'application/json'
                },
            })
        const orderResponseJson = await orderResponse.json();
        console.log("API Response:", orderResponseJson);
        if (!orderResponseJson.orders || orderResponseJson.orders.length === 0) {
            throw new Error(`Order creation failed: ${JSON.stringify(orderResponseJson)}`);
        }

        return {
            response,
            orderID: orderResponseJson.orders[0]
        };
    }

    async createEvent(eventPayload) //createorder API = create mew method
    {
        let response = {};  // create new object
        response.token = await this.getEventHubToken();
        const eventResponse = await this.apiContext.post('https://api.eventhub.rahulshettyacademy.com/api/events',
            {
                data: eventPayload,
                headers:
                { //Most APIs expect Bearer <token>, not just the raw token.
                    'Authorization': `Bearer ${response.token}`,
                    'Content-Type': 'application/json'
                },
            })
        const eventResponseJson = await eventResponse.json();
        console.log("API Response:", eventResponseJson);
        return {response, event: eventResponseJson }; // can return using response also
    }

    async createBooking(bookingPayload) //createorder API = create mew method
    {
        let response = {};  // create new object
        response.token = await this.getEventHubToken();
        const bookResponse = await this.apiContext.post('https://api.eventhub.rahulshettyacademy.com/api/bookings',
            {
                data: bookingPayload,
                headers:
                { //Most APIs expect Bearer <token>, not just the raw token.
                    'Authorization': `Bearer ${response.token}`,
                    'Content-Type': 'application/json'
                },
            })
        const bookResponseJson = await bookResponse.json();
        console.log("API Response:", bookResponseJson);
        response.booking = bookResponseJson;

        // Adjust this line based on actual response shape
        const bookingId = bookResponseJson.data?.id;
        response.bookingUrl = `https://eventhub.rahulshettyacademy.com/bookings/${bookingId}`;
        return response;

    }
}

module.exports = { APIUtils };