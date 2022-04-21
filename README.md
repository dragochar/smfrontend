# smfrontend
This is the frontend for SolMints, a community alpha webapp platform for Solana DAOs built by Zac Yungblut using JavaScript, React, HTML, and the Solana/web3.js repo

### Why was this project built?

This project was built with the intent to solve a real problem that communities and DAOs on Solana (and across other blockchains) face. Right now, to keep track
of upcoming minting NFT projects, communities use Discord and are limited to sending messages in channels that can easily got lost/confusing, and aren't
a great way to stay organized.

Alternatively, individual members can use 3rd party websites like HowRare.is and Hyperspace.xyz to see a calendar with upcoming mints. The issue here, is that
it's virtually impossible to distinguish great projects from average ones.

SolMints solves both of these problems by giving communities access to a custom built portal that restricts access by authenticating user's
Solana wallets. Upcoming projects can be submitted, and then voted on by community members, which are organized on a clean, sleek dashboard and 
can be filtered and searched by users.


## Build Instructions
To run this repository locally, please follow the next few steps
1. clone the repository onto your local device using: $ git clone https://github.com/dragochar/smfrontend.git
2. cd into the clone repository using: $ cd smfrontend
3. install the dependencies using: $ npm install
4. check out the files, and run the server locally using: $ npm start
5. Have fun! Reach out to Zac if you run into any issues, or have questions: twitter.com/zacyungblut


#### Note: The backend was also custom built (using express and node.js, with a Mongo database) by me, and can be found at the following link: https://github.com/dragochar/daospot
