const reduxSmallAxiosMiddleware = (axios) => {
  return ({ getState, dispatch }) => next => action => {
    if (!(action.options && action.options.url)) {
      return next(action);
    }

    const requestType = `${action.type}_REQUEST`;
    const responseType = `${action.type}_SUCCESS`;
    const failureType = `${action.type}_FAILURE`;

    const {
      options = {},
      onSuccessCallback = () => {},
      onErrorCallback = () => {},
    } = action;

    next(action);

    next({
      loading: true,
      error: false,
      type: requestType,
    });

    axios.request(options)
      .then((response) => {
        next({
          loading: false,
          error: false,
          type: responseType,
          payload: response.data,
        });

        onSuccessCallback();
      })

      .catch((error) => {
        next({
          loading: false,
          error: true,
          type: failureType,
          stack: error,
          status: error.response.status,
        });

        onErrorCallback();
      });
  };
};

export default (axios) => {
  return reduxSmallAxiosMiddleware(axios);
};
