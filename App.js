import React from "react";
import { StyleSheet, View } from "react-native";
import LoginForm from "./src/components/login-form";
import Header from "./src/components/header";
import { Provider } from "react-redux";
import configureStore from "./src/components/configureStore";

// Moving your configureStore() call to outside your component.
// 12 -> https://stackoverflow.com/questions/46046909/provider-does-not-support-changing-store-on-the-fly-in-reactnative-redux
const store = configureStore();

export default class App extends React.Component {
  render() {
    //const store = configureStore(reducers, {}, applyMiddleware(ReduxThunk)); -> Moved to configureStore.js
    return (
      <Provider store={store}>
      <View>
        <Header title="Login" />
        <LoginForm />
      </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "orange",
    alignItems: "center",
    justifyContent: "center"
  }
});
