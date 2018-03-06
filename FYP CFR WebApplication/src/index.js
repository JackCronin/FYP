import React from "react";
import ReactDOM from "react-dom";
import Main from "./Container/Main";
import Login from "./Container/Login";
import AddDocuments from "./Container/AddDocuments";
import MyDocuments from "./Container/MyDocuments";
import AlertSetting from "./Container/AlertSetting";
import MyAlerts from "./Container/MyAlerts";
import MyProfile from "./Container/MyProfile";
import MyGroups from "./Container/MyGroups";
import Register from "./Container/Register";
import registerServiceWorker from './registerServiceWorker';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import reducers from './Reducer/index';
import { Provider } from 'react-redux';
import { BrowserRouter ,Switch , Route } from "react-router-dom";
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <Switch>
        <Route path="/AddDocuments" component={AddDocuments}/>
        <Route path="/MyDocuments" component={MyDocuments}/>
        <Route path="/AlertSetting" component={AlertSetting}/>
        <Route path="/MyAlerts" component={MyAlerts}/>
        <Route path="/MyProfile" component={MyProfile}/>
        <Route path="/MyGroups" component={MyGroups}/>
        <Route path="/Register" component={Register}/>
        <Route path="/Login" component={Login}/>
        <Route path="/" component={Main}/>
      </Switch>
    </BrowserRouter>
  </Provider>,
document.getElementById("root")
);
registerServiceWorker();
