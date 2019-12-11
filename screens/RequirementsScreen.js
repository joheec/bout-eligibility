import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';

export default class RequirementsScreen extends Component {
  render() {
    return (
      <ScrollView style={styles.container}>
        <Text>{this.props.title}</Text>
        {/**
         * Go ahead and delete ExpoLinksView and replace it with your content;
         * we just wanted to provide you with some helpful links.
         */}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
