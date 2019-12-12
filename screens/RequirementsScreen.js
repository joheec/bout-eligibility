import React, { Component } from 'react';
import {
  Button,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';

export default class RequirementsScreen extends Component {
  state = {
    showDatePicker: false,
  }

  toggleDatePicker = () => this.setState({ showDatePicker: !this.state.showDatePicker });

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text>{this.props.title}</Text>
        <Text>Start: {this.props.start}</Text>
        <Text>End: {this.props.end}</Text>
        <Text>Saturday GLW Strategy Hour</Text>
        <Event toggleDatePicker={this.toggleDatePicker} />
        <Event toggleDatePicker={this.toggleDatePicker} />
        <Event toggleDatePicker={this.toggleDatePicker} />
        <Text>Any Practice</Text>
        <Event toggleDatePicker={this.toggleDatePicker} />
        <Event toggleDatePicker={this.toggleDatePicker} />
        <Event toggleDatePicker={this.toggleDatePicker} />
        <Text>Scrimmages</Text>
        <Event toggleDatePicker={this.toggleDatePicker} />
        <Event toggleDatePicker={this.toggleDatePicker} />
        <Event toggleDatePicker={this.toggleDatePicker} />
        <Event toggleDatePicker={this.toggleDatePicker} />
        <Text>Month 1: Volunteer 6 Hours</Text>
        <Hours />
        <Text>Month 2: Volunteer 6 Hours</Text>
        <Hours />
        <DateTimePicker
          isVisible={this.state.showDatePicker}
          onCancel={this.toggleDatePicker}
          onConfirm={(date) => {
            console.log(date);
            this.toggleDatePicker();
          }}
        />
      </ScrollView>
    );
  }
}

const Event = ({ toggleDatePicker }) => (
  <View>
    <TouchableOpacity>
      <Text onPress={toggleDatePicker}>DDD MM-DD-YYYY</Text>
    </TouchableOpacity>
  </View>
);

const Hours = () => (
  <View>
    <Text>In Vologistics?</Text>
    <TouchableOpacity><Text style={styles.checkbox}>X</Text></TouchableOpacity>
    <Button title="+" />
    <Text>0</Text>
    <Button title="-" />
  </View>
);

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
