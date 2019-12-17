import React, { Component } from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import DatabaseService from '../services/Database';

export default class RequirementsScreen extends Component {
  state = {
    showDatePicker: false,
    pickerDate: new Date(),
  }

  openDatePicker = (date) => {
    this.setState({
      showDatePicker: true,
      pickerDate: date ? date : new Date(),
    });
  };

  closeDatePicker = () => {
    this.setState({
      showDatePicker: false,
      pickerDate: new Date(),
    });
  };

  onUpdate = (boutDate, requirement, subRequirement) => (value) => {
    // end erred
    // start loading
    DatabaseService.postEligibility(boutDate, {
      requirement,
      subRequirement,
      value
    })
    .then(() => {
      // end loading
    })
    .catch((err) => {
      // start erred
    })
  };

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
          {
            this.props.strategyHour.map((status, i) =>
              <Event
                { ...status }
                key={i}
                openDatePicker={() => this.openDatePicker(status.date)}
                onUpdate={this.onUpdate(this.props.boutDate, 'strategyHour', i)}
              />
            )
          }
        </View>
        <View style={{ marginBottom: 15 }}>
          <Text>Any Practice</Text>
          {
            this.props.practice.map((status, i) =>
              <Event
                { ...status }
                key={i}
                openDatePicker={() => this.openDatePicker(status.date)}
                onUpdate={this.onUpdate(this.props.boutDate, 'practice', i)}
              />
            )
          }
        </View>
        <View style={{ marginBottom: 15 }}>
          <Text>Scrimmages</Text>
          {
            this.props.scrimmage.map((status, i) =>
              <Event
                { ...status }
                key={i}
                openDatePicker={() => this.openDatePicker(status.date)}
                onUpdate={this.onUpdate(this.props.boutDate, 'scrimmage', i)}
              />
            )
          }
        </View>
        <View style={{ marginBottom: 15 }}>
          <Text>Month 1: Volunteer 6 Hours</Text>
          <Hours
            {...this.props.volunteer1}
            onUpdate={this.onUpdate(this.props.boutDate, 'volunteer1')}
          />
        </View>
        <View style={{ marginBottom: 15 }}>
          <Text>Month 2: Volunteer 6 Hours</Text>
          <Hours
            {...this.props.volunteer2}
            onUpdate={this.onUpdate(this.props.boutDate, 'volunteer2')}
          />
        </View>
        <DateTimePicker
          isVisible={this.state.showDatePicker}
          date={this.state.pickerDate}
          onCancel={this.closeDatePicker}
          onConfirm={(date) => {
            this.closeDatePicker();
          }}
        />
      </ScrollView>
    );
  }
}

const getFormattedDate = date => {
  const [week, month, day, year] = date.toString().split(' ');
  return `${week} ${month} ${day} ${year}`
};

const Event = ({ date, signin, openDatePicker, onUpdate }) => {
  const displayDate = date
    ? getFormattedDate(date)
    : 'DDD MM-DD-YYYY';
  return (
    <View style={{ flexDirection: 'row', marginVertical: 8 }}>
      <Checkbox
        isDone={signin}
        text="Signed In? "
        onUpdate={onUpdate}
      />
      <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text
          style={{ color: '#2e78b7' }}
          onPress={openDatePicker}
        >{displayDate}</Text>
      </TouchableOpacity>
    </View>
  );
};

const Hours = ({ hours, vologistic }) => (
  <View style={{ flexDirection: 'row' }}>
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Checkbox isDone={vologistic} text="In Vologistics?    " />
      <TouchableOpacity>
        <Text style={{ color: '#2e78b7', fontSize: 30 }}>-</Text>
      </TouchableOpacity>
      <Text style={{ marginHorizontal: 20 }}>{hours}</Text>
      <TouchableOpacity>
        <Text style={{ color: '#2e78b7', fontSize: 30 }}>+</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const Checkbox = ({ isDone, onUpdate, text }) => (
  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    <TouchableOpacity onPress={() => onUpdate({ signin: !isDone })}>
      <Text style={styles.checkbox}>{isDone ? 'X' : ''}</Text>
    </TouchableOpacity>
    <Text>{text}</Text>
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
