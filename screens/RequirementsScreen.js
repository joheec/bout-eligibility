import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default class RequirementsScreen extends Component {
  render() {
    return (
      <ScrollView style={styles.container}>
        <Text>{this.props.title}</Text>
        <Text>Start: {this.props.start}</Text>
        <Text>End: {this.props.end}</Text>
        <TouchableOpacity>
          <Text style={styles.checkbox}>X</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.checkbox}></Text>
        </TouchableOpacity>
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
  checkbox: {
    borderWidth: 1,
    borderColor: 'black',
    width: 20,
    height: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  }
});
