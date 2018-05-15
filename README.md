# liri-node-app
## Introduction
LIRI is a language interpretation and recognition interface similar to SIRI. 

## What the project does
LIRI receives commands from the node app and gives back data.  Whereas SIRI receives voice commands and gives back data.

## Limitations
LIRI can take 4 commands from the GitBash command line and provide data using the respective APIs:
1)  "node liri.js my-tweets" --- shows your last 20 tweets using the Twitter API
2)  "node liri.js spotify-this-song <song name>" --- Provides information about the song using the Spotify API.
3)  "node liri.js movie-this <movie name>" --- Provides information about the movie using the OMDB API.
4)  "node liri.js do-what-it-says that reads a command from the random.text file and executes,.

## Why the project is useful
This was an exercise in using these web technologies:  nodeJS, JavaScript, NPM libraries, JSON packages, API keys (Twitter and Spotify), .env and gitignore files, and API queries.

## Challenges
1)  Node.js is a back-end technology that required practice (like with anything) to get it.
2)  Setting up the keys file that points to a .env file that contains the actual keys.  The .env file is added to .gitignore meaning that the keys will not be pushed to GitHub and thus, will be secure.
3)  Getting the desired song and movie information from the API response.  It took much trial and error.
4)  Using the File System (fs) module for file i/o.

## Link to [My Portfolio](https://teeterjm58.github.io/Basic-Portfolio/portfolio.html)