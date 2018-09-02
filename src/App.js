import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { View, Text } from 'react-native';
import firebase from 'firebase';
import reducers from './reducers';
import Router from './Router';

const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

export default class App extends React.Component {
  componentWillMount() {
    const config = {
      apiKey: "AIzaSyBmXqtXmJ40roNg2p-Tai2HK-GKGTZY-MU",
      authDomain: "manager-c78cc.firebaseapp.com",
      databaseURL: "https://manager-c78cc.firebaseio.com",
      projectId: "manager-c78cc",
      storageBucket: "manager-c78cc.appspot.com",
      messagingSenderId: "854952877766"
    };
    firebase.initializeApp(config);
  }
  render() {
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}