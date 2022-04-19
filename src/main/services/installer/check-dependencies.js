import {useInstallerStore} from '../../../renderer/stores/installer.js';
import {_} from 'lodash';
const os = require('os');
const store = useInstallerStore();

function checkDependencies() {
  store.osStatus = getOsStatus();
  store.dockerStatus = getDockerStatus();
}

// Check Operating System Compatibility
function getOsStatus() {
  const supportedOS = ['Darwin Kernel Version 22', 'Darwin Kernel Version 21', 'Darwin Kernel Version 20'];
  const currentOS = os.version();
  return checkVersions(supportedOS.value, currentOS);
}

function getDockerStatus() {
  const supportedDocker = ['Docker Desktop 3.3', 'Docker Desktop 4.4', 'Docker Desktop 4.6'];
  const currentDocker = 'Docker Desktop 4.6';
  return checkVersions(supportedDocker.value, currentDocker);
}

// @todo: We'll need to have this respect ranges to produce three statuses;
// exact match would be success, extended compatibility is warning,
// explicit incompatibility is error.
function checkVersions(supportedVersions, currentVersion) {
  console.log(supportedVersions, currentVersion);
  return _.chain(supportedVersions).find(supportedVersion => {
    return currentVersion.indexOf(supportedVersion) > -1;
  }).isString().value() ? 'success' : 'warning';
}


module.exports = {
  getOsStatus,
  getDockerStatus,
  checkDependencies,
};
