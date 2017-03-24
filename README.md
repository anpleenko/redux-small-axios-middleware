# redux-small-axios-middleware

### Redux middleware for async request with axios

[![NPM](https://nodei.co/npm-dl/redux-small-axios-middleware.png?months=1)](https://nodei.co/npm/redux-small-axios-middleware/)

[![Build Status](https://travis-ci.org/vaeum/redux-small-axios-middleware.svg?branch=master)](https://travis-ci.org/vaeum/redux-small-axios-middleware)
[![NPM version][npm-image]][npm-url]
[![Downloads][downloads-image]][npm-url]

### install

```bash
npm i -S redux-small-axios-middleware
```

### Usage

in createStore.js

```javascript
import axios from 'axios';
import reduxSmallAxiosMiddleware from 'redux-small-axios-middleware';

let store = createStore(
  reducers, //custom reducers
  applyMiddleware(
    //all middlewares
    ...
    reduxSmallAxiosMiddleware(axios),
    ...
  )
)
```

in anyAction.js

```javascript
export someActions = () => {
    return {
        type: 'GET_DATA_TEST', //require
        onSuccessCallback: function(){
            console.log("success")
        },
        onErrorCallback: function(){
            console.log("error")
        },
        options: { //
            url: '<your URL>', //require
        },
    }
}
```

Options object is axios [request config](https://github.com/mzabriskie/axios#request-config)

in dispaching.js

```javascript
import { someActions } from '../anyAction.js'

//...


dispatch(someActions());
```

[downloads-image]: https://img.shields.io/npm/dm/redux-small-axios-middleware.svg
[npm-url]: https://www.npmjs.com/package/redux-small-axios-middleware
[npm-image]: https://img.shields.io/npm/v/redux-small-axios-middleware.svg
