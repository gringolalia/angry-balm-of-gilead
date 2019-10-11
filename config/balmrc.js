const path = require('path');
const webpack = require('webpack');
const helpers = require('./helpers');

// Documentation - http://balmjs.com/docs/en/configuration/toc.html
// 中文文档 - http://balmjs.com/docs/zh-cn/configuration/toc.html
module.exports = {
  server: {
    open: true,
    proxyContext: '/api',
    proxyOptions: {
      target: 'http://your.project.dev',
      changeOrigin: true
    }
  },
  roots: {
    source: 'app'
  },
  paths: {
    source: {
      css: 'styles',
      js: 'scripts'
    }
  },
  styles: {
    ext: 'css' // PostCSS
  },
  scripts: {
    entry: {
      polyfill: ['core-js', 'zone.js'],
      ng: ['@angular'],
      main: './app/scripts/main.ts' // Entry js file
    },
    loaders: [
      {
        test: /\.ts$/,
        use: ['ts-loader', 'angular2-template-loader']
      }
    ],
    alias: {
      '@': path.resolve(__dirname, '..', 'app', 'scripts')
    },
    plugins: [
      new webpack.ContextReplacementPlugin(
        // The (\\|\/) piece accounts for path separators in *nix and Windows
        /\@angular(\\|\/)core(\\|\/)/,
        helpers.root('app') // location of your src
      )
    ],
    stats: {
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false,
      warningsFilter: /System.import/
    }
  },
  cache: true,
  assets: {
    root: 'assets', // Replace 'assets' to your remote project root
    mainDir: 'public'
  }
  // More Config
};
