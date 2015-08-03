// These tests are teken from http-browserify to ensure compatibility with
// that module
var test = require('tape')

var parseUrl = require('url').parse
global.fetch = require('node-fetch')

var noop = function() {}

var moduleName = require.resolve('../../')
delete require.cache[moduleName]
var http = require('../../')

test('Test simple url string', function(t) {
  var url = {
    host: 'localhost:8081',
    path: '/api/foo'
  };

  var request = http.get(url, noop);

  t.equal( request._url, 'http://localhost:8081/api/foo', 'Url should be correct');
  t.end();

});


test('Test full url object', function(t) {
  var url = {
    host: "localhost:8081",
    hostname: "localhost",
    href: "http://localhost:8081/api/foo?bar=baz",
    method: "GET",
    path: "/api/foo?bar=baz",
    pathname: "/api/foo",
    port: "8081",
    protocol: "http:",
    query: "bar=baz",
    search: "?bar=baz",
    slashes: true
  };

  var request = http.get(url, noop);

  t.equal( request._url, 'http://localhost:8081/api/foo?bar=baz', 'Url should be correct');
  t.end();

});

test('Test alt protocol', function(t) {
  var params = {
    protocol: "foo:",
    hostname: "localhost",
    port: "3000",
    path: "/bar"
  };

  var request = http.get(params, noop);

  t.equal( request._url, 'foo://localhost:3000/bar', 'Url should be correct');
  t.end();

});
