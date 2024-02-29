# Northcoders News API


# Link to NC NEWS LIVE!
https://nc-news-jluj.onrender.com


## About the project
This nc-news repo consists of the backend work of the nc-news website link above.
This project was built with consistently with TDD and has multiple endpoints that allow for interaction with the user.

In the endpoints.json file, you will find information with examples on each endpoint availables. Perfect so you don't have to console.log and run psqls for each endpoints. For both you and me! The test in index.test.js for the json file works when json file is changed- so its dynamic. yay!


It consists of the following: 

# GET
1. Has the endpoint /api/topics that returns an array of topics.
2. On the endpoint /api/articles/:article_id we can access an article by id.
3. We are able to access an array of all articles, on the endpoint /api/articles, with body property removed, a comment_count added and in descending order of created_at key.
4. We can access all comments of an article when the user requests specific comments using article_id- on endpoint /api/articles/:article_id/comments.
5. We're able to return an array of all users on the endpoint /api/users.

# Query
1. On the endpoint /api/articles?topic=${query}, users can make query to find articles of specific topics.

# PATCH
1. We can also increment and decrement the votes of an article on the endpoint /api/articles/:article_id.

# POST
1. On the endpoint /api/articles/:article_id/comments, a valid user can add a comment using an article id.

# DELETE
9. We can delete a comment by comment_id on the endpoint /api/comments/:comment_id.

# Error Handling
Handles errors 404 and 400 for each endpoint and refactored errors so that they are handled more efficiently in an error handling file, where possible.

In order to host and make the site live, an .env.production file was created and hosting was completed on elephantsql and render.


# Getting started
To be able to use this repo you will need to clone it, istall somw dependencies, seed the local database and be able to run tests. 

Follow these intructions to do just that:

<cloning>
You will need to have git installed in your terminal on vsCode (or whatever you use to look at repos). Instructions on how to do this can be found here: https://git-scm.com/downloads.

On github, click on the giant green button that says CODE. Copy the url thats under HTTPS(it should automatically show you that url).

In your terminal, type: git clone <paste-url-here>
Replace <paste-url-here> with the url.

You can now open the repo on vscode or equivalent.
info on installing vsCode can be found here: https://code.visualstudio.com/download.

<installing>
In your terminal install the following:
npm init -y
npm install
npm install --save-dev jest
npm install pg
npm install pg-format
npm install dotenv --save
npm install supertest --save-dev
npm install express
npm install --save-dev jest-sorted

<seeding>
Then run this in your terminal:
npm run setup-dbs

<testing>
To run all tests, in your terminal run:
npm test
Alternatively you can run: npm t

To run a specific test file, run:
npm t <name-of-file>

e.g. to run the index.test.js file, you'd run:
npm t index.test.js


# Creating .env. files:
.env.* has been added and gitignored.
To connect to the files locally, you will need to add two .env. files one .env.test and one .env.development. Inside them you should have something that looks like:

PGDATABASE=<database_name_here>

Replace the <database_name_here> with the database names found in /db/setup.sql

# running with Node.js and Postgress
You will need to have a minimum of Postgredd 14 installed and node v20.11.1.
To install these, or get the updated versions, click here:
https://nodejs.org/en/download
https://postgresapp.com/downloads.html

THANKS FOR READING! HIRE ME. I'M VIBES! haha