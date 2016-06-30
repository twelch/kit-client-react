React+Redux+Maps Starter Kit
=======================

#Goal

Build a simple multi-tenant client application on top of [react-redux-starter-kit](https://github.com/davezuko/react-redux-starter-kit) with the addition of: 
* Token-based Authentication (jwt)
* Mapbox GL JS (mapbox-gl-js)
* Internationalization (react-intl)
* Translation management (react-intl-translations-manager)

This client kit pairs with [kit-server-hapi](https://github.com/twelch/kit-server-hapi) which provides lightweight identity management and site access via REST API.

## Table of Contents
1. [Features](#features)
1. [Added Features](#added-features)
1. [Requirements](#requirements)
1. [Getting Started](#getting-started)
1. [Application Structure](#application-structure)
1. [Development](#development)
  1. [Language Translation](#language-translation)
  1. [Translation Architecture](#translation-architecture)
  1. [Developer Tools](#developer-tools)
  1. [Routing](#routing)
1. [Testing](#testing)
1. [Deployment](#deployment)
1. [Build System](#build-system)
  1. [Configuration](#configuration)
  1. [Root Resolve](#root-resolve)
  1. [Globals](#globals)
  1. [Styles](#styles)
  1. [Server](#server)
  1. [Production Optimization](#production-optimization)
1. [Learning Resources](#learning-resources)
1. [FAQ](#troubleshooting)
1. [Thank You](#thank-you)

## Features
* [react](https://github.com/facebook/react)
* [redux](https://github.com/rackt/redux)
* [react-router](https://github.com/rackt/react-router)
* [react-router-redux](https://github.com/rackt/react-router-redux)
* [webpack](https://github.com/webpack/webpack)
* [babel](https://github.com/babel/babel)
* [koa](https://github.com/koajs/koa)
* [karma](https://github.com/karma-runner/karma)
* [eslint](http://eslint.org)

## Added Features
* [material-ui](http://www.material-ui.com/)
* [react-redux-jwt-auth-example](https://github.com/joshgeller/react-redux-jwt-auth-example)
* [react-intl](https://github.com/yahoo/react-intl) with help from this [kit branch](https://github.com/juanda99/react-redux-starter-kit)
* [react-intl-translations-manager](https://github.com/GertjanReynaert/react-intl-translations-manager)
* [mapbox-gl-js](https://github.com/mapbox/mapbox-gl-js)

## Requirements
* node `^4.2.0`
* npm `^3.0.0`

## Getting Started

After confirming that your development environment meets the specified [requirements](#requirements), cloning this repository, and navigating on the command line to the top-level directory you can follow these steps to get up and running:

```bash
$ git clone https://github.com/davezuko/react-redux-starter-kit.git
$ cd react-redux-starter-kit
$ npm install                   # Install project dependencies
$ npm run dev                   # Compile and launch
```

Once the dev server starts successfully, navigate to http://localhost:3001 in your web browser and you should see a login page.  At this point you must start the server application and have it listening on port 3000 or provide an alternate mock backend.  You should then be able to sign in using one of the sample user accounts. Once authenticated, the client app will fetch settings for the available sites (tenants) which provides all of the information needed to drive the UI.

While developing, you will probably rely mostly on `npm run dev`; however, there are additional scripts at your disposal:

|`npm run <script>`|Description|
|------------------|-----------|
|`start`|Serves your app at `localhost:3000`. HMR will be enabled in development.|
|`compile`|Compiles the application to disk (`~/dist` by default).|
|`dev`|Same as `npm start`, but enables nodemon for the server as well.|
|`dev:no-debug`|Same as `npm run dev` but disables devtool instrumentation.|
|`test`|Runs unit tests with Karma and generates a coverage report.|
|`test:dev`|Runs Karma and watches for changes to re-run tests; does not generate coverage reports.|
|`deploy`|Runs linter, tests, and then, on success, compiles your application to disk.|
|`deploy:dev`|Same as `deploy` but overrides `NODE_ENV` to "development".|
|`deploy:prod`|Same as `deploy` but overrides `NODE_ENV` to "production".|
|`i18n:extract`|Extract translateable messages from code|
|`i18n:update`|Extract translateable messages and update library|
|`lint`|Lint all `.js` files.|
|`lint:watch`|Lint all `.js` files and watch for changes.|
|`lint:fix`|Lint and fix all `.js` files. [Read more on this](http://eslint.org/docs/user-guide/command-line-interface.html#fix).|

## Application Structure

The application structure presented in this boilerplate is **fractal**, where functionality is grouped primarily by feature rather than file type. Please note, however, that this structure is only meant to serve as a guide, it is by no means prescriptive. That said, it aims to represent generally accepted guidelines and patterns for building scalable applications. If you wish to read more about this pattern, please check out this [awesome writeup](https://github.com/davezuko/react-redux-starter-kit/wiki/Fractal-Project-Structure) by [Justin Greenberg](https://github.com/justingreenberg).

```
.
├── bin                      # Build/Start scripts
├── blueprints               # Blueprint files for redux-cli
├── build                    # All build-related configuration
│   └── webpack              # Environment-specific configuration files for webpack
├── config                   # Project configuration settings
├── server                   # Koa application (uses webpack middleware)
│   └── main.js              # Server application entry point
├── src                      # Application source code
│   ├── main.js              # Application bootstrap and rendering
│   ├── components           # Reusable Presentational Components
│   ├── containers           # Reusable Container Components
|   ├── forms                # Reusable form components
│   ├── layouts              # Components that dictate major page structure
│   ├── modules              # redux actions, actions creators, and reducers
│   ├── static               # Static assets (not imported anywhere in source code)
│   ├── styles               # Application-wide styles (generally settings)
│   ├── store                # Redux-specific pieces
│   │   ├── createStore.js   # Create and instrument redux store
│   │   └── reducers.js      # Reducer registry and injection
│   │── translations         # Translation files for each registered locale
│   └── routes               # Main route definitions and async split points
│       ├── index.js         # Bootstrap main application routes with store
│       ├── Root.js          # Wrapper component for context-aware providers
│       └── Home             # Fractal route
│           ├── index.js     # Route definitions and async split points
│           ├── assets       # Assets required to render components
│           ├── components   # Presentational React Components
│           ├── container    # Connect components to actions and store
│           ├── modules      # Collections of reducers/constants/actions
│           └── routes **    # Fractal sub-routes (** optional)
└── tests                    # Unit tests
```

## Development

### Language Translation

When you install this kit, it comes with English, Spanish, and Chinese locales already installed.  All of the existing React components that have UI text to translate have been configured to use React-intl, and their text has already been extracted, translated, and packaged for use by the app at runtime.  Translations are maintained with the source code.

If you want to edit an existing translation:

1. Find the appropriate translation file in src/translations for your locale.  If you want to change a Chinese translation, then use src/translations/zh.json.  
2. Give this translation file to a translator along with translations/defaultMessages.json.  defaultMessages.json contain the original untranslated text strings along with a description providing context to perform the translation.
3. Once the translations have beed added, simply replace the existing zh.json file in the codebase.
4. Restart the dev server or recompile for production and the new translations should be picked up or appropriate warning/errors should be provided.

If you want to add a new language locale:

1. Add a new locale to `src/main.js` for react-intl and also to `bin/manage-translations.js` for react-intl-translations-manager
2. Run `npm run i18n:update`.  This will generate a new json file for your new locale in src/translations.
3. Give this translation file to a translator along with translations/defaultMessages.json.  defaultMessages.json contain the original untranslated text strings along with a description providing context to perform the translation.
4. Once the translations have beed added, simply replace the existing zh.json file in the codebase.
5. Edit src/translations/index.js, adding your new translation file import and mapping it to one or more locale strings.  Note that some browsers use different locale strings, for example Chrome may use 'en' or 'en-US' while Safari will use 'en-us'.  Map as many locales as needed to your translation file.
6. Restart the dev server or recompile for production and the new translations should be picked up or appropriate warning/errors should be provided.

If you want to add new translations for existing locales:

1. First, make sure your new text strings and the React components that contain them have been setup properly (see next section)
2. Run `npm run i18n:update`.  This will add an entry for each new text string to the existing translations for each locale in src/translations.  The original text string will be provided by default.
  * Now follow the steps above for editing an existing translation

### Translation Architecture

If you are developing new React components or changing existing ones then you will need to understand how the different pieces work together to extract, update, store, and perform translations.  This includes React-intl, Babel, and React-intl-translations-manager. The basic workflow is as follows using the login form as an example.

* Initially, you will have text string literals in your React components, probably mostly in your render method.
* These text string literals are replaced by calls to `formatMessage` and the text strings are moved to the top of the component in a standardized message structure..  See forms/LoginForm/LoginForm.js for an example.
  * formatMessage is passed as a prop provided by React-intl which translates the text string based on the current locale.
  * formatMessage and the current locale are passed into the component as props by React-intl.
  * React-intl is connected to the LoginForm via the LoginContainer using the injectIntl method (src/forms/LoginForm/LoginContainer.js)
* When you run `npm run i18n:update` Babel reads through all of your React components in the src/ folder, and any other es6 classes, and extracts the messages into src/_translations.
  * This destination is configured in .babelrc).
* i18n-update then runs react-intl-translations-manager which does multiple things:
  * compiles all of the translations from src/_translations into a single master message file at src/translations/defaultMessages.json.  File is updated if it already exists.
  * adds translation files for each locale to src/translations ready to be translated.  For example es.json for Spanish.  If these translation files already exist then they are updated, preserving the old translation.  The manager even tells you about all of the new translations needed, or old ones that have been removed.
* The translations for all of the locales are bundled into a single module in src/translations/index.js
  * It is here that locale strings, as specificed by the client web browser are mapped to a specific translation file.
  * If a browser uses a locale that is not translated, then the default messages are used automatically, in this case English.
  * There are times when you will want to have multiple locales all map to the same generic translation.  For example, in our case both 'zh' and 'zh-CN' are made to point to the zh.json translation file as they simplified Mandarin is valid in both cases.
  * There are also cases where different browsers provide slightly different casing for locale strings.  For example the Chrome browser uses 'en-US' while Safari uses 'en-us'.  Mapping are provided for both here.
* The translation index.js is loaded by src/containers/AppContainer and given to the React-intl provider, which performs the translation when formatMessage is called.
  * The current locale is also provided to the React-intl provider as a property which comes from the global redux state via src/modules/locale.js.  It's in this file where the initial locale state is set by reading the browsers language list.  It also provides a localeChange action creator which components such as the sidebar use to trigger locale changes. 
  * When a localeChange is triggered, each of the React components update themselves, using their locale property which comes from the redux state, to call formatMessage and receive the new translated message.

#### Developer Tools

**We recommend using the [Redux DevTools Chrome Extension](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd).**
Using the chrome extension allows your monitors to run on a separate thread and affords better performance and functionality. It comes with several of the most popular monitors, is easy to configure, filters actions, and doesn’t require installing any packages.

However, adding the DevTools components to your project is simple. First, grab the packages from npm:

```bash
npm i --save-dev redux-devtools redux-devtools-log-monitor redux-devtools-dock-monitor
```

Then follow the [manual integration walkthrough](https://github.com/gaearon/redux-devtools/blob/master/docs/Walkthrough.md).

### Routing
We use `react-router` [route definitions](https://github.com/reactjs/react-router/blob/master/docs/API.md#plainroute) (`<route>/index.js`) to define units of logic within our application. See the [application structure](#application-structure) section for more information.

## Testing
To add a unit test, simply create a `.spec.js` file anywhere in `~/tests`. Karma will pick up on these files automatically, and Mocha and Chai will be available within your test without the need to import them. If you are using `redux-cli`, test files should automatically be generated when you create a component or redux module.

Coverage reports will be compiled to `~/coverage` by default. If you wish to change what reporters are used and where reports are compiled, you can do so by modifying `coverage_reporters` in `~/config/index.js`.

## Deployment
Out of the box, this starter kit is deployable by serving the `~/dist` folder generated by `npm run deploy` (make sure to specify your target `NODE_ENV` as well). This project does not concern itself with the details of server-side rendering or API structure, since that demands an opinionated structure that makes it difficult to extend the starter kit. However, if you do need help with more advanced deployment strategies, here are a few tips:

### Static Deployments
If you are serving the application via a web server such as nginx, make sure to direct incoming routes to the root `~/dist/index.html` file and let react-router take care of the rest. The Koa server that comes with this client kit is only used for development purposes, see Server section below. 

### Heroku
More details to come, but in the meantime check out [this helpful comment](https://github.com/davezuko/react-redux-starter-kit/issues/730#issuecomment-213997120) by [DonHansDampf](https://github.com/DonHansDampf) addressing Heroku deployments.

## Build System

### Configuration

Default project configuration can be found in `~/config/index.js`. Here you'll be able to redefine your `src` and `dist` directories, adjust compilation settings, tweak your vendor dependencies, and more. For the most part, you should be able to make changes in here **without ever having to touch the actual webpack build configuration**.

If you need environment-specific overrides (useful for dynamically setting API endpoints, for example), you can edit `~/config/environments.js` and define overrides on a per-NODE_ENV basis. There are examples for both `development` and `production`, so use those as guidelines. Here are some common configuration options:

|Key|Description|
|---|-----------|
|`dir_src`|application source code base path|
|`dir_dist`|path to build compiled application to|
|`server_host`|hostname for the Koa server|
|`server_port`|port for the Koa server|
|`compiler_css_modules`|whether or not to enable CSS modules|
|`compiler_devtool`|what type of source-maps to generate (set to `false`/`null` to disable)|
|`compiler_vendor`|packages to separate into to the vendor bundle|


### Root Resolve
Webpack is configured to make use of [resolve.root](http://webpack.github.io/docs/configuration.html#resolve-root), which lets you import local packages as if you were traversing from the root of your `~/src` directory. Here's an example:

```js
// current file: ~/src/views/some/nested/View.js
// What used to be this:
import SomeComponent from '../../../components/SomeComponent'

// Can now be this:
import SomeComponent from 'components/SomeComponent' // Hooray!
```

### Globals

These are global variables available to you anywhere in your source code. If you wish to modify them, they can be found as the `globals` key in `~/config/index.js`. When adding new globals, make sure you also add them to `~/.eslintrc`.

|Variable|Description|
|---|---|
|`process.env.NODE_ENV`|the active `NODE_ENV` when the build started|
|`__DEV__`|True when `process.env.NODE_ENV` is `development`|
|`__PROD__`|True when `process.env.NODE_ENV` is `production`|
|`__TEST__`|True when `process.env.NODE_ENV` is `test`|
|`__DEBUG__`|True when `process.env.NODE_ENV` is `development` and cli arg `--no_debug` is not set (`npm run dev:no-debug`)|
|`__BASENAME__`|[history basename option](https://github.com/rackt/history/blob/master/docs/BasenameSupport.md)|

### Styles

Both `.scss` and `.css` file extensions are supported out of the box and are configured to use [CSS Modules](https://github.com/css-modules/css-modules). After being imported, styles will be processed with [PostCSS](https://github.com/postcss/postcss) for minification and autoprefixing, and will be extracted to a `.css` file during production builds.

### Server

This starter kit comes packaged with an Koa server. It's important to note that the sole purpose of this server is to provide `webpack-dev-middleware` and `webpack-hot-middleware` for hot module replacement and to proxy server requests during development. Using a custom Koa app in place of [webpack-dev-server](https://github.com/webpack/webpack-dev-server) makes it easier to extend the starter kit to include functionality such as API's, universal rendering, and more -- all without bloating the base boilerplate.

When NODE_ENV is set to development, Koa proxies all requests to /api to port 3000 where the application dev server is expected to be listening.  This allows for a simple functional backend while developing.  In production this proxy is not in place and should be done using a web server such as nginx.

### Production Optimization

Babel is configured to use [babel-plugin-transform-runtime](https://www.npmjs.com/package/babel-plugin-transform-runtime) so transforms aren't inlined. Additionally, in production, we use [react-optimize](https://github.com/thejameskyle/babel-react-optimize) to further optimize your React code.

In production, webpack will extract styles to a `.css` file, minify your JavaScript, and perform additional optimizations such as module deduplication.

## Learning Resources

* [Starting out with react-redux-starter-kit](https://suspicious.website/2016/04/29/starting-out-with-react-redux-starter-kit/) is an introduction to the components used in this starter kit with a small example in the end.

* [react-redux-jwt-auth-example](https://github.com/joshgeller/react-redux-jwt-auth-example) into to JSON Web Token auth + route access control

* [Mapbox GL JS webpack support](https://github.com/mapbox/mapbox-gl-js/blob/master/webpack.config.example.js)
