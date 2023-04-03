import React, { useState, useEffect } from 'react'
import {StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'

import * as rssParser from 'react-native-rss-parser'
import * as DocumentPicker from 'expo-document-picker'

export default function GreetingScreen ({ navigation }) {
  const [rss, setRss] = useState()
  const [inputText, setInputText] = useState('')

  useEffect(() => {
    if (rss) {
      navigation.navigate('Main', {rss})
    }
  }, [rss])

  const selectOneFile = async () => {
    let file
    try {
      file = await DocumentPicker.getDocumentAsync({ type: 'text/xml'})
    } catch (error) {
      console.error(error);
    }

    if (file?.mimeType === 'text/xml' && file?.type === "success") {
      setRss(await parseUri(file.uri)) 
    } else {
      alert('Invalid file type')
    }
  }

  const parseUri = async (uri) => {
    let result = null;
    try {
      result = await fetch(uri.trim())
        .then((response) => response.text())
        .then((responseData) => rssParser.parse(responseData))
    } finally {
      return result
    }
  }

  const handlePress = async () => {
    setRss(await parseUri(inputText))
    setInputText('')
  }

  return (
    <View style={styles.mainBody}>
      <View 
        style={styles.wrap}>
        <TextInput 
          style={styles.input}
          value={inputText}
          onChangeText={ (inputText) => {
            setInputText(inputText)
          }}
        />
        <Feather 
          name="search" 
          size={24} 
          color="white" 
          onPress={handlePress}
        /> 
      </View>
      <TouchableOpacity
        style={[styles.buttonStyle, styles.fileBtn]}
        activeOpacity={0.5}
        onPress={selectOneFile}
      >
        <Text style={styles.buttonTextStyle}>
          Select File
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  buttonStyle: {
    backgroundColor: '#ff5858',
    borderWidth: 0,
    color: '#FFFFFF',
    alignItems: 'center',
    borderRadius: 30,
    marginTop: 15,
    width: '95%',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 20,
  },
  input: {
    paddingHorizontal: 5,
    fontSize: 20,
    color: 'white',
    width: '90%'
  },
  wrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:'center',

    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 10,
    marginTop: 10,

    padding: 10,
    
    borderColor: 'white',
    borderRadius: 30,
    borderWidth: 2,
    
    width: '95%'
  }
});