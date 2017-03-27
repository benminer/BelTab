# JavaScript SCRUM Board // SP17 Software Engineering Project

This project was built from Heroku's MEANContactList2 tutorial.
https://devcenter.heroku.com/articles/mean-apps-restful-api#prerequisites

## Prerequisites

Heroku CLI

`brew install heroku`

Node.js

https://nodejs.org/en/download/

Angular CLI

`npm install -g angular-cli`

MongoDB

`brew install mongodb`

## Installation

Clone the repo into a directory of your choice.

`git clone https://github.com/benminer/JS-Scrum-Board.git`

Navigate to the directory that it was cloned into, then install dependencies.

`npm install`

Log into your Heroku account through terminal to allow commits and pushes.

`heroku login`

## Initialize LocalHost for testing

Make a MongoDB folder in your root directory.

`mkdir -p /data/db`

Navigate to these folders in Finder and change the privileges from "Read Only" to "Read & Write" for Everyone. This allows MongoDB to write to these folders.

Start the local data base while in the project directory.

`mongod`

Now, switch to the develop branch. It contains the proper code for testing locally. Do this by running

`git checkout develop` and then `git pull` while cd'd into the project.

Now, to get the local app running, run

`npm start`

In your internet browser, navigate to http://localhost:8080/.

You should see your changes reflected on refresh.
