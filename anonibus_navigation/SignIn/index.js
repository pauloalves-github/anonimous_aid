import React from "react";
import { View, Text, TextInput, StyleSheet, Button, TouchableOpacity, Alert } from "react-native";

//import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

import { AuthContext } from '../context';

import { } from './styles';

import firebase from 'firebase';

export default SignIn = ({ navigation }) => {
  

  const { signIn } = React.useContext(AuthContext)

  const [textEmail, setTextEmail] = React.useState('')
  const [textPassword, setTextPassword] = React.useState('')
  const [hidePassword, sethidePassword] = React.useState(true)

  const handleSignIn = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(textEmail, textPassword)
      .then(() => signIn())
      .catch(error => alert(error))

  }


  managePasswordVisibility = () => { 
    sethidePassword(!hidePassword);
  }

  return (

    
    
    <View style={styles.container}>
      <View style={styles.view_fields}>
        <TextInput
          style={styles.input_auth}
          onChangeText={text => setTextEmail(text.toLowerCase())}
          value={textEmail} />

        <TextInput
          style={styles.input_auth}
          onChangeText={text => setTextPassword(text)}
          maxLength={12}
          value={textPassword}  secureTextEntry={hidePassword} />
      </View>
      
          <TouchableOpacity  onPress={managePasswordVisibility} >
          <Ionicons name={hidePassword ? "md-eye" : "md-eye-off"} size={32} color="gray" />
          </TouchableOpacity>

      <Button title="Acessar" onPress={() => handleSignIn()} />
      <Button title="Criar Conta" onPress={() => navigation.push("CreateAccount")} />

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
  },
  input_auth: {
    borderColor: '#ccc',
    borderWidth: 1,
    flex: 1,
    borderRadius: 3,
    margin: 10,
    marginTop: 0,
    padding: 4
  },
  view_fields: {
    flexDirection: 'column',
    width: '100%',
    height: 100
  }
});

