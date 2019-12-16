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
import DatabaseService from './src/services/Database';

import HomeScreen from './src/screens/HomeScreen';
import Bout20200229Screen from './src/screens/20200229';

const RequirementsStack = createStackNavigator({
  Home: { screen: HomeScreen },
  Bout20200229: {screen: Bout20200229Screen }
});

const AppNavigator = createAppContainer(RequirementsStack);

export default class App extends Component {
  state = {
    erred: false,
    isLoading: false,
    progress: {},
    user: null,
    unsubscribe: null,
  };

  setLoadingComplete = (isLoadingComplete) => {
    this.setState({ isLoadingComplete });
  };

  getUserData = () => {
    this.setState({ isLoading: true });
    AuthService.loginWithFacebook();
  }

  componentDidMount() {
    this.setState({
      unsubscribe: AuthService.subscribeAuthChange(user => {
        this.setState({ user });
        if (user && user.uid) {
          DatabaseService.getEligibility(user.uid)
          .then((progress) => {
            this.setState({
              isLoading: false,
              progress,
            });
          })
        }
      }),
    });
  }

  componentWillUnmount() {
    if (this.state.unsubscribe) {
      this.state.unsubscribe();
    }
  }

  static getDerivedStateFromError() {
    this.setState({ erred: true });
  }

  render() {
    if (this.state.erred) {
      return <Text>Oops! Something went wrong.</Text>;
    } else if (this.state.isLoading) {
      return (
        <View style={{ flex:1, backgroundColor: "#fff", alignItems: "center", justifyContent: "center" }}>
          <Text>Loading...</Text>
        </View>
      );
    } else if (!this.state.user) {
      return (
        <View style={{ flex: 1, backgroundColor: "#fff", alignItems: "center", justifyContent: "center" }}>
          <Text>Welcome!</Text>
          <Button onPress={this.getUserData} title="Login with Facebook" />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <AppNavigator screenProps={this.state.progress} />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
