import React, { Component, useState } from 'react';
import {
  Alert,
  ActivityIndicator,
  Button,
  Platform,
  RefreshControl,
  SafeAreaView,
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
    isLoading: false,
    dateRequirement: null,
    dateSubRequirement: null,
    showDatePicker: false,
    pickerDate: new Date(),
    refreshing: false,
  }

  setRefreshing = (status) => this.setState({ refreshing: status });

  onRefresh = () => {
    this.setRefreshing(true);
    DatabaseService.getEligibility().then(() => this.setRefreshing(false));
  };

  openDatePicker = (dateRequirement, dateSubRequirement, date) => {
    this.setState({
      dateRequirement,
      dateSubRequirement,
      showDatePicker: true,
      pickerDate: date ? new Date(date) : new Date(),
    });
  };

  closeDatePicker = () => {
    this.setState({
      showDatePicker: false,
      pickerDate: new Date(),
    });
  };

  updateDate = (date) => {
    this.closeDatePicker();
    this.onUpdate(this.state.dateRequirement)(this.state.dateSubRequirement)
      ({ date: date.toJSON() });
  };

  onUpdate = (requirement) => (subRequirement) => (value) => {
    this.setState({ isLoading: true });
    DatabaseService.postEligibility(this.props.boutDate, {
      requirement,
      subRequirement,
      value
    })
    .then(() => {
      this.setState({ isLoading: false });
    })
    .catch((err) => {
      Alert.alert('Something Went Wrong', 'While updating your eligibility...');
    })
  };

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ marginTop: 50 }}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }
    return (
      <SafeAreaView style={{ flex: 1}}>
      <ScrollView style={styles.container}
        refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh} />}
      >
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
                openDatePicker={() => this.openDatePicker('strategyHour', i, status.date)}
                onUpdate={this.onUpdate('strategyHour')(i)}
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
                openDatePicker={() => this.openDatePicker('practice', i, status.date)}
                onUpdate={this.onUpdate('practice')(i)}
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
                openDatePicker={() => this.openDatePicker('scrimmage', i, status.date)}
                onUpdate={this.onUpdate('scrimmage')(i)}
              />
            )
          }
        </View>
        <View style={{ marginBottom: 15 }}>
          <Text>Month 1: Volunteer 6 Hours</Text>
          <Hours
            {...this.props.volunteer1}
            onUpdate={this.onUpdate('volunteer1')}
          />
        </View>
        <View style={{ marginBottom: 15 }}>
          <Text>Month 2: Volunteer 6 Hours</Text>
          <Hours
            {...this.props.volunteer2}
            onUpdate={this.onUpdate('volunteer2')}
          />
        </View>
        <DateTimePicker
          isVisible={this.state.showDatePicker}
          date={this.state.pickerDate}
          onCancel={this.closeDatePicker}
          onConfirm={this.updateDate}
        />
      </ScrollView>
      </SafeAreaView>
    );
  }
}

const Event = ({ date, signin, openDatePicker, onUpdate }) => {
  const displayDate = date
    ? new Date(date).toDateString()
    : 'DDD MM-DD-YYYY';
  return (
    <View style={{ flexDirection: 'row', marginVertical: 8 }}>
      <Checkbox
        isDone={signin}
        text="Signed In? "
        onUpdate={() => onUpdate({ signin: !signin })}
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

const Hours = ({ hours, vologistic, onUpdate }) => {
  const [time, setTime] = useState(hours);
  const saveTime = () => onUpdate('hours')(time);

  return (
    <View style={{ flexDirection: 'row' }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Checkbox
          isDone={vologistic}
          text="In Vologistics?    "
          onUpdate={() => onUpdate('vologistic')(!vologistic)}
        />
        <TouchableOpacity onPress={() => setTime(time - 0.5)}>
          <Text style={{ color: '#2e78b7', fontSize: 30 }}>-</Text>
        </TouchableOpacity>
        <Text style={{ marginHorizontal: 20, width: 30, textAlign: 'center' }}>{time}</Text>
        <TouchableOpacity onPress={() => setTime(time + 0.5)}>
          <Text style={{ color: '#2e78b7', fontSize: 30 }}>+</Text>
        </TouchableOpacity>
        <View style={{
          marginLeft: 25,
          borderWidth: 2,
          borderColor: '#4289F7',
          borderRadius: 10,
        }}>
          <Button title="SAVE" onPress={saveTime} />
        </View>
      </View>
    </View>
  );
};

const Checkbox = ({ isDone, onUpdate, text }) => (
  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    <TouchableOpacity onPress={onUpdate}>
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
