# Project Documentation
## Tools used

The documentation uses a local version of [GitBook](https://www.gitbook.com/). GitHub Wikis would have been an alternative, but the advantage of GitBook is not dependent on GitHub.

## Usage for Development

The following scripts are defined in `/package.json`.

Installing the dependencies can be done with:

    $ npm run docs:prepare

Building and serving the book on http://localhost:4000:

    $ npm run docs:watch

Building from scratch:

    $ npm run docs:build

Building the documentation and committing it to the `gh-pages`branch:

    $ npm run docs:publish


## Install in new Project

The whole setup for publishing with GitHub Pages is following [Using Gitbook to document an open source project](https://medium.com/@gpbl/how-to-use-gitbook-to-publish-docs-for-your-open-source-npm-packages-465dd8d5bfba).