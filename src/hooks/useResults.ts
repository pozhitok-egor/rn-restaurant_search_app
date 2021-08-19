import { useEffect, useState } from 'react';
import yelp from '../api/yelp';
import { IRestaurant } from '../Components/Restaurant';
import * as Location from 'expo-location';

export interface IResults {
  searchApi: (searchTerm: string) => Promise<void>;
  restaurants: IRestaurant[];
  errorMessage: string;
}

export default ():IResults => {
  const [restaurants, setRestaurants] = useState<IRestaurant[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const searchApi = async (searchTerm: string): Promise<void> => {
    let locationParams;
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      locationParams = {
        location: 'warsaw'
      }
    } else {
      let location: Location.LocationObject = await Location.getCurrentPositionAsync({});
      locationParams = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      }
    }

    try {
      const response = await yelp.get('/search', {
        params: { limit: 50,
          term: searchTerm,
          ...locationParams,
          locale: 'pl_PL'
        }
      });
      setRestaurants(response.data.businesses)
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

  return {searchApi, restaurants, errorMessage};
};
