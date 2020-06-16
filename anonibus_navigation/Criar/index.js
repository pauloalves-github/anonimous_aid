import React, { useState, useEffect  } from 'react';
import { Ionicons } from '@expo/vector-icons';
import {
  StyleSheet, View, Text, Image, ScrollView,
  TextInput, TouchableOpacity,Button
} from 'react-native';
import firebase from '../config/firebase';
import api from '../services/axios';
import axios from 'axios';

export default function Mural() {

  const [user, setUser] = useState(null)
  const [postagens, setPostagens] = useState([])
  const [caixaTexto, setCaixaTexto] = useState('')
  const [scrollview, setScrollview] = useState('')



  const db = firebase.firestore()

  const salvar = () => {
    api.post('/enviarPostagem', {
      postagem: caixaTexto,
      usuario: user.name,
      avatar: user.picture,
    })
      .then(function () {
        // setMensagens([...mensagens, caixaTexto])
        setCaixaTexto('')
        scrollview.scrollToEnd({ animated: true })
      }).catch(function () {

      })
  }

  useEffect(() => {
    carregaUsuarioAnonimo()
    let postagens_enviadas = []
    const unsubscribe = db.collection("mural")
      .doc("sala_01").collection('postagens')
      .onSnapshot({ includeMetadataChanges: false }, function (snapshot) {
        snapshot.docChanges().forEach(function (change) {
          if (change.type === "added") {
            const { postagem, usuario, avatar } = change.doc.data()
            const id = change.doc.id
            postagens_enviadas.push({ postagem, usuario, avatar, id })
          }
        })
        setPostagens([...postagens_enviadas])
        scrollview ? scrollview.scrollToEnd({ animated: true }) : null;
      })
    return () => {
      unsubscribe()
    }
  }, [])

  const carregaUsuarioAnonimo = () => {
    axios.get('https://randomuser.me/api/')
      .then(function (response) {
        const user = response.data.results[0];
        // setDistance(response.data.distance)
        setUser({
          name: `${user.name.first} ${user.name.last}`,
          picture: user.picture.large
        })
        console.log('user', user)
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <View style={styles.view}>

      {user &&
        <>
          <TouchableOpacity onPress={carregaUsuarioAnonimo}>

            <Image
              style={styles.avatar}
              source={{ uri: user.picture }} />
          </TouchableOpacity>

          <Text style={styles.nome_usuario}>{user.name}</Text>
        </>

      }



     


      <View style={styles.footer}>
        <TextInput
          style={styles.input_postagem}
          onChangeText={text => setCaixaTexto(text)}
          value={caixaTexto} />

     
 
      </View>
     <View style={{ flexDirection: 'row'}}>
       <TouchableOpacity >
         <Button onPress={salvar} title="Quero Apoiar"/>
         </TouchableOpacity>

        <TouchableOpacity >
           <Button onPress={salvar} title="Quero Apoio"/>
        </TouchableOpacity>
      </View>


    </View>)
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: 'center',
    alignContent: 'center',
    width: '100%',
    paddingTop: 50,
    borderBottomWidth: 1,
    borderColor: '#000'
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#333'
  },

  avatar_conversa: {
    width: 40,
    height: 40,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#333',
    marginRight: 10
  },

  nome_usuario: {
    fontSize: 25,
    color: '#999'
  },

  footer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    height: 50
  },
  input_postagem: {
    borderColor: '#e6e6e6',
    borderWidth: 1,
    flex: 1,
    borderRadius: 4,
    margin: 10,
    marginTop: 0,
    padding: 4
  },
  scrollView: {
    backgroundColor: '#fff',
    width: '100%',
    borderTopColor: '#e6e6e6',
    borderTopWidth: 1,
  },
  linha_conversa: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingTop: 10,
    marginRight: 60,
  }
})

