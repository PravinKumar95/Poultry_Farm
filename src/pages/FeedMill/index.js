import React, { useEffect, useState } from "react";
import { Divider } from "react-native-paper";
import ListItem from "../../components/ListItem";
import Title from "../../components/Title";
import MaterialPurchase from "./MaterialPurchase";
import MaterialStock from "./MaterialStock";

const FeedMill = () => {
  const [showList, setShowList] = useState(true);
  const [listIndex, setListIndex] = useState(-1);

  const handleItemClick = (index) => {
    setListIndex(index);
    setShowList(false);
  };

  const List = () => {
    return (
      <>
        <Title>Feed Mill</Title>
        <ListItem title="Material Stock" onPress={() => handleItemClick(0)} />
        <Divider />
        <ListItem
          title="Material Purchase"
          onPress={() => handleItemClick(1)}
        />
        <Divider />
        <ListItem title="Feed Rate" onPress={() => handleItemClick(2)} />
        <Divider />
      </>
    );
  };

  const Table = ({ listIndex }) => {
    switch (listIndex) {
      case 0:
        return <MaterialStock goBack={() => setShowList(true)} />;
      case 1:
        return <MaterialPurchase goBack={() => setShowList(true)} />;
    }
  };

  return showList ? <List /> : <Table listIndex={listIndex} />;
};

export default FeedMill;
