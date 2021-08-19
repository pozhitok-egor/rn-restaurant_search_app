import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { getStars, OpenURL } from '../core/utils'

export interface IReview {
  id: string,
  rating: number,
  user: {
    id: string,
    profile_url: string,
    image_url: string,
    name: string
  },
  text: string,
  time_created: string,
  url: string
}


const Review = ({data}: {data: IReview}) => {
  const { rating, user, text, time_created } = data
  return (
    <View  style={{flexDirection: 'row', marginTop: 10, marginBottom: 20}}>
      <View style={{width: 110, alignItems: 'center'}}>
        <Image style={{ width: 60, height: 60, borderRadius: 50 }} source={user.image_url ? {uri: user.image_url} : require('../../assets/default_image.png')}/>
        <TouchableOpacity style={{flexWrap: 'wrap', maxWidth: 100}} onPress={() => OpenURL(user.profile_url)}>
          <Text style={{marginTop: 5, fontWeight: 'bold', textDecorationLine: 'underline', maxWidth: 100, textAlign: 'center'}}>{user.name}</Text>
        </TouchableOpacity>
        <View style={{marginTop: 5, flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{marginRight: 5}}>{rating}</Text>
          {getStars(rating)}
        </View>
      </View>
      <View style={{flex: 1, marginLeft: 10}}>
        <Text style={{marginTop: -5}}>{text}</Text>
        <TouchableOpacity style={{marginTop: 1}} onPress={() => OpenURL(user.profile_url)}>
          <Text style={{fontWeight: 'bold', textDecorationLine: 'underline'}}>{time_created}</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Review

const styles = StyleSheet.create({})
