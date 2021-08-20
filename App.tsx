import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SearchScreen from './src/screens/SearchScreen';
import ResultsShowScreen from './src/screens/ResultsShowScreen';
import { IPlace } from './src/core/types/Place';
import { AdMobBanner } from 'expo-ads-admob';
import { ILocation } from './src/hooks/useResults';

export type RootStackParamList = {
  Search: undefined;
  RestaurantShow: { userLocation: ILocation, title: string, place: IPlace};
};

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="RestaurantShow" options={{
          animation: 'fade',
          headerTransparent: true,
          title: '',
          headerShadowVisible: false
        }} component={ResultsShowScreen} />
      </Stack.Navigator>
      <AdMobBanner
        style={{position: 'absolute', bottom: 0, alignSelf: 'center'}}
        bannerSize="banner"
        adUnitID="ca-app-pub-3940256099942544/6300978111" // Test ID, Replace with your-admob-unit-id
        servePersonalizedAds // true or false
      />
    </NavigationContainer>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
