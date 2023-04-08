import React from "react";
import { Button } from "react-native-paper";

const MyButton = (props) => {
  return <Button style={{ marginTop: 20, padding: 10 }} {...props} />;
};

export default MyButton;
