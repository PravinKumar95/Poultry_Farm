import React from "react";
import { Appbar, Surface } from "react-native-paper";
import BottomNavigation from "./components/BottomNav";

export default App = () => {
  return (
    <Surface style={{ height: 850 }}>
      <Appbar.Header>
        <Appbar.Content
          titleStyle={{ transform: [{ scale: 2.5 }] }}
          title="RTPF"
        />
      </Appbar.Header>
      <BottomNavigation />
    </Surface>
  );
};
