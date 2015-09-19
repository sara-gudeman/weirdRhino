# Stack Match

> Find and follow companies by tech stack

1. [Summary](#summary)
1. [Deployed](#deployed)
1. [Requirements](#requirements)
1. [Usage](#Usage)
1. [Team](#team)
1. [Contributing](#contributing)

## Summary

As a developer, it's often useful to know what companies are using the same technologies as you - or what tech stack a company you know about is using. Stack Match enables users to search by technology or company name and follow companies of interest.

## Deployed link

http://stackmatch-dev.herokuapp.com/#/

## Table of Contents

## Requirements

- node 0.12.7
- nodemon
- npm 2.14.1
- mysql 2.9.0
- gulp 3.9.0
- mocha 2.3.0
- bower

## Usage

### Creating a local database

1. Start mySQL server
2. Run in mySQL shell:
```sh
CREATE DATABASE stackmatch;
```

### Populating your local database. 

In command line:
``````sh
node server/tasks/scrape.js;
```
### Installing dependencies

From within the root directory:

```sh
npm install
bower install
```

### Starting server

```sh
gulp
```

This will start a server with nodemon, build with webpack, and rebuild on saved changes. Open your browser to localhost:8080 to view the app.

## Team

  - __Product Owner__: Harry Saddler
  - __Scrum Master__: Lauren Janicki
  - __Development Team Members__: Sara Gudeman, Erik Barzdukas

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.