import { useEffect, useState } from 'react';
import yelp from '../api/yelp';
import * as Location from 'expo-location';
import google from '../api/google';
import { IPlace } from '../core/types/Place';

export interface IResults {
  searchApi: (searchTerm: string) => Promise<void>;
  restaurants: IPlace[];
  errorMessage: string;
  userLocation: ILocation;
}

export interface ILocation {
  lat: number;
  lng: number;
}

export default ():IResults => {
  const [restaurants, setRestaurants] = useState<IPlace[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [userLocation, setUserLocation] = useState<ILocation>({lat: 52.229369682060565, lng: 21.008723627961643});

  const searchApi = async (searchTerm: string): Promise<void> => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status === 'granted') {
      let location: Location.LocationObject = await Location.getCurrentPositionAsync({});
      setUserLocation({
        lat: location.coords.latitude,
        lng: location.coords.longitude
      });
    }

    try {
      const response = await google.get('/nearbysearch/json',
      {
        params: {
          location: `${userLocation.lat},${userLocation.lng}`,
          keyword: searchTerm,
        }
      })
      setRestaurants(response.data.results)
    } catch (error) {
      setErrorMessage(error.message)
    }
  }

  useEffect(() => {
    setErrorMessage('')
  }, [restaurants])

  // Call searchApi when component
  // is first rendered.  BAD CODE!
  // searchApi('pasta');
  useEffect(() => {
    searchApi('restaurant');
  }, []);

  return {searchApi, restaurants, errorMessage, userLocation};
};
