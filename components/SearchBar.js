import { StyleSheet, View, TextInput } from 'react-native'
import { Feather } from '@expo/vector-icons'

export default function SearchBar({ findNews }) {
  return (
    <View 
      style={styles.wrap}>
      <TextInput 
        style={styles.input}
        onChangeText={ (inputText) => {
          findNews(inputText);
        }}
      />
      <Feather 
        name="search" 
        size={24} 
        color="white" 
      /> 
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    width: '90%',
    paddingHorizontal: 5,
    fontSize: 20,
    color: 'white'
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
    borderRadius: 5,
    borderWidth: 2,
    
    width: '95%'
  }
})