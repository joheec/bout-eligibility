import { AppLoading } from 'expo';
import React, { Component, useState } from 'react';
import {
  Button,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { createAppContainer, createStackNavigator } from 'react-navigation';

import AuthService from './src/services/Auth';

import HomeScreen from './src/screens/HomeScreen';
import Bout20200229Screen from './src/screens/20200229';

const RequirementsStack = createStackNavigator({
  Home: { screen: HomeScreen },
  Bout20200229: {screen: Bout20200229Screen }
});

const AppNavigator = createAppContainer(RequirementsStack);

export default class App extends Component {
  state = {
    isLoadingComplete: false,
    user: null,
  };

  setLoadingComplete = (isLoadingComplete) => {
    this.setState({ isLoadingComplete });
  };

  componentDidMount() {
    AuthService.subscribeAuthChange(user => this.setState({ user }));
  }

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={loadResourcesAsync}
          onError={handleLoadingError}
          onFinish={() => handleFinishLoading(this.setLoadingComplete)}
        />
      );
    } else if (!this.state.user) {
      return (
        <View style={{ flex: 1, backgroundColor: "#fff", alignItems: "center", justifyContent: "center" }}>
          <Text>Welcome!</Text>
          <Button onPress={AuthService.loginWithFacebook} title="Login with Facebook" />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <AppNavigator />
        </View>
      );
    }
  }
}

async function loadResourcesAsync() {
  await Promise.all([]);
}

function handleLoadingError(error) {
  // In this case, you might want to report the error to your error reporting
  // service, for example Sentry
  console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
  setLoadingComplete(true);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
