## 00 Boilerplate

In this sample we are going to create an app with `Login` component that navigate to other page. We are going to use [`lc-form-validation`](https://github.com/Lemoncode/lcFormValidation) to add validations to login form.

Summary steps:

- Install `dependencies`.
- Install `dev dependencies`.
- Add `Procfile` and `.env` files.
- Configure `webpack.config`.
- Configure `karma`.
- Add `npm scripts`.

# Steps to build it


## Prerequisites

- Install [Node.js and npm](https://nodejs.org/en/) (v6.x or higher) if they are not already installed on your computer.

# Steps

- Run this command to install all `production` necessary dependencies:

```bash
npm i babel-polyfill bootstrap lc-form-validation material-ui react react-dom react-router-dom whatwg-fetch -P

```

- Run this command to install all `development` necessary dependencies:

```bash
npm i @types/chai @types/enzyme @types/karma-chai-sinon @types/material-ui @types/mocha @types/react @types/react-dom @types/react-router-dom @types/sinon@1 awesome-typescript-loader babel-core babel-preset-env chai cross-env css-loader enzyme extract-text-webpack-plugin file-loader foreman html-webpack-plugin if-env istanbul-instrumenter-loader karma karma-chai karma-chrome-launcher karma-coverage karma-coverage-istanbul-reporter karma-mocha karma-mocha-reporter karma-sinon-chai karma-sourcemap-loader karma-webpack mocha node-sass react-addons-test-utils react-hot-loader react-test-renderer rimraf sass-loader sinon@1 sinon-chai style-loader tslint tslint-loader tslint-no-unused-expression-chai tslint-react typescript url-loader webpack webpack-dev-server webpack-merge -D

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
      'lc-form-validation',
      'material-ui',
      'react',
      'react-dom',
      'react-router-dom',
      'whatwg-fetch',
    ],
    appStyles: [
      './content/styles/styles.scss',
    ],
    vendorStyles: [
      '../node_modules/bootstrap/dist/css/bootstrap.css',
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
    new webpack.DefinePlugin({
      'process.env.BASE_API_URL': JSON.stringify(process.env.BASE_API_URL),
    }),
  ],
});

```

# About Lemoncode

We are a team of long-term experienced freelance developers, established as a group in 2010.
We specialize in Front End technologies and .NET. [Click here](http://lemoncode.net/services/en/#en-home) to get more info about us. 
