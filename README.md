# Redux Movie Gallery Saga

_Duration: 2 Day Sprint_

## Description

This project focused on creating a responsive movie gallery website using React and Redux-Saga. In this project, an additional challenge was to add multiple genres for a movie using multi-select in a drop-down list, and store these genres in a database.

The movie list will be shown on the main page. You can click on a movie to go to its details view - the details view will show the movie's genres and description.

### Prerequisites

Link to software that is required to install the app (e.g. node).

- [Node.js](https://nodejs.org/en/)
- [Postgres](https://postgresapp.com/)

## Installation

1. Create a database named `saga_movies_weekend`,
2. The queries in the `database.sql` file are set up to create all the necessary tables and populate the needed data to allow the application to run correctly. The project is built on [Postgres](https://www.postgresql.org/download/), so you will need to make sure to have that installed. We recommend using Postico to run those queries as that was used to create the queries, 
3. Open up your editor of choice and run an `npm install`
4. Run `npm run server` in your terminal
5. Run `npm run client` in your terminal
6. The `npm run client` command will open up a new browser tab for you!

## Usage

1. Scroll through the movie gallery and click on the movie to see the details.
2. In the details page, see the full size movie poster, list of movie's genres, and read the description.
3. Add a movie by clicking 'ADD MOVIE' at the top of the page. You can select multiple genres from the drop-down list.

## Built With

- React
- Redux 
- Redux-Saga
- Node.js
- PostgreSQL
- Material-UI