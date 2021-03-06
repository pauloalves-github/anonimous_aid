import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { } from './styles';


export default Home = ({ navigation }) => {

  return (
    <View style={styles.container}>
      <Text>BEM VINDO(A) À PÁGINA INICIAL</Text>
      <Button title="Página 1" onPress={() =>
        navigation.push('HomeDetails')} />
      <Button title="Página 2" onPress={() =>
        navigation.push('HomeDetails', { name: '' })} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 10,
    borderRadius: 5
  }
});

