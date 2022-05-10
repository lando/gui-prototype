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
  // try {
  //   await auth0.getTokenSilently();
  // } catch (error) {
  //   if (error.error !== 'login_required') {
  //     throw error;
  //   }
  // }
  // await createAuth0Client({
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
    returnTo: 'lando:///loginreg'
  });
}

async function handleRedirect() {
  await auth0.handleRedirectCallback();
}

async function isAuthenticated() {
  return await auth0.isAuthenticated();
}

async function getAccessToken() {
  return await auth0.getTokenSilently();
}

module.exports = {
  getLoginUrl,
  getLogOutUrl,
  handleRedirect,
  isAuthenticated,
  getAccessToken,
}
