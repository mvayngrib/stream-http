# react-native-http

The
[http](http://nodejs.org/docs/v0.4.10/api/all.html#hTTP) module from node.js,
but for React Native.

When you `require('http')` in
[react-native](http://github.com/facebook/react-native),
this module will be loaded.

_adapted from John Hiesey's [stream-http](https://github.com/jhiesey/stream-http), thanks John!_

# example

```js
var http = require('http')

http.get({ path : '/beep' }, function (res) {
    var div = document.getElementById('result')
    div.innerHTML += 'GET /beep<br>'

    res.on('data', function (buf) {
        div.innerHTML += buf
    })

    res.on('end', function () {
        div.innerHTML += '<br>__END__'
    })
})
```

# http methods

var http = require('http');

## var req = http.request(opts, cb)

where `opts` are:

* `opts.method='GET'` - http method verb
* `opts.path` - path string, example: `'/foo/bar?baz=555'`
* `opts.headers={}` - as an object mapping key names to string or Array values
* `opts.host=window.location.host` - http host
* `opts.port=window.location.port` - http port
* `opts.responseType` - response type to set on the underlying xhr object

The callback will be called with the response object.

## var req = http.get(options, cb)

A shortcut for

``` js
options.method = 'GET';
var req = http.request(options, cb);
req.end();
```

# request methods

## req.setHeader(key, value)

Set an http header.

## req.getHeader(key)

Get an http header.

## req.removeHeader(key)

Remove an http header.

## req.write(data)

Write some data to the request body.

If only 1 piece of data is written, `data` can be a FormData, Blob, or
ArrayBuffer instance. Otherwise, `data` should be a string or a buffer.

## req.end(data)

Close and send the request body, optionally with additional `data` to append.

# response methods

## res.getHeader(key)

Return an http header, if set. `key` is case-insensitive.

# response attributes

* res.statusCode, the numeric http response code
* res.headers, an object with all lowercase keys

# install

With [npm](https://npmjs.org) do:

```
npm install react-native-http
```

# license

MIT
