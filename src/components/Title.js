import React from "react";
import { Text } from "react-native-paper";
const Title = ({ children }) => {
  return (
    <Text
      variant="displaySmall"
      style={{ textAlign: "center", paddingTop: 10 }}
    >
      {children}
    </Text>
  );
};

export default Title;
