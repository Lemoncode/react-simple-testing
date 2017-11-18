require('babel-polyfill');

const testsContext = require.context('../../src', true, /.spec$/);
testsContext.keys().forEach(testsContext);

const componentsContext = require.context('../../src', true, /.ts$/);
componentsContext.keys().forEach(componentsContext);
