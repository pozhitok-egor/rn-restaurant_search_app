import React, { useState } from 'react'
import { FlatList, StyleSheet, Text } from 'react-native'
import SearchBar from '../Components/SearchBar'
import useResults from '../hooks/useResults';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import Place from '../Components/Place';

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
  const {searchApi, restaurants, errorMessage, userLocation} = useResults();

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
        keyExtractor={ place => place.place_id }
        data={restaurants}
        renderItem={({ item }) =>
        <Place {...item}
          userLocation={userLocation}
          navigator={() => navigation.navigate('RestaurantShow', { userLocation: userLocation, title: item.name || 'Selected place', place: item })}
        />}
      />
    </>
  )
}

export default SearchScreen

const styles = StyleSheet.create({})
