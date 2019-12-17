import React, { Component, useState } from 'react';
import {
  ActivityIndicator,
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
    subscriptions: [],
  };

  getUserData = () => {
    this.setState({ isLoading: true });
    AuthService.loginWithFacebook();
  }

  componentDidMount() {
    const unsubscribeDatabaseChange = DatabaseService.subscribe(data => this.setState({ progress: data }));
    const unsubscribeAuthChange = AuthService.subscribeAuthChange(user => {
      this.setState({ user });
      if (user && user.uid) {
        this.setState({ isLoading: true });
        DatabaseService.getEligibility(user.uid)
          .then(() => this.setState({ isLoading: false, erred: false }))
          .catch(err => this.setState({ isLoading: false, erred: true }));
      }
    });
    this.setState({ subscriptions: [unsubscribeDatabaseChange, unsubscribeAuthChange] });
  }

  componentWillUnmount() {
    if (this.state.subscriptions.length > 0) {
      this.state.subscriptions.map(unsubscribe => unsubscribe());
    }
  }

  static getDerivedStateFromError() {
    this.setState({ erred: true });
  }

  render() {
    if (this.state.erred) {
      return (
        <View style={styles.message}>
          <Text>Oops! Something went wrong.</Text>
        </View>
      );
    } else if (this.state.isLoading) {
      return (
        <View style={styles.message}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    } else if (!this.state.user) {
      return (
        <View style={styles.message}>
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
  message: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
