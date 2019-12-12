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
        <View style={{ marginBottom: 15 }}>
          <Text>{this.props.title}</Text>
          <Text>Start: {this.props.start}</Text>
          <Text>End: {this.props.end}</Text>
        </View>
        <View style={{ marginBottom: 15 }}>
          <Text>Saturday GLW Strategy Hour</Text>
          <Event toggleDatePicker={this.toggleDatePicker} />
          <Event toggleDatePicker={this.toggleDatePicker} />
          <Event toggleDatePicker={this.toggleDatePicker} />
        </View>
        <View style={{ marginBottom: 15 }}>
          <Text>Any Practice</Text>
          <Event toggleDatePicker={this.toggleDatePicker} />
          <Event toggleDatePicker={this.toggleDatePicker} />
          <Event toggleDatePicker={this.toggleDatePicker} />
        </View>
        <View style={{ marginBottom: 15 }}>
          <Text>Scrimmages</Text>
          <Event toggleDatePicker={this.toggleDatePicker} />
          <Event toggleDatePicker={this.toggleDatePicker} />
          <Event toggleDatePicker={this.toggleDatePicker} />
          <Event toggleDatePicker={this.toggleDatePicker} />
        </View>
        <View style={{ marginBottom: 15 }}>
          <Text>Month 1: Volunteer 6 Hours</Text>
          <Hours />
        </View>
        <View style={{ marginBottom: 15 }}>
          <Text>Month 2: Volunteer 6 Hours</Text>
          <Hours />
        </View>
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
      <Text
        style={{ color: '#2e78b7' }}
        onPress={toggleDatePicker}
      >DDD MM-DD-YYYY</Text>
    </TouchableOpacity>
  </View>
);

const Hours = () => (
  <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <TouchableOpacity><Text style={styles.checkbox}>X</Text></TouchableOpacity>
      <Text>In Vologistics?</Text>
    </View>
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <TouchableOpacity>
        <Text style={{ color: '#2e78b7', fontSize: 30 }}>-</Text>
      </TouchableOpacity>
      <Text style={{ marginHorizontal: 20 }}>0</Text>
      <TouchableOpacity>
        <Text style={{ color: '#2e78b7', fontSize: 30 }}>+</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
  },
  checkbox: {
    borderWidth: 1,
    borderColor: '#2e78b7',
    width: 20,
    height: 20,
    marginHorizontal: 10,
    textAlign: 'center',
    fontWeight: 'bold',
  }
});
