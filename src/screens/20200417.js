import React from 'react';
import RequirementsScreen from './RequirementsScreen';

export default ({ screenProps }) => {
  const boutDate = '20200417';
  return (
    <RequirementsScreen
      boutDate={boutDate}
      title="Eligiblity Requirements: Fri Apr 17, 2020"
      start="Mon Feb 3, 2020"
      end="Sun Mar 29, 2020"
      {...screenProps[boutDate]}
    />
  );
};
