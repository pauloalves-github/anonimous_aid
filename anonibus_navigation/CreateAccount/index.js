import React from "react";
import { View, Text, TextInput, StyleSheet, Button,TouchableOpacity} from "react-native";
import { } from './styles';
import { Ionicons } from '@expo/vector-icons';

import { AuthContext } from '../context';

import firebase from 'firebase';

export default CreateAccount = () => {

  const [textEmail, setTextEmail] = React.useState('')
  const [textPassword, setTextPassword] = React.useState('')
  const [hidePassword, sethidePassword] = React.useState(true)

const handleSignUp = () => {
    if (textPassword.length < 8) {
      alert('A senha não pode ter menos de 8 caracteres');
      return;
    }
    firebase
      .auth()
      .createUserWithEmailAndPassword(textEmail, textPassword)
      .then(() => signUp())
      .catch(function(error){
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == 'auth/weak-password')  {
          alert('A senha é fraca. ');
        } else{
          alert(errorMessage);
        }
        console.log(error);
      })
    

  }

   managePasswordVisibility = () => {
        sethidePassword(!hidePassword);
      }

    

  const { signUp } = React.useContext(AuthContext)

  return (
    <View style={styles.container}>
      <View style={styles.view_fields}>
        <TextInput
          style={styles.input_auth}
          onChangeText={text => setTextEmail(text.toLowerCase())}
          value={textEmail} />

        <TextInput
          placeholder="Digite sua senha"
          style={styles.input_auth}
          onChangeText={text => setTextPassword(text)}
          value={textPassword} secureTextEntry={hidePassword} />
      </View>
      <TouchableOpacity  onPress={managePasswordVisibility} >
          <Ionicons name={hidePassword ? "md-eye" : "md-eye-off"} size={32} color="gray" />
          </TouchableOpacity>

      <Button title="Criar Conta" onPress={() => handleSignUp()} />
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