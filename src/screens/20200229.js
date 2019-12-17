import React from 'react';
import RequirementsScreen from './RequirementsScreen';

export default ({ screenProps }) => {
  const boutDate = '20200229';
  return (
    <RequirementsScreen
      boutDate={boutDate}
      title="Eligiblity Requirements: Sat Feb 29, 2020"
      start="Thu Dec 12, 2019"
      end="Mon Feb 3, 2020"
      {...screenProps[boutDate]}
    />
  );
};
