import * as React from "react";
import { BottomNavigation, Text } from "react-native-paper";
import FeedMill from "../pages/FeedMill";
import PoultryFarm from "../pages/PoultryFarm";
const FeedMillRoute = () => <FeedMill />;

const PoultryFarmRoute = () => <PoultryFarm />;

const BottomNavigationComponent = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: "feedMill",
      title: "Feed Mill",
      focusedIcon: "pot-mix",
      unfocusedIcon: "pot-mix-outline",
    },
    {
      key: "poultryFarm",
      title: "Poultry Farm",
      focusedIcon: "home",
      unfocusedIcon: "home-outline",
    },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    feedMill: FeedMillRoute,
    poultryFarm: PoultryFarmRoute,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default BottomNavigationComponent;
