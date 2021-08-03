const path = require('path');

const appRoot = path.join(__dirname, '..');
const threekitModule = path.join(appRoot, 'threekit');
const appPackageJson = path.join(appRoot, 'package.json');
const appBuild = path.join(appRoot, 'build_react');
const serverBuild = path.join(appRoot, 'build_server');
const serverRoot = path.join(appRoot, 'server');
const serverIndexJs = path.join(serverRoot, 'index.js');
const appPublic = path.join(appRoot, 'public');
const appIndexHtml = path.join(appPublic, 'index.html');
const appSrc = path.join(__dirname, '..', 'src');
const appIndexJs = path.join(appSrc, 'index.js');

const appYarnLock = path.join(appSrc, 'yarn.lock');
const nodeModules = path.join(appSrc, 'node_modules');

module.exports = {
  threekitModule,
  appPackageJson,
  appBuild,
  serverBuild,
  serverRoot,
  serverIndexJs,
  appPublic,
  appIndexHtml,
  appSrc,
  appIndexJs,
  appYarnLock,
  nodeModules,
};
