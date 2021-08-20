import React from 'react'
import { Image, StyleSheet, Text , TextInput, View } from 'react-native'
import { Feather } from '@expo/vector-icons'

type Props = {
  term: string;
  onTermChange: (value: string) => void;
  onTermSubmit: () => void;
}

const SearchBar = ({ term, onTermChange, onTermSubmit }: Props) => {
  return (
    <View style={styles.background}>
      <Feather
        style={styles.iconStyle}
        name='search'
        color='black'
      />
      <TextInput
        autoCorrect={false}
        placeholder='Search'
        style={styles.inputStyle}
        value={term}
        onChangeText={onTermChange}
        onSubmitEditing={onTermSubmit}
      />
    </View>
  )
}

export default SearchBar

const styles = StyleSheet.create({
  background: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    margin: 10,
    height: 50,
    borderRadius: 20,
    backgroundColor: '#dcdcdc'
  },
  inputStyle: {
    flex: 1,
    fontSize: 18,
    marginHorizontal: 10,
  },
  iconStyle: {
    alignSelf: 'center',
    fontSize: 30,
  }
})
