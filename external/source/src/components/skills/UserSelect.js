import React from 'react';
import Select from 'react-select';

import { map } from 'lodash';

export const UsersSelect = function(props) {
  const users_labels = map(props.users, item => {
    item.full_name = `${item.first_name} ${item.last_name}`;
    return item;
  });


  return (
    <Select
      className="select-user"
      multi={false}
      placeholder=""
      options={users_labels}
      value={props.state_selected_user}
      labelKey="full_name"
      valueKey="id"
      onChange={props.changeState.bind(null, 'user')}
    />
  );
};
