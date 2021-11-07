# MAJESTYK
Majestyk is a NYC headquartered team of engineers, designers, and entrepreneurs providing creative, analytic, and technical services to help companies achieve their goals through technology. The Majestyk team creates launch-ready MVPs, iterates on existing products, and executes go-to-market strategies for both startups and Fortune 500 compani...

## Required Features

- Sign in
- Sign up
- Process image (protected)

## Technologies

- React JS
- Laravel
- Docker

## Requirements and Installation

To install and run this project you would need to have installed:
- Node Js
- Git
- PHP
- Clone this repo using `git clone https://github.com/jiokeokwuosa/majestyk-dockerizedApp.git
- Note1: Please run the backend(server) first before the frontend
- Note2: The resized images can be found in the directory `storage/app`
- Note3: The frontend listens for the backend at this url `http://127.0.0.1:8000/api/user/`

To run backend:
```
$ cd app-backend
$ composer install
$ php artisan serve
```

To run frontend:
```
$ cd app-frontend
$ npm install
$ npm start
```

## Testing

```
$ none
```

## Pivotal Tracker stories

None

## Template UI

![Screenshot (347)](https://user-images.githubusercontent.com/33726993/140661387-e237f302-e1df-47ce-9c18-e733afbae5d9.png)
![Screenshot (348)](https://user-images.githubusercontent.com/33726993/140661391-4b416159-5f26-4d24-9480-182e35a60079.png)
![Screenshot (349)](https://user-images.githubusercontent.com/33726993/140661392-cd51d66c-f0d8-4f13-ba4f-a3d09fac3934.png)
![Screenshot (350)](https://user-images.githubusercontent.com/33726993/140661393-6ba213ff-9ef1-4bd8-8cce-a19da3e6bbd6.png)


## API

The API is currently in version 1 (v1) and can be accessed locally via [http://127.0.0.1:8000/api/user/](http://127.0.0.1:8000/api/user/)

## API Documentation Link

None

## API Endpoints

| Endpoint                                         | Functionality                            |
| ------------------------------------------------ | -----------------------------------------|
| POST /baseURL/register          | Create a user account                        |
| POST /baseURL/login  | login a user                         |
| POST /baseURL/process-image  | process uploaded image                       |



## Author

Okwuosa Chijioke (Okwuosachijioke@gmail.com)

## License

This is licensed for your use, modification and distribution under the [MIT license.](https://opensource.org/licenses/MIT)

## My Env Variables for Backend

