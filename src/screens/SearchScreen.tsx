import React, { useState } from 'react'
import { FlatList, StyleSheet, Text } from 'react-native'
import SearchBar from '../Components/SearchBar'
import Restaurant from '../Components/Restaurant';
import useResults from '../hooks/useResults';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'Search'>;

type ProfileScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Search'
>;

type Props = {
  route: ProfileScreenRouteProp;
  navigation: ProfileScreenNavigationProp;
};

const SearchScreen = ({navigation}: Props) => {

  const [term, setTerm] = useState('');
  const {searchApi, restaurants, errorMessage} = useResults();

  return (
    <>
      <SearchBar
        term={term}
        onTermChange={(newTerm: string) => setTerm(newTerm)}
        onTermSubmit={() => searchApi(term)}
      />
      { errorMessage ?
        <Text style={{color: 'red', textAlign: 'center'}}>
          {errorMessage}
        </Text> : null

      }
      <FlatList
        keyExtractor={ restaurant => restaurant.id }
        data={restaurants}
        renderItem={({ item }) =>
        <Restaurant {...item}
          navigator={() => navigation.navigate('RestaurantShow', { title: item.name, id: item.id })}
        />}
      />
    </>
  )
}

export default SearchScreen

const styles = StyleSheet.create({})
