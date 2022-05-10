import createAuth0Client from '@auth0/auth0-spa-js';
import { Auth0Client } from '@auth0/auth0-spa-js';

import {useAuthStore} from '../../../renderer/stores/auth.js'
const store = useAuthStore();

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
  const url = await auth0.buildAuthorizeUrl();
  return url;
}

async function getLogOutUrl() {
  const url = await auth0.buildLogoutUrl({
    client_id: AUTH0_CLIENT_ID,
    returnTo: 'lando:///loginreg'
  });
  return url;
}

async function handleRedirect() {
  await auth0.handleRedirectCallback();
}

async function isAuthenticated() {
  return await auth0.isAuthenticated();
}

async function setAccessToken() {
  const token = await auth0.getTokenSilently();
  console.log(store.accessToken)
  store.accessToken = token;
  console.log(store.accessToken)
}

module.exports = {
  getLoginUrl,
  getLogOutUrl,
  handleRedirect,
  isAuthenticated,
  setAccessToken,
}
