# redux-small-axios-middleware

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




