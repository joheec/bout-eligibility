import React from 'react';
import RequirementsScreen from './RequirementsScreen';

export default ({ screenProps }) => {
  const boutDate = '20200417';
  return (
    <RequirementsScreen
      boutDate={boutDate}
      title="Eligiblity Requirements: Fri Apr 17, 2020"
      start="Fri Jan 31, 2020"
      end="Mon Mar 23, 2020"
      {...screenProps[boutDate]}
    />
  );
};
