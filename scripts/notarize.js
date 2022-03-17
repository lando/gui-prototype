require('dotenv').config();
const {notarize} = require('electron-notarize');
const config = require('../config/electron-builder.json');

exports.default = async function notarizing(context) {
  const {electronPlatformName, appOutDir} = context;
  if (electronPlatformName !== 'darwin' || process.platform !== 'darwin') {
    return;
  }

  const appName = context.packager.appInfo.productFilename;
  if (typeof process.env.APPLE_NOTARY_USER === 'undefined') {
    console.log('skipping notarization, remember to setup environment variables for APPLE_NOTARY_USER and APPLE_NOTARY_PASSWORD if you want to notarize');
    return;
  }
  await notarize({
    appBundleId: config.appId,
    appPath: `${appOutDir}/${appName}.app`,
    appleId: process.env.APPLE_NOTARY_USER,
    appleIdPassword: process.env.APPLE_NOTARY_PASSWORD,
  });
};
