# List of movies, CRUD practice with http request

I have created a movie list app to implement the CRUD topic with http request, the app allows you to create, update and delete movies



## 🛠 Technologies used
HTML, CSS , Javascript, sweetAlert2 and HTTP request methods (GET, POST, PUT, and DELETE)


## Requirements

- Node.js y npm (Node Package Manager)

- JSON Server


## Installation

**1. Clone the repository**

```bash
  git clone https://github.com/jfigueira87/Practice-CRUD-httpRequest.git
```

**2. Install JSON Server**

If you don't have JSON Server installed globally, you can install it with npm:

```bash
  npm install -g json-server
```

    
## Configuration

I have a script set up to start the json-server server

```bash
    "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "api": "json-server --watch server/db.json --port 8000"
  },
```

In the terminal, inside the project folder, run the following command to start JSON Server:

```bash
    npm run api
```

This will raise a RESTful server at http://localhost:8000 that simulates an API to the database in the db.json file.
## Using the app

- **Viewing the list of movies**

On page load, the app fetches and displays the list of movies available in the API.

- **Deleting a movie**

Each movie in the list has a "Delete" button which, when clicked, will remove that character from the API.

![View and Delete movie](/assets/images/CRUD-01.jpg)

- **Creating a new movie**

To add a new movie, click the "Add movie" button in the interface (at the bottom of the screen) and provide the movie details.

![Create movie](/assets/images/CRUD-create.jpg)

- **Updating a movie**

Each movie in the list has an "Update" button which, when clicked, displays a form with the data it contains and we can modify the data we want.

![Update movie](/assets/images/CRUD-update.jpg)

## Demo

Here we have a demo of the main page of the application

![Main page](/assets/images/page.jpg)

## Upcoming updates

Add a movie search engine
