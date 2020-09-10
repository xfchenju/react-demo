/*
 * @Description: 
 * @Author: chenju
 * @Date: 2020-09-10 13:50:09
 * @LastEditors: chenju
 * @LastEditTime: 2020-09-10 15:39:51
 */
'use strict';

const path = require('path');
const fs = require('fs');
const getPublicUrlOrPath = require('react-dev-utils/getPublicUrlOrPath');

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebook/create-react-app/issues/637
const appDirectory = fs.realpathSync(process.cwd());

const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

// We use `PUBLIC_URL` environment variable or "homepage" field to infer
// "public path" at which the app is served.
// webpack needs to know it to put the right <script> hrefs into HTML even in
// single-page apps that may serve index.html for nested URLs like /todos/42.
// We can't use a relative path in HTML because we don't want to load something
// like /todos/42/static/js/bundle.7289d.js. We have to know the root.
const publicUrlOrPath = getPublicUrlOrPath(
  process.env.NODE_ENV === 'development',
  require(resolveApp('package.json')).homepage,
  process.env.PUBLIC_URL
);

const moduleFileExtensions = [
  'web.mjs',
  'mjs',
  'web.js',
  'js',
  'web.ts',
  'ts',
  'web.tsx',
  'tsx',
  'json',
  'web.jsx',
  'jsx',
];

// Resolve file paths in the same order as webpack
const resolveModule = (resolveFn, filePath) => {
  const extension = moduleFileExtensions.find(extension =>
    fs.existsSync(resolveFn(`${filePath}.${extension}`))
  );

  if (extension) {
    return resolveFn(`${filePath}.${extension}`);
  }

  return resolveFn(`${filePath}.js`);
};

const rawArgv = process.argv.slice(2);
const project = rawArgv[0];
const env = rawArgv[1];
console.log(`当前运行的项目是：${project}`);
console.log(`当前运行的环境是：${env}`)

let appPage = {};
const defaultAppPages = {
    name: "index",
    appBuild: "build",
    appHtml: "public/index.html",
    appIndexJs: "src/index"
};
const appPages = require(resolveApp('package.json')).appPages;
if (appPages === undefined || appPages === null || appPages.length === 0) {
    appPage = defaultAppPages;
} else {
    const index = appPages.findIndex(n => n.name === project);
    if (index > -1) {
        appPage = appPages[index];
    } else {
        console.log('运行指令不在自定义项目配置范围，已使用首个自定义项目配置...');
        appPage = appPages[0];
    }
}

// config after eject: we're in ./config/
module.exports = {
  dotenv: resolveApp('.env'),
  appPath: resolveApp('.'),
  appBuild: resolveApp(appPage.appBuild),
  appPublic: resolveApp('public'),
  appHtml: resolveApp(appPage.appHtml),
  appIndexJs: resolveModule(resolveApp, appPage.appIndexJs),
  appPackageJson: resolveApp('package.json'),
  appSrc: resolveApp('src'),
  appTsConfig: resolveApp('tsconfig.json'),
  appJsConfig: resolveApp('jsconfig.json'),
  yarnLockFile: resolveApp('yarn.lock'),
  testsSetup: resolveModule(resolveApp, 'src/setupTests'),
  proxySetup: resolveApp('src/setupProxy.js'),
  appNodeModules: resolveApp('node_modules'),
  publicUrlOrPath,
};



module.exports.moduleFileExtensions = moduleFileExtensions;
