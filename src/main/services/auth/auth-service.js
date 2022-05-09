const jwtDecode = require('jwt-decode');
const axios = require('axios');
const url = require('url');
const keytar = require('keytar');
const os = require('os');
import createAuth0Client from '@auth0/auth0-spa-js';
import { Auth0Client } from '@auth0/auth0-spa-js';

const AUTH0_DOMAIN = 'dev-58jbozcd.us.auth0.com';
const AUTH0_CLIENT_ID = 'jaFOjJ2mxjUP4eDirSJjWidT1w1eFvW7';
const REDIRECT_URI = 'lando:///callback';

let auth0 = null;

async function auth() {
  auth0 = new Auth0Client({
    domain: AUTH0_DOMAIN,
    client_id: AUTH0_CLIENT_ID,
    redirect_uri: REDIRECT_URI,
  });
  // auth0 = await createAuth0Client({
  //   domain: AUTH0_DOMAIN,
  //   client_id: AUTH0_CLIENT_ID,
  //   redirect_uri: REDIRECT_URI,
  // });
}
if (auth0 === null) {
  auth();
}

async function getLoginUrl() {
  const url = await auth0.buildAuthorizeUrl();
  return url;
}

async function getLogOutUrl() {
  const url = await auth0.buildLogoutUrl({
    client_id: AUTH0_CLIENT_ID,
    returnTo: 'lando://'
  });
  return url;
}

async function handleRedirect() {
  await auth0.handleRedirectCallback();
}

async function isAuthenticated() {
  return await auth0.isAuthenticated();
}

module.exports = {
  getLoginUrl,
  getLogOutUrl,
  handleRedirect,
  isAuthenticated,
}
