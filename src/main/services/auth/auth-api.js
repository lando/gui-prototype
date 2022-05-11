import authService from './auth-service.js';
const axios = require('axios');

const AUTH0_DOMAIN = 'dev-58jbozcd.us.auth0.com';
const AUTH0_CLIENT_ID = 'jaFOjJ2mxjUP4eDirSJjWidT1w1eFvW7';
const REDIRECT_URI = 'lando:///callback';

let auth0 = null;

if (auth0 === null) {
  auth0 = authService.getClient();
}

async function getUserId() {
  const user = await auth0.getUser();
  return user.sub;
}

async function getUser(token) {
  if (token === undefined || token === null) {
    throw new Error('No token passed to function');
  }

  const id = await getUserId();
  const options = {
    method: 'GET',
    url: `https://${AUTH0_DOMAIN}/api/v2/users/${id}`,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    },
  };

  const response = await axios(options);
  const data = response.data;
}

module.exports = {
  getUser,
};
