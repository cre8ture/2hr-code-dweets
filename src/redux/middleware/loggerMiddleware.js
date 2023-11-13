// src/redux/middleware/loggerMiddleware.js
const loggerMiddleware = store => next => action => {
    // Call the next dispatch method in the middleware chain.
    let result = next(action);

    console.log('State after action:', store.getState());

    // This will likely be the action itself, unless
    // a middleware further in chain changed it.
    return result;
}

export default loggerMiddleware;
