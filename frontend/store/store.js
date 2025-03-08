import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import authReducer from "./redux/authSlice";
import { watchAuth } from "./saga/authSaga";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: { auth: authReducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(watchAuth);

export default store;
