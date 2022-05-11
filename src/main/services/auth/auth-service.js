import createAuth0Client from '@auth0/auth0-spa-js';
import {Auth0Client} from '@auth0/auth0-spa-js';

const AUTH0_DOMAIN = 'dev-58jbozcd.us.auth0.com';
const AUTH0_CLIENT_ID = 'jaFOjJ2mxjUP4eDirSJjWidT1w1eFvW7';
const REDIRECT_URI = 'lando:///callback';
const AUDIENCE = `https://${AUTH0_DOMAIN}/api/v2/`;

let auth0 = null;

async function auth() {
  auth0 = new Auth0Client({
    domain: AUTH0_DOMAIN,
    client_id: AUTH0_CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    audience: AUDIENCE,
    scope: 'openid profile offline_access read:current_user',
    advancedOptions: {
      defaultScope: null,
    },
  });
  // try {
  //   await auth0.getTokenSilently();
  // } catch (error) {
  //   if (error.error !== 'login_required') {
  //     throw error;
  //   }
  // }
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
  return await auth0.buildAuthorizeUrl();
}

async function getLogOutUrl() {
  return await auth0.buildLogoutUrl({
    client_id: AUTH0_CLIENT_ID,
    returnTo: 'lando:///loginreg',
  });
}

async function handleRedirect() {
  await auth0.handleRedirectCallback();
}

async function isAuthenticated() {
  return await auth0.isAuthenticated();
}

async function getAccessToken() {
  // const id = await auth0.getIdTokenClaims();
  // console.log(id);
  return await auth0.getTokenSilently({
    audience: AUDIENCE,
    scope: 'openid profile offline_access read:current_user',
    advancedOptions: {
      defaultScope: null,
    },
  });
}

function getClient() {
  return auth0;
}

module.exports = {
  getLoginUrl,
  getLogOutUrl,
  handleRedirect,
  isAuthenticated,
  getAccessToken,
  getClient,
};
