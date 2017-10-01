# node-redis

> A simple redis application in node.js


## Running Locally

```bash
$ git clone https://github.com/Rjoydip/node-sms.git # or clone your own fork
$ cd node-sms
$ npm install
$ npm start
```

Your app should now be running on [localhost:3000](http://localhost:3000).

## Server API

### `app.get('/');`

Render index.html

### `app.post('/set');`
***body:*** `{ key: <KEY>, value: <VALUE> }`

Set key,value in redis.

#### `Response:`

* 200: Success. Payload: `{ status: "OK"}` -> If data set success fully.
* 422: Error. Payload: `"{ err": {"status": 404} }` -> If something went wrong.

***Note***
If redis-server shut-down then all stored value will be losed.