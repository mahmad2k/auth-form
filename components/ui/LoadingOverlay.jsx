import { View, ActivityIndicator, StyleSheet, Text } from "react-native";

import { GlobalStyles } from "../../constants/styles";

function LoadingOverlay({ message }) {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>{message}</Text>
      <ActivityIndicator size='large' color='white' />
    </View>
  );
}

export default LoadingOverlay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  message: {
    fontSize: 16,
    marginBottom: 12,
  },
});
