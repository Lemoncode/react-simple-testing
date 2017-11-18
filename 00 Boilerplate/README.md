## 00 Boilerplate

In this sample we are going to create basic project structure with all configuration for TypeScript, Webpack, Karma, Tslint, React-hot-loader, etc.

Summary steps:

- Install `dependencies`.
- Install `dev dependencies`.
- Add `Procfile` and `.env` files.
- Configure `webpack.config`.
- Configure `karma`.
- Add `tsconfig.json` and `.babelrc`.
- Add `npm scripts`.
- Add `.editorconfig` and `tslint.json`.
- Add `index.html`.
- Add `app.tsx` and `index.tsx` with `react-hot-loader` config.
- Add empty `content/styles.scss`.

# Steps to build it


## Prerequisites

- Install [Node.js and npm](https://nodejs.org/en/) (v6.x or higher) if they are not already installed on your computer.

# Steps

- Run this command to install all `production` necessary dependencies:

```bash
npm i babel-polyfill bootstrap jquery lc-form-validation material-ui react react-dom react-hot-loader react-router-dom toastr whatwg-fetch -P

```

- Run this command to install all `development` necessary dependencies:

```bash
npm i @types/chai @types/deep-freeze @types/enzyme @types/karma-chai-sinon @types/material-ui @types/mocha @types/node @types/react @types/react-dom @types/react-router-dom @types/sinon@1 @types/toastr @types/webpack-env awesome-typescript-loader babel-core babel-preset-env chai cross-env css-loader deep-freeze enzyme extract-text-webpack-plugin file-loader foreman html-webpack-plugin if-env istanbul-instrumenter-loader karma karma-chai karma-chrome-launcher karma-coverage karma-coverage-istanbul-reporter karma-mocha karma-mocha-reporter karma-sinon-chai karma-sourcemap-loader karma-webpack mocha node-sass react-addons-test-utils react-test-renderer rimraf sass-loader sinon@1 sinon-chai style-loader tslint tslint-loader tslint-no-unused-expression-chai tslint-react typescript url-loader webpack webpack-dev-server webpack-merge -D

```

- Add `Procfile` to run app using `.env` file where we could declare `environment variables`:

### ./Procfile

```
web: if-env NODE_ENV=production && npm run start:prod || npm run start:dev

```

### ./.env

```
REST_ENV=mock
BASE_API_URL=mock/api

```

- Configure `webpack.config` for `production`, `development` and `test`.

- Helper files with `resolveFromRootPath` method:

### ./config/helpers.js

```javascript
const path = require('path');

const rootPath = path.resolve(__dirname, '..');

exports.resolveFromRootPath = (...args) => path.join(rootPath, ...args);

```

- Webpack config common to `app` and `test`:

### ./config/webpack/common.js

```javascript
const webpack = require('webpack');
const { CheckerPlugin } = require('awesome-typescript-loader');
const helpers = require('../helpers');

module.exports = {
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    alias: {
      'globalStyles': helpers.resolveFromRootPath("src/content/styles"),
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        enforce: 'pre',
        loader: 'tslint-loader',
      },
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff',
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/octet-stream',
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=image/svg+xml',
      },
      {
        test: /\.(png|jpg|ico)?$/,
        loader: 'url-loader?limit=10000&mimetype=image/png',
      },
    ]
  },

  plugins: [
    new CheckerPlugin(),
  ],
}

```

- Base `app` config:

### ./config/webpack/app/base.js

```javascript
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('../common');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const helpers = require('../../helpers');

module.exports = merge(common, {
  context: helpers.resolveFromRootPath('src'),
  entry: {
    app: [
      './index.tsx',
    ],
    vendor: [
      'babel-polyfill',
      'jquery',
      'lc-form-validation',
      'material-ui',
      'react',
      'react-dom',
      'react-hot-loader',
      'react-router-dom',
      'toastr',
      'whatwg-fetch',
    ],
    appStyles: [
      './content/styles/styles.scss',
    ],
    vendorStyles: [
      '../node_modules/bootstrap/dist/css/bootstrap.css',
      '../node_modules/toastr/build/toastr.css',
    ],
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'awesome-typescript-loader',
        options: {
          useBabel: true,
          useCache: true,
        },
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: {
            loader: 'css-loader',
          },
        }),
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                camelCase: true,
                localIdentName: '[name]__[local]___[hash:base64:5]',
              },
            },
            { loader: 'sass-loader' },
          ],
        }),
      },
    ],
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest']
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      hash: true,
      chunks: ['manifest', 'vendor', 'vendorStyles', 'appStyles', 'app'],
      chunksSortMode: 'manual',
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        'REST_ENV': JSON.stringify(process.env.REST_ENV),
        'BASE_API_URL': JSON.stringify(process.env.BASE_API_URL),
      },
    }),
  ]
});

```

- Development configuration:

### ./config/webpack/app/dev.js

```javascript
const webpack = require('webpack');
const merge = require('webpack-merge');
const base = require('./base');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const helpers = require('../../helpers');

const hotReloadingEntries = [
  'react-hot-loader/patch',
];

module.exports = merge.strategy({
  entry: 'prepend',
})(base, {
  devtool: 'inline-source-map',
  entry: {
    app: hotReloadingEntries,
    appStyles: hotReloadingEntries,
  },
  output: {
    path: helpers.resolveFromRootPath('dist'),
    filename: '[name].js',
  },
  devServer: {
    contentBase: helpers.resolveFromRootPath('dist'),
    inline: true,
    host: 'localhost',
    port: 8080,
    stats: 'errors-only',
    hot: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new ExtractTextPlugin({
      disable: true,
    }),
  ],
});

```

- Production configuration:

### ./config/webpack/app/prod.js

```javascript
const webpack = require('webpack');
const merge = require('webpack-merge');
const base = require('./base');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const helpers = require('../../helpers');

module.exports = merge(base, {
  output: {
    path: helpers.resolveFromRootPath('dist'),
    filename: '[chunkhash].[name].js',
  },
  plugins: [
    new webpack.HashedModuleIdsPlugin(),
    new ExtractTextPlugin({
      filename: '[chunkhash].[name].css',
      disable: false,
      allChunks: true,
    }),
  ],
});

```

- Base `test` webpack config:

### ./config/webpack/test/base.js

```javascript
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('../common');
const helpers = require('../../helpers');

module.exports = merge(common, {
  devtool: 'inline-source-map',
  resolve: {
    alias: {
      sinon: 'sinon/pkg/sinon',
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        include: /node_modules/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
        ],
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              camelCase: true,
              localIdentName: '[local]',
            },
          },
          { loader: 'sass-loader' },
        ],
      },
    ],
    noParse: [
      /node_modules(\\|\/)sinon/,
    ],
  },
  externals: {
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': 'window',
  },
});

```

- Webpack config for `test`:

### ./config/webpack/test/test.js

```javascript
const base = require('./base');
const merge = require('webpack-merge');
const helpers = require('../../helpers');

module.exports = merge(base, {
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'awesome-typescript-loader',
        options: {
          useBabel: true,
          useCache: true,
          configFileName: helpers.resolveFromRootPath('config', 'karma', 'karma.tsconfig.json'),
        },
      },
    ]
  }
});

```

- Webpack config for `coverage`:

### ./config/webpack/test/coverage.js

```javascript
const base = require('./base');
const merge = require('webpack-merge');
const helpers = require('../../helpers');

module.exports = merge(base, {
  module: {
    rules: [
      {
        // Transpile all spec files
        test: /\.spec\.tsx?$/,
        exclude: /node_modules/,
        loader: 'awesome-typescript-loader',
        options: {
          configFileName: helpers.resolveFromRootPath('config', 'karma', 'karma.tsconfig.json'),
          useBabel: true,
          useCache: true,
        },
      },
      {
        test: /((?!spec).)*.tsx?$/,
        exclude: /(node_modules|spec)/,
        enforce: 'post',
        use: [
          {
            loader: 'istanbul-instrumenter-loader',
            options: {
              // Handle ES6 modules
              esModules: true,
            },
          },
          {
            loader: 'awesome-typescript-loader',
            options: {
              configFileName: helpers.resolveFromRootPath('config', 'karma', 'karma.tsconfig.json'),
              useBabel: true,
              useCache: true,
            },
          },
        ],
      },
    ]
  }
});

```

- Configure `karma`:

### ./config/karma/spec.bundle.js

```javascript
require('babel-polyfill');

const testsContext = require.context('../../src', true, /.spec$/);
testsContext.keys().forEach(testsContext);

const componentsContext = require.context('../../src', true, /.ts$/);
componentsContext.keys().forEach(componentsContext);

```

### ./config/karma/karma.tsconfig.json

```javascript
{
  "compilerOptions": {
    "target": "es6",
    "module": "commonjs",
    "moduleResolution": "node",
    "declaration": false,
    "noImplicitAny": false,
    "sourceMap": false,
    "inlineSourceMap": true,
    "jsx": "react",
    "noLib": false,
    "suppressImplicitAnyIndexErrors": true,
    "types": [
      "karma-chai-sinon",
      "webpack-env",
      "mocha",
      "node"
    ],
    "typeRoots": [
      "../../node_modules/@types"
    ]
  },
  "compileOnSave": false,
  "exclude": [
    "node_modules"
  ]
}

```

### ./config/karma/base.js

```javascript
module.exports = {
  basePath: '',
  frameworks: ['mocha', 'sinon-chai'],
  files: [    
    './spec.bundle.js',
  ],
  webpackMiddleware: {
    noInfo: true,
  },
  reporters: ['mocha'],
  mochaReporter: {
    showDiff: false,
  },
  port: 9876,
  colors: true,
  autoWatch: true,
  browsers: ['Chrome'],
  singleRun: false,
  concurrency: Infinity,
};

```

### ./config/karma/test.js

```javascript
const base = require('./base');
const webpackConfig = require('../webpack/test/test');

module.exports = (config) => {
  const karmaConfig = Object.assign({}, base, {
    preprocessors: {
      './spec.bundle.js': ['webpack', 'sourcemap'],
    },
    webpack: webpackConfig,
    logLevel: config.LOG_INFO,
  });

  if (process.env.TRAVIS) {
    karmaConfig.customLaunchers = {
      Chrome_travis_ci: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    };
    karmaConfig.browsers = ['Chrome_travis_ci'];
  }

  config.set(karmaConfig);
};

```

### ./config/karma/coverage.js

```javascript
const base = require('./base');
const webpackConfig = require('../webpack/test/coverage');
const helpers = require('../helpers');

module.exports = (config) => {
  const karmaConfig = Object.assign({}, base, {
    preprocessors: {
      './spec.bundle.js': 'webpack',
    },
    webpack: webpackConfig,
    logLevel: config.LOG_DISABLE,
    reporters: [...base.reporters, 'coverage-istanbul'],
    coverageIstanbulReporter: {
      dir: helpers.resolveFromRootPath('test', 'coverage'),
      reports: ['html', 'text'],
      fixWebpackSourcePaths: true,
    },
  });

  config.set(karmaConfig);
};

```

- Add `tsconfig.json` and `.babelrc`:

### ./tsconfig.json

```json
{
  "compilerOptions": {
    "target": "es6",
    "module": "es6",
    "moduleResolution": "node",
    "declaration": false,
    "noImplicitAny": false,
    "sourceMap": true,
    "jsx": "react",
    "noLib": false,
    "allowJs": true,
    "suppressImplicitAnyIndexErrors": true
  },
  "compileOnSave": true,
  "exclude": [
    "node_modules"
  ]
}

```

### ./.babelrc

```json
{
  "presets": [
    [
      "env",
      {
        "modules": false
      }
    ]
  ],
  "plugins": [
    "react-hot-loader/babel"
  ]
}

```

- Add `npm scripts`:

### ./pagacke.json

```diff
...
  "scripts": {
-   "test": "echo \"Error: no test specified\" && exit 1"
+   "start": "nf start",
+   "start:dev": "webpack-dev-server --config ./config/webpack/app/dev.js",
+   "start:prod": "cross-env REST_ENV=real NODE_ENV=production webpack-dev-server --config ./config/webpack/app/prod.js",
+   "build": "npm run build:dev",
+   "build:dev": "rimraf dist && webpack --config ./config/webpack/app/dev.js",
+   "build:prod": "rimraf dist && cross-env REST_ENV=real NODE_ENV=production webpack -p --config ./config/webpack/app/prod.js",
+   "test": "karma start ./config/karma/test.js --single-run --browsers ChromeHeadless",
+   "test:watch": "karma start ./config/karma/test.js",
+   "test:coverage": "karma start ./config/karma/coverage.js --single-run --browsers ChromeHeadless"
  },
...
```

- Add `.editorconfig` and `tslint.json`.

### ./.editorconfig

```
root = true

[*]
indent_size = 2
indent_style = space
insert_final_newline = true
end_of_line = crlf
charset = utf-8
trim_trailing_whitespace = true

```

### ./tslint.json

```json
{
  "extends": [
    "tslint:latest",
    "tslint-react",
    "tslint-no-unused-expression-chai"
  ],
  "rules": {
    "jsx-alignment": true,
    "jsx-self-close": true,
    "class-name": true,
    "interface-name": false,
    "object-literal-sort-keys": false,
    "ordered-imports": [
      false
    ],
    "comment-format": [
      true,
      "check-space"
    ],
    "indent": [
      true,
      "spaces"
    ],
    "no-eval": true,
    "no-internal-module": true,
    "no-trailing-whitespace": true,
    "no-unsafe-finally": true,
    "no-var-keyword": true,
    "only-arrow-functions": [
      false
    ],
    "one-line": [
      true,
      "check-open-brace",
      "check-whitespace"
    ],
    "quotemark": [
      true,
      "single",
      "jsx-double"
    ],
    "semicolon": [
      true,
      "always"
    ],
    "triple-equals": [
      true,
      "allow-null-check"
    ],
    "typedef-whitespace": [
      true,
      {
        "call-signature": "nospace",
        "index-signature": "nospace",
        "parameter": "nospace",
        "property-declaration": "nospace",
        "variable-declaration": "nospace"
      }
    ],
    "variable-name": [
      true,
      "ban-keywords"
    ],
    "whitespace": [
      true,
      "check-branch",
      "check-decl",
      "check-operator",
      "check-separator",
      "check-type"
    ],
    "jsx-no-multiline-js": false,
    "jsx-wrap-multiline": false,
    "no-var-requires": false,
    "no-empty": false,
    "member-ordering": false,
    "member-access": false,
    "no-submodule-imports": false,
    "no-implicit-dependencies": false,
    "no-this-assignment": false,
    "object-literal-shorthand": false,
    "no-object-literal-type-assertion": false
  }
}

```

- Add `index.html`:

### ./src/index.html

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
    <meta http-equiv="cache-control" content="max-age=0" />
    <meta http-equiv="cache-control" content="no-cache" />
    <meta http-equiv="expires" content="0" />
    <meta http-equiv="expires" content="Tue, 01 Jan 1980 1:00:00 GMT" />
    <meta http-equiv="pragma" content="no-cache" />
    <title>App</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>

```

- Add `app.tsx` and `index.tsx` with `react-hot-loader` config:

### ./src/app.tsx

```javascript
import * as React from 'react';

export const App: React.StatelessComponent = (props) => (
  <h1>Hello React</h1>
);

```

### ./src/index.tsx

```javascript
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { App } from './app';

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('root'),
  );
};

render(App);

if (module.hot) {
  module.hot.accept('./app', () => {
    render(App);
  });
}

```

- Add empty global styles `styles.scss`:

### ./src/content/styles/styles.scss

```scss

```

# About Lemoncode

We are a team of long-term experienced freelance developers, established as a group in 2010.
We specialize in Front End technologies and .NET. [Click here](http://lemoncode.net/services/en/#en-home) to get more info about us. 
