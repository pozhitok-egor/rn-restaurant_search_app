import React, { ReactElement } from 'react'
import { FontAwesome } from "@expo/vector-icons";
import { Alert, Linking, Text, View } from "react-native";
import { StyleProp, TextStyle } from "react-native";

export const metersToTime = (meters: number): string => {
  const timestamp = meters/1.2
  const days = Math.floor(timestamp / 60 / 60 / 24);
  const hours = Math.floor(timestamp / 60 / 60);
  const minutes = Math.ceil(timestamp / 60) - (hours * 60);

  const output = []
  if (days > 0)
    output.push(days + 'days')
  if (hours > 0)
    output.push(hours + 'h')
  output.push(minutes + 'min')

  return output.join(' ');
}

export const distance = (latA: number, longA: number, latB: number, longB: number): number => {
  const d2r = Math.PI / 180;

  const dlong = (longA - longB) * d2r;
  const dlat = (latA - latB) * d2r;
  const a = Math.pow(Math.sin(dlat / 2.0), 2)
      + Math.cos(latB * d2r) * Math.cos(latA * d2r)
      * Math.pow(Math.sin(dlong / 2.0), 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return 6367 * c * 1000;
}

export const getStars = (rating: number, style?: StyleProp<TextStyle>, color?: string): ReactElement => {
  const stars = new Array(5).fill('star-o')
  const fullStars = Math.trunc(rating)
  const halfStar = rating - fullStars >= 0.5 ? true : false;

  stars.splice(0, fullStars, ...Array(fullStars).fill('star'))
  halfStar && stars.splice(fullStars, 1, 'star-half-o')

  return <View style={{flexDirection: 'row'}}>
    {
      stars.map((name, index) =>
        <FontAwesome
          key={index}
          style={style || {marginRight: 5}}
          name='star'
          color={color || 'gold'}
        />
      )
    }
  </View>
}

export const OpenURL = async (url:string) => {
  const supported = await Linking.canOpenURL(url);
  if (supported) {
    await Linking.openURL(url);
  } else {
    Alert.alert(`Don't know how to open this URL: ${url}`);
  }
};
