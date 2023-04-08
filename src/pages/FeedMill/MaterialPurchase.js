import * as React from "react";
import { View } from "react-native";
import { DataTable, Modal, Portal, Text } from "react-native-paper";
import Button from "../../components/Button";
import Input from "../../components/Input";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MaterialPurchase = ({ goBack }) => {
  const containerStyle = {
    backgroundColor: "white",
    padding: 20,
    transform: [{ translateY: -150 }],
  };
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [materialName, setMaterialName] = React.useState("");
  const [quantity, setQuantity] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [purchaseData, setPurchaseData] = React.useState({
    name: "Material Purchase Data",
    title: ["Materials", "Stock (kg)", "Avg rate (Rs)", "Date"],
    rows: [],
  });

  React.useEffect(() => {
    const updateState = async () => {
      const data = await loadData();
      setPurchaseData((prev) => ({ ...prev, rows: [...data.rows] }));
    };
    updateState();
  }, []);

  React.useEffect(() => {
    const saveState = async () => {
      await storeData(purchaseData);
    };
    saveState();
  }, [purchaseData]);

  const addItemToRow = () => {
    setPurchaseData((prev) => {
      return {
        ...prev,
        rows: [
          ...prev.rows,
          [
            { data: materialName, isNumeric: false },
            { data: quantity, isNumeric: true },
            { data: price, isNumeric: true },
            { data: new Date().toLocaleDateString(), isNumeric: false },
          ],
        ],
      };
    });
  };
  const addItem = () => {
    addItemToRow();
  };
  const handleAddItem = async () => {
    addItem();
    hideModal();
  };
  const loadData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@material_purchase_data");
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  };
  const storeData = async (value) => {
    try {
      const serialized = JSON.stringify(value);
      await AsyncStorage.setItem("@material_purchase_data", serialized);
    } catch (e) {
      console.error("failed to save data");
    }
  };
  const showModal = () => {
    setIsModalVisible(true);
  };
  const hideModal = () => {
    setIsModalVisible(false);
  };
  return (
    <>
      <DataTable>
        <DataTable.Header>
          {purchaseData.title.map((title) => (
            <DataTable.Title key={title}>{title}</DataTable.Title>
          ))}
        </DataTable.Header>
        {purchaseData.rows.map((row, index) => {
          return (
            <DataTable.Row key={"row" + index}>
              {row.map((cell) => (
                <DataTable.Cell key={cell.data}>{cell.data}</DataTable.Cell>
              ))}
            </DataTable.Row>
          );
        })}
      </DataTable>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <Button icon="plus-box" uppercase onPress={showModal}>
          Add Item
        </Button>
        <Button icon="arrow-left" uppercase onPress={goBack}>
          Back
        </Button>
        <Portal>
          <Modal
            visible={isModalVisible}
            onDismiss={hideModal}
            contentContainerStyle={containerStyle}
          >
            <Text variant="titleLarge"> Add Item </Text>
            <Input
              label="Material Name"
              mode="outlined"
              value={materialName}
              onChangeText={(text) => setMaterialName(text)}
            />
            <Input
              label="Quantity (kg)"
              mode="outlined"
              value={quantity}
              onChangeText={(text) => setQuantity(text)}
            />
            <Input
              label="Price (Rs)"
              mode="outlined"
              value={price}
              onChangeText={(text) => setPrice(text)}
            />
            <Button mode="contained" onPress={handleAddItem} uppercase>
              Add
            </Button>
            <Button
              mode="contained-tonal"
              onPress={() => {}}
              uppercase
              onPressIn={hideModal}
            >
              Cancel
            </Button>
          </Modal>
        </Portal>
      </View>
    </>
  );
};

export default MaterialPurchase;
