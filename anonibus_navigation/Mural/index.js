import React, { useState, useEffect } from 'react';
import {
    StyleSheet, View, Text, Image, ScrollView,
    TextInput, TouchableOpacity, TextBase,Button
  } from 'react-native';

import { Ionicons  } from '@expo/vector-icons';
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

      <ScrollView style={styles.scrollview} ref={(view) => { setScrollview(view) }}>
        {
          postagens.length > 0 && postagens.map(item => (

            <View key={item.id} style={styles.linha_conversa}>
              <Image style={styles.avatar_conversa} source={{ uri: item.avatar }} />
              
              <View style={{ flexDirection: 'column', marginTop: 5 }}>
             
              <View style={{ alignItems: 'flex-start', marginTop: 0 }}>
                <Text style={{ fontSize: 16, color: '#a51b0b', textAlign: 'left'}}>{item.usuario}</Text>
                
                <View style={styles.textAreaContainer} >
                {typeof (item.postagem) == "string" ?
                  //<TextInput /*multiline ={true} numberOfLines={5}*/ style={{fontSize: 20 , backgroundColor: '#dcdcdc' , borderRadius: 10, alignItems: 'flex-start' }} >{item.postagem}</TextInput>
                  //<View style={styles.textAreaContainer} >
                    
                  <TextInput
                          style={styles.textArea}
                          underlineColorAndroid="transparent"
                          //placeholder="Type something"
                          placeholderTextColor="grey"
                          numberOfLines={10}
                          multiline={true}
                   >{item.postagem}</TextInput>
                  
                 
                  :
                  <Text>teste </Text>
          }
                
                
                 </View>
                 <View style={styles.fixToText}>
                   <TouchableOpacity onPress={salvar}>
                   <Ionicons style={{ margin: 3 }} name="md-chatbubbles" size={32} color={'#999'} />
                   </TouchableOpacity>
                 </View>
               </View>
              </View>
           </View>

          ))
        }
          </ScrollView>

        <Text></Text>
        </View>
    )}

    
const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: 'flex-start',
    alignContent: 'center',
    width: '100%',
    paddingTop: 20,
    borderBottomWidth: 1,
    borderColor: '#000',
    backgroundColor: '#fff'
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#333'
  },

  avatar_conversa: {
    alignItems: 'center',
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
    alignItems: 'center',
    borderColor: '#e6e6e6',
    borderWidth: 1,
    flex: 1,
    borderRadius: 4,
    margin: 10,
    marginTop: 0,
    padding: 4
  },
  
    textAreaContainer: {
      width: 250,
      borderColor: '#000' ,
      borderWidth: 1,
      padding: 5,
      borderRadius: 10
    },
    textArea: {
      alignItems: 'flex-end',
      textAlignVertical: 'top',
      height: 150,
      justifyContent: "flex-start"
    },
  scrollView: {
    backgroundColor: '#fff',
    width: '100%',
    borderTopColor: '#e6e6e6',
    borderTopWidth: 1,
  },
  linha_conversa: {
    //display: "flex",
    flexDirection: 'row',
    paddingLeft: 20,
    paddingTop: 5,
    marginRight: 60,
  }
})

