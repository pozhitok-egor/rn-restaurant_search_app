import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons'
import { metersToTime } from '../core/utils'

export interface IRestaurant {
  navigator: () => void;
  name: string;
  rating: number;
  price: string;
  id: string;
  review_count: number;
  image_url: string;
  distance: number;
  is_closed: boolean;
  location: { city: string, address1: string, zip_code: string, state: string }
}

const Restaurant = (props: IRestaurant) => {
  const { name, rating, price , id, review_count, image_url, distance, is_closed, navigator} = props

  const {city, address1} = props.location

  const prices = new Array(4).fill('gray')
  if (price)
    prices.splice(0, price.length, ...Array(price.length).fill('black'))

  return (
    <TouchableOpacity
      onPress={navigator}
      style={styles.background}
    >
      <View style={styles.imageViewStyle}>
        <Image
          source={image_url ? { uri: image_url } : require('../../assets/default_image.png')}
          style={styles.imageStyle}
        />
        <View style={styles.walkViewStyle}>
          <FontAwesome5 name='walking' style={styles.walkText} />
          <Text style={styles.walkText}>
            {metersToTime(distance)}
          </Text>
          <Text style={is_closed ? styles.closedTextStyle : styles.openedTextStyle}>
            {is_closed ? 'Closed' : 'Opened'}
          </Text>
        </View>
      </View>
      <Text style={styles.titleStyle}>
        {name}
      </Text>
      <View style={styles.information}>
        <AntDesign
          style={styles.textStyle}
          name='star'
          color='gold'
        />
        <Text style={styles.textStyle}>
          {rating}
        </Text>
        <Text style={styles.textStyle}>
          ({review_count})
        </Text>
        <View style={styles.priceViewStyle}>
          { prices && prices.map((color, index) =>
            <FontAwesome5
              style={styles.priceStyle}
              name='dollar-sign'
              color={color}
              key={index}
            />
          ) }
        </View>
        <View style={styles.addressView}>
          <Text>{city}, </Text>
          <Text>{address1}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default Restaurant

const styles = StyleSheet.create({
  background: {
    margin: 10,
  },
  imageViewStyle: {
    position: 'relative'
  },
  imageStyle: {
    width: '100%',
    borderRadius: 20,
    height: 230
  },
  walkViewStyle: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: 'rgba(0,0,0,.7)'
  },
  walkText: {
    fontSize: 14,
    color: 'white',
    margin: 5
  },
  titleStyle: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  information: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  textStyle: {
    fontSize: 14,
    marginRight: 10,
  },
  priceViewStyle: {
    flexDirection: 'row',
  },
  priceStyle: {
    fontSize: 14,
    marginHorizontal: 1
  },
  closedTextStyle: {
    color: '#ff3333',
    margin: 5
  },
  openedTextStyle: {
    color: '#33ff33',
    margin: 5
  },
  addressView: {
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
})
