import React from 'react';
import RequirementsScreen from './RequirementsScreen';

export default () => {
  const progress = {
    strategyHour: [
      {
        signin: true,
        date: new Date('12/14/2019'),
      }, {
        signin: true,
        date: new Date('12/21/2019'),
      }, {
        signin: false,
        date: null,
      },
    ],
    practice: [
      {
        signin: true,
        date: new Date('12/19/2019'),
      }, {
        signin: true,
        date: new Date('12/16/2019'),
      }, {
        signin: true,
        date: null,
      },
    ],
    scrimmage: [
      {
        signin: true,
        date: new Date('12/14/2019'),
      }, {
        signin: true,
        date: new Date('12/21/2019'),
      }, {
        signin: true,
        date: null,
      }, {
        signin: true,
        date: null,
      },
    ],
    volunteer1: {
      vologistic: true,
      hours: 3,
    },
    volunteer2: {
      vologistic: false,
      hours: 0,
    },
  };
  return (
    <RequirementsScreen
      title="Eligiblity Requirements: Sat Feb 29, 2020"
      start="Thu Dec 12, 2019"
      end="Mon Feb 3, 2020"
      {...progress}
    />
  );
};
