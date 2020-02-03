import React, { Component, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
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
import Bout20200417Screen from './src/screens/20200417';
import Bout20200229Screen from './src/screens/20200229';

const RequirementsStack = createStackNavigator({
  Home: { screen: HomeScreen },
  Bout20200417: {screen: Bout20200417Screen },
  Bout20200229: {screen: Bout20200229Screen },
});

const AppNavigator = createAppContainer(RequirementsStack);

export default class App extends Component {
  state = {
    isLoading: false,
    progress: {},
    user: null,
    subscriptions: [],
  };

  showAlert = (message) => {
    Alert.alert('Something Went Wrong', message);
  }

  getUserData = () => {
    this.setState({ isLoading: true });
    AuthService.loginWithFacebook()
      .then(isLoading => this.setState(isLoading))
      .catch(err => {
        this.setState({ isLoading: false });
        this.showAlert('While logging into Facebook...');
      });
  }

  componentDidMount() {
    const unsubscribeDatabaseChange = DatabaseService.subscribe(data => this.setState({ progress: data }));
    const unsubscribeAuthChange = AuthService.subscribeAuthChange(user => {
      this.setState({ user });
      if (user && user.uid) {
        this.setState({ isLoading: true });
        DatabaseService.setUserId(user.uid);
        DatabaseService.getEligibility()
          .then(() => this.setState({ isLoading: false }))
          .catch(err => {
            this.setState({ isLoading: false });
            this.showAlert('While getting your bout eligibility info...');
          });
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
    this.showAlert('While getting derived state for app...');
  }

  render() {
    if (this.state.isLoading) {
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
