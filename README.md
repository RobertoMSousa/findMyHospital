# README

## Table of Contents

- [Details](#details)
- [Requirements](#requirements)
- [Installation](#installation)
- [Build](#build)
- [Usage](#usage)
- [Testing](#testing)
- [Support](#support)
- [Contributing](#contributing)
- [Credits](#credits)
- [Suggestions](#suggestions)


## Details
### Name
Find Nearest Hospital

### Description
Basic example that gets the 5 nearest point when given two coordinates.
This project has two routes one that uses a MongoDB with all the points and other that reads and calculates the distance manually from a CSV file. This was intended to compare the performance difference between them.


### Author
Roberto Sousa


## Requirements
- Install [Node.js](https://nodejs.org/en/)
- Install [VS Code](https://code.visualstudio.com/)


## Installation
- Install dependencies
```
yarn
```
- Start the local project on production mode
```
yarn serve
```
- Start the local project on development mode
```
yarn develop
```

Call the API using some software like insomnia or postman.
If by any chance you choose to test using insomnia the import file with API calls is in the assets folder.


## Testing
This project has some basic test using jest.
In order to run them only need to run the following command `yarn test`


## Suggestions
- [TSLint](https://marketplace.visualstudio.com/items?itemName=eg2.tslint)
- [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)