# Pawsome App

<img src="https://raw.githubusercontent.com/HeidiDragomir/pawsome-frontend/main/src/assets/icon.PNG" style="width: auto; height: auto; border-radius: 10px">

Pawsome is the perfect place where you can find a paw friend, do some volunteering, create pet events or donate anything. Moreover you can ask anything if you have a problem or only need to know something related to your pet. Pawsome is like a pet friendly community where you can find help or just look to all adorable cats and dogs who would love to join to your family.

## Table of Contents

-   [General Information](#general-information)
-   [Goals](#goals)
-   [Built with](#built-with)
-   [Deployment](#deployment)
-   [Code formatting & Naming conventions](#code-formatting-&-Naming-conventions)
-   [Sitemap, Design & User Stories](#sitemap,-design-&-user-stories)
-   [Getting Started](#getting-started)
-   [Future Extra Challanges](#future-extra-challanges)
-   [Contact](#contact)
-   [License](#license)

## General Information

- You can find live version here: [Pawsome](https://pawsome-fe.netlify.app/)
- and Frontend Github Repository here: [Frontend Github Repository](https://github.com/HeidiDragomir/pawsome-frontend)


## Goals

There are too many cats and dogs who are looking after a temporary or a forever home, but helping them doesn’t have to be complicated. I started with the idea to do an app where anyone can do more then to adopt a pet. This app is not enterly finished, the functionality could have more complexity, but my future plan is to come back to do this when I have more experience.

## Built with

-   [React.js](https://reactjs.org/)
-   [React Redux](https://react-redux.js.org/)
-   [NodeJS](https://nodejs.org/en/)
-   [ExpressJS](https://expressjs.com/)
-   [MongoDB](https://www.mongodb.com/)

## Deployment

Frontend is deployed with [Netlify](https://www.netlify.com) and backend with [Render](https://render.com)'s free plan that automatically spun down after 15 minutes of inactivity. When a new request for a free service comes in, Render spins it up again so it can process the request. This can cause a response delay of up to 30 seconds for the first request that comes in after a period of inactivity.

## Code formatting & Naming conventions

I followed [this guide](https://vicvijayakumar.com/blog/eslint-airbnb-style-guide-prettier) as it is a requirement of the project.

| Name            | Example          | Usage                    |
| --------------- | ---------------- | ------------------------ |
| **kebab case**  | is-not-a-dish    | style classes            |
| **pascal case** | AllInOneCapitals | components, jsx pages    |
| **camel case**  | goesDownThenUp   | jsx variables, css files |

## Sitemap, Design & User Stories

-   Protoypes were made using figma and can be found [here](https://www.figma.com/file/KWvxWy6hH9G0z1maurjVnn/Pawsome?node-id=0%3A1)
-   Sitemap, user stories, personas and all the routes are available [here](https://docs.google.com/document/d/13NP9lJK8uG1G-ib99IhqlUoNyNjz5nhY0n5a3xCLsfI/edit?usp=sharing)

## Getting started

1. Start by cloning the repository:

```
git@github.com:HeidiDragomir/pawsome-backend.git
```

2. Install npm dependencies in the root folder

```
npm install
```

3. Create .env file to store the environmental variables

```
PORT = 5000
MONGO_URI = enter mongo uri
JWT_SECRET = enter jwt secret
```

4. Start server

```
npm start
```


## Future Extra Challanges

- Add a payment method in order to donate money
- When adopt or foster --> connect automatically with the owner (email, message, chat)
- Happy story Section
- Last added Section
- A map with the location of the pet's owner

## Contact

Email: [@HeidiDragomir](https://github.com/HeidiDragomir)

LinkedIn: [Marinela-Adelheid (Heidi) Dragomir](https://www.linkedin.com/in/heidi-dragomir/)

## License

Distributed under the MIT License. See [LICENSE](https://choosealicense.com/licenses/mit/) for more information.