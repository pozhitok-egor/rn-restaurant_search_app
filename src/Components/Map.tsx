import React, { useEffect, useState } from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import MapView, {Marker} from 'react-native-maps';
import * as Location from 'expo-location';
import { IPlace } from '../core/types/Place';
import CONFIG from '../core/config';
import MapViewDirections from 'react-native-maps-directions';
import { ILocation } from '../hooks/useResults';


const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0122;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const Map = ({place, location}: {place: IPlace, location: ILocation}) => {

  return (
    <View style={{borderRadius: 20, overflow: 'hidden'}}>
      { place.geometry &&
        <MapView
          style={{ width: '100%', height: 220, marginTop: 0}}
          initialRegion={{
            latitude: place.geometry.location.lat,
            longitude: place.geometry.location.lng,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
        >
          { location &&
            <Marker
              coordinate={{
                latitude: location.lat,
                longitude: location.lng
              }}
              pinColor='green'
              title='Your position'
            />
          }

          { location && place.geometry &&
            <MapViewDirections
              origin={{
                latitude: location.lat,
                longitude: location.lng
              }}
              destination={{
                latitude: place.geometry.location.lat,
                longitude: place.geometry.location.lng
              }}
              apikey={CONFIG.GOOGLE.API_KEY}
              strokeWidth={3}
              strokeColor="red"
              lineDashPattern={[0]}
              mode='WALKING'
            />
          }

          <Marker
            coordinate={{
              latitude: place.geometry.location.lat,
              longitude: place.geometry.location.lng
            }}
            title={place.name}
            description={place.vicinity}
          />
        </MapView>
      }
    </View>
  )
}

export default Map
