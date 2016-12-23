[![Build Status](https://travis-ci.org/Mayjest/RUMembership.svg?branch=master)](https://travis-ci.org/Mayjest/RUMembership)

# RUMembership
A membership and payments database app custom written for Reading ultimate, mainly for me to learn Node.

Very much a work in progress - even 'done' things are liable to change if I learn a new trick or find a new package to do it better.

# How to install
Make sure you have Node.js installed.

All steps should be using a command line (cmd in Windows, for example)
```cmd
git clone https://github.com/Mayjest/RUMembership.git

cd RUMembership

npm install
```
You might also need to install angular-cli globally.
```npm
npm install -g angular-cli
```
# Start the system

You can start both client and server with one command:

```npm
npm start
```
However, this isn't that useful for development. Ideally you'd had the client and server rebuild if you make a change so you can see 
the effect of the change quickly. Until it's working in one line, it's best to have two cmd/bash windows open and start the 
client and server separately: 

```npm
npm run _server:run
```
and
```npm
npm run _client:run
```

# Deployment
A live version is hosted on Heroku here:
[RUMembership on Heroku](https://ru-membership.herokuapp.com)

This is deployed automatically from successful commits to the RUMembership master branch on GitHub. Successful is currently defined as 'it builds and the (server) tests pass'