# Stack Match

> Find and follow companies by tech stack

## Table of Contents
1. [Summary](#summary)
1. [Deployed](#deployed)
1. [Requirements](#requirements)
1. [Usage](#Usage)
1. [Team](#team)
1. [Contributing](#contributing)

## Summary

As a developer, it's useful to know what companies are using specific technologies - or what tech stack a company you know about is using. Stack Match enables users to search for both of these and follow companies of interest.

## Deployed Link

http://stackmatch-dev.herokuapp.com/#/


## Requirements

- node 0.12.7
- nodemon
- npm 2.14.1
- mysql 2.9.0
- gulp 3.9.0
- mocha 2.3.0

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
```

### Starting Server

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