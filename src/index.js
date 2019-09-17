import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/es/integration/react";
import "./config/appConfig";
import { persistor, store } from "./config/redux";
import apiClient from "./network/apiClient";

const onBeforeLift = () => {
  apiClient.setAuthTokenInHeader(store.getState().auth.token);
};
console.log(store);
const Root = () => (
  <Provider store={store}>
    <PersistGate persistor={persistor} onBeforeLift={onBeforeLift}>
      <App />
    </PersistGate>
  </Provider>
);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor} onBeforeLift={onBeforeLift}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
