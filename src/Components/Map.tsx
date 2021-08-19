import React, { useEffect, useState } from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import MapView, {Marker, Polyline} from 'react-native-maps';
import { IResult } from '../core/types/result';
import * as Location from 'expo-location';
import openrouteservice from '../api/openrouteservice';

interface IProps {
  result: IResult;
}

interface IDirections {
  properties: {
    summary: {
      distance: number;
      duration: number;
    }
  };
  geometry: { coordinates: Array<[number, number]>}
}

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0122;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const Map = ({result}: IProps) => {
  const [location, setLocation] = useState<null | Location.LocationObject>(null);
  const [directions, setDirections] = useState<IDirections>();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      try {
        const response = await openrouteservice.get('/foot-walking', {
          params: {
            start: `${location.coords.longitude},${location.coords.latitude}`,
            end: `${result.coordinates.longitude},${result.coordinates.latitude}`
          }
        });
        setDirections(response.data.features[0])
      } catch (error) {
        return
      }
    })();
  }, [])

  return (
    <View style={{borderRadius: 20, overflow: 'hidden'}}>
      <MapView
        style={{ width: '100%', height: 220, marginTop: 0}}
        initialRegion={{
          latitude: result.coordinates.latitude,
          longitude: result.coordinates.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}
      >
        { location &&
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude
            }}
            title='Your position'
          />
        }

        { location && directions && result &&
          <Polyline
            coordinates={
              directions.geometry.coordinates.map((el) =>
                {
                  return {latitude: el[1] , longitude: el[0]}
                }
              )
            }
            strokeColor="#7fda85"
            strokeColors={['#7fda85']}
            strokeWidth={4}
            lineDashPattern={[4,4]}
            lineCap='round'
            lineJoin='round'
          />
        }

        <Marker
          coordinate={{
            latitude: result.coordinates.latitude,
            longitude: result.coordinates.longitude
          }}
          title={result.name}
          description={[result.location.country, result.location.city, result.location.address1].join(', ')}
        />
      </MapView>
    </View>
  )
}

export default Map

const styles = StyleSheet.create({})
