# Northcoders News API

1. 
.env.* has been added and gitignored.
To connect to file locally, add two .env. files one .env.test and one .env.development. Inside them should look like:
PGDATABASE=database_name_here

see /db/setup.sql for database names.


2. endpoint /api/topics can return array of topics successfully

3. able to access endpoints.json file with info on code so far. checked that it works when json file is changed. works, so is dynamic. yay!

4. able to access article by id. errors 404 and 400 handled. updated endpoints.json. all tests passing and up to date with endpoints.json.

5. able to access all articles with body property removed, a comment_count added and in descending order of created_at key.

next: need to seperate error handling out of app file into errorhandling file.