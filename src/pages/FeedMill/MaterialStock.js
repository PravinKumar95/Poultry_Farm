import * as React from "react";
import { Button, DataTable, Text } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MaterialStock = ({ goBack }) => {
  const [purchaseData, setPurchaseData] = React.useState(null);
  const [stockData, setStockData] = React.useState(null);
  const loadData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@material_purchase_data");
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  };
  React.useEffect(() => {
    const updateData = async () => {
      setPurchaseData(await loadData());
    };
    updateData();
  }, []);

  React.useEffect(() => {
    const cache = new Map();
    if (purchaseData) {
      purchaseData.rows.forEach((row) => {
        const materialName = row[0].data;
        const materialStock = row[1].data;
        const materialPrice = row[2].data;
        if (cache.has(materialName)) {
          const prevData = cache.get(materialName);
          cache.set(materialName, {
            materialStock: +prevData.materialStock + +materialStock,
            materialPrice: +prevData.materialPrice + +materialPrice,
          });
        } else {
          cache.set(materialName, { materialStock, materialPrice });
        }
      });
    }
  }, [purchaseData]);
  return (
    <>
      {purchaseData ? (
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
      ) : (
        <Text>Cannot load data </Text>
      )}

      <Button icon="arrow-left" onPress={goBack}>
        Back
      </Button>
    </>
  );
};

export default MaterialStock;
