import { Surface, Text } from "react-native-paper";
import { StyleSheet } from "react-native";

const Container = ({ children }) => (
  <Surface style={styles.surface} elevation={4}>
    {children}
  </Surface>
);

export default Container;

const styles = StyleSheet.create({
  surface: {
    marginBottom: 50,
    padding: 8,
    height: 700,
  },
});
