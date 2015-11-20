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

Stach Match gives developers quick access to information about companies and their tech stacks. Users can provide information about their own skills in addition to curating a list of favorite companies.

## Deployed Link

http://stackmatch.herokuapp.com


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

  - __Product Owner__: Harry Sadler
  - __Scrum Master__: Lauren Janicki
  - __Development Team Members__: Sara Gudeman, Erik Barzdukas
