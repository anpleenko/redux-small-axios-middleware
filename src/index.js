const reduxSmallAxiosMiddleware = (axios, errorTrigger) => {
  return ({ getState, dispatch }) => next => action => {
    if (!(action.options && action.options.url)) {
      return next(action);
    }

    const requestType = `${action.type}_REQUEST`;
    const successType = `${action.type}_SUCCESS`;
    const failureType = `${action.type}_FAILURE`;

    const {
      options = {},
      onSuccessCallback = () => {},
      onErrorCallback = () => {},
      customSuccessAction = {},
    } = action;

    next(action);

    next({
      loading: true,
      error: false,
      type: requestType,
    });

    axios.request(options)
      .then((response) => {
        if (process.env.NODE_ENV !== 'production') {
          if (customSuccessAction.type) {
            console.error('Property type is reserved, it will be replaced');
          }

          if (customSuccessAction.loading) {
            console.error('Property loading type is reserved, it will be replaced');
          }

          if (customSuccessAction.error) {
            console.error('Property error type is reserved, it will be replaced');
          }

          if (customSuccessAction.payload) {
            console.error('Property payload type is reserved, it will be replaced');
          }
        }

        const successAction = {
          loading: false,
          error: false,
          type: successType,
          payload: response.data,
        };

        const customSuccessActionFinal = {
          ...customSuccessAction,
          ...successAction,
        };

        next(customSuccessAction ? customSuccessActionFinal : successAction);

        onSuccessCallback(response.data);
      })

      .catch((error) => {
        const status = (
          error &&
          error.response &&
          error.response.status
        ) || null;

        next({
          loading: false,
          error: true,
          type: failureType,
          stack: error,
          status,
        });

        console.error(error);

        if (errorTrigger) {
          errorTrigger(failureType, error.message);
        }

        onErrorCallback(error);
      });
  };
};

export default (axios, errorTrigger) => {
  return reduxSmallAxiosMiddleware(axios, errorTrigger);
};
