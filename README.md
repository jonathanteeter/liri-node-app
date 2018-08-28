# liri-node-app
LIRI is a node.js application that provides "Language Interpretation and Recognition Interface" (LIRI) similar to SIRI.  LIRI receives commands from the node app and gives back data.  (SIRI receives voice commands and gives back data.)

## Design & Technology
* LIRI can take 4 commands from command line and provide data using the respective APIs:
    * "node liri.js my-tweets" --- shows your last 20 tweets using the Twitter API
    * "node liri.js spotify-this-song <song name>" --- Provides information about the song using the Spotify API.
    * "node liri.js movie-this <movie name>" --- Provides information about the movie using the OMDB API.
    * "node liri.js do-what-it-says that reads a command from the random.text file and executes.
* Key technologies used to build this application are:
    * Node.js -- Server-side JavaScript environment
    * JavaScript -- Provides coding logic
    * NPM -- request, file system, twitter, node-spotify-api, dotenv
    * package.json -- Created by "npm init", contains all the NPM packages used
    * API keys -- Twitter, Spotify
    * API queries -- Twitter, Spotify, OMDB
    * .env -- Contains the API keys for Twitter, Spotify
    * .gitignore --  specifies files that Git should ignore (.env, node_modules)

## Challenges
* Node.js is a back-end technology that required practice (like with anything) to get it.
* Setting up the keys file that points to a .env file that contains the actual keys took a couple tries.  The .env file is added to .gitignore meaning that the keys will not be pushed to GitHub and as a result, will be secure.
* Getting the desired song and movie information from the API response took some trial and error.
* Using the File System (fs) module for file i/o took some practice.

## Link to [My Portfolio] 
(https://jonathanteeter.github.io/jtPortfolio/)