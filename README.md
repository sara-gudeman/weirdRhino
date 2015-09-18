# Stack Match

> Find and follow companies by tech stack

## Summary

As a developer, it's often useful to know what companies are using the same technologies as you - or what tech stack a company you know about is using. Stack Match enables users to search by technology or company name and follow companies of interest.

## Deployed to

http://stackmatch-dev.herokuapp.com/#/

## Team

  - __Product Owner__: Harry Saddler
  - __Scrum Master__: Lauren Janicki
  - __Development Team Members__: Sara Gudeman, Erik Barzdukas

## Table of Contents

1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Usage](#Usage)
1. [Team](#team)
1. [Contributing](#contributing)

## Requirements

- node 0.12.7
- nodemon
- npm 2.14.1
- mysql 2.9.0
- gulp 3.9.0
- mocha 2.3.0
- bower

## Development

## Usage

### Creating a local database

1. Start mySQL server
2. Run in mySQL shell:
```sh
CREATE DATABASE stackmatch;
```

3. Then populate your local database. In command line:
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

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.