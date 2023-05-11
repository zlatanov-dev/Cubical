Cubical App README

Welcome to Cubical, a web application for cataloging Rubik's cubes! 
This app allows users to add Rubik's cubes to their collection and customize them by adding accessories. 
It also allows users to edit and delete their cubes. 
The app is built using JS, Node.js, Express.js, Mongoose, Cookies and JSON web tokens.

Authentication and Authorization

This app uses JSON web tokens for authentication and authorization. 
When a user logs in or registers, a token is generated and stored in an HTTP-only cookie. 
This cookie is sent with each subsequent request to the server, allowing the server to verify the user's identity and authorization.
