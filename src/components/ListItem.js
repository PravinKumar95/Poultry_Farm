import React from "react";
import { List, TouchableRipple } from "react-native-paper";

const ListItem = ({ title, description, onPress }) => {
  return (
    <TouchableRipple onPress={onPress} rippleColor="rgba(0, 0, 0, .32)">
      <List.Item
        title={title}
        titleStyle={{ fontSize: 20, padding: 20 }}
        description={description}
        right={(props) => <List.Icon {...props} icon="chevron-right" />}
      />
    </TouchableRipple>
  );
};

export default ListItem;
