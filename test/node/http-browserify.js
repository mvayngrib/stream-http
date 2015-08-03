// These tests are teken from http-browserify to ensure compatibility with
// that module
var test = require('tape')

var parseUrl = require('url').parse
global.fetch = require('node-fetch')
// window.location = {
// 		hostname: 'localhost',
// 		port: 8081,
// 		protocol: 'http:'
// }

var noop = function() {}
// window.XMLHttpRequest = function() {
// 	this.open = noop
// 	this.send = noop
// 	this.withCredentials = false
// }

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

test('Test withCredentials param', function(t) {
  var url = 'http://localhost/api/foo'
  var parsed = parseUrl('http://localhost/api/foo');
  parsed.withCredentials = false

  var request = http.request(parsed, noop);
  t.equal( request.xhr.withCredentials, false, 'xhr.withCredentials should be false');

  parsed.withCredentials = true
  var request = http.request(parsed, noop);
  t.equal( request.xhr.withCredentials, true, 'xhr.withCredentials should be true');

  var request = http.request(url, noop);
  t.equal( request.xhr.withCredentials, true, 'xhr.withCredentials should be true');

  t.end();
});

test('Test POST XHR2 types', function(t) {
  t.plan(3);
  var url = 'http://localhost/api/foo';
  var parsed = parseUrl(url)
  parsed.method = 'POST'

  var request = http.request(url, noop);
  request.xhr.send = function (data) {
    t.ok(data instanceof global.ArrayBuffer, 'data should be instanceof ArrayBuffer');
  };

  request.end(new global.ArrayBuffer());

  request = http.request(parsed, noop);
  request.xhr.send = function (data) {
    t.ok(data instanceof global.Blob, 'data should be instanceof Blob');
  };
  request.end(new global.Blob());

  request = http.request(parsed, noop);
  request.xhr.send = function (data) {
    t.ok(data instanceof global.FormData, 'data should be instanceof FormData');
  };
  request.end(new global.FormData());
});
