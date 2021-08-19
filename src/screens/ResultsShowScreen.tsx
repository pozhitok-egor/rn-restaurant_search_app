import { FontAwesome5 } from '@expo/vector-icons';
import React, { useEffect, useReducer, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, FlatList, ScrollView } from 'react-native'
import yelp from '../api/yelp';
import { Props, resultsAction, resultState } from '../core/types/result';
import { getStars } from '../core/utils';
import Review, { IReview } from '../Components/Review';
import Map from '../Components/Map';

const reducer = (state: resultState, action: resultsAction ): resultState => {
  switch(action.type) {
    case 'SET_DATA':
      return { ...state, data: action.payload, loading: false, error: null }
    case 'SET_LOADING':
      return { ...state, data: null, loading: true, error: null }
    case 'SET_ERROR':
      return { ...state, data: null, loading: false, error: action.payload }
    default:
      return state
  }
};

const ResultsShowScreen = ({ route, navigation }: Props) => {
  const [result, dispatch] = useReducer(reducer, { data: null, loading: false, error: null });
  const [reviews, setReviews] = useState<Array<IReview>>([])
  const id = route.params.id;

  const getResult = async (id: string) => {
    dispatch({type:'SET_LOADING'})
    try {
      const placeResponse = await yelp.get(`/${id}`);
      dispatch({type:'SET_DATA', payload: placeResponse.data})
      navigation.setOptions({headerTintColor: '#FFFFFF'})
    } catch (error) {
      dispatch({type:'SET_ERROR', payload: error.message})
    }
    try {
      const reviewsResponse = await yelp.get(`/${id}/reviews?locale=pl_PL`);
      setReviews(reviewsResponse.data.reviews)
    } catch(error) {
    }
  }

  const price = new Array(4).fill('#bbb')
  result.data?.price && price.splice(0, result.data.price.length, ...Array(result.data.price.length).fill('white'))

  useEffect(() => {
    getResult(id)
  }, [])

  return (
    <>
      { result.loading ?
        <Text style={{flex: 1, textAlignVertical: 'center', textAlign: 'center'}}>
          Loading...
        </Text> : null }
      { result.error ? <Text style={{flex: 1, textAlignVertical: 'center', textAlign: 'center', color: '#ff3333'}}>{result.error}</Text> : null }
      { result.data ?
        <>
          <View style={styles.background}>
            <Image style={styles.backgroundImage} source={result.data.image_url ?{uri: result.data.image_url} : require('../../assets/default_image.png')}/>
            <View style={styles.darkerBackground}/>
            <View style={styles.backgroundTextView}>
              <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>{result.data.name}</Text>
              <Text style={styles.backgroundText}>{result.data.location.country}, {result.data.location.state}, {result.data.location.city}, {result.data.location.address1} </Text>
              <View style={styles.priceView}>
                { result.data.price ?
                  price.map(((color, index) =>
                    <Text key={index} style={{...styles.backgroundText, marginRight: 5}}>
                      <FontAwesome5
                        name='dollar-sign'
                        color={color}
                      />
                    </Text>
                  ))
                  : null
                }
              </View>
            </View>
          </View>
          <View style={{ flex:1, backgroundColor: 'white', marginTop: -30, borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 20}}>
            <ScrollView>
              <View style={styles.tagsView}>
                { result.data.categories?.length > 0 ?
                  result.data.categories.map((value, index) =>
                    <TouchableOpacity key={index} style={{...styles.tagStyle}}>
                      <Text>{value.title}</Text>
                    </TouchableOpacity>
                  )
                  : null
                }
              </View>
              { result.data.photos.length > 0 ?
                <FlatList
                  style={{ maxHeight: 220 }}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={ restaurant => restaurant }
                  data={result.data.photos}
                  renderItem={({ item }) =>
                    <Image
                      style={{
                        borderRadius: 20,
                        marginBottom: 10,
                        marginRight: 20,
                        width: 300,
                        height: 200,
                      }}
                      source={{uri: item}}
                    />
                  }
                />
                : null
              }
              <Map result={result.data}/>
              <View style={{flexDirection: 'row', marginTop: 10, alignItems: 'center'}}>
                {getStars(result.data.rating, {fontSize: 15, marginRight: 2})}
                <Text style={{marginLeft: 10}}>{result.data.rating}</Text>
                <Text style={{marginLeft: 5}}>({result.data.review_count})</Text>
              </View>
              <View>
                {reviews.length > 0 ?
                  reviews.map((review, index) =>
                    <Review data={review} key={index}/>
                  )
                  : null
                }
              </View>
            </ScrollView>
          </View>
        </>
        : null
      }
    </>
  )
}

export default ResultsShowScreen

const styles = StyleSheet.create({
  background: {
    position: 'relative',
  },
  backgroundImage: {
    width: '100%',
    height: 330,
  },
  darkerBackground: {
    position: 'absolute',
    width: '100%',
    height: 330,
    top: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,.5)'
  },
  backgroundTextView: {
    position: 'absolute',
    bottom: 50,
    left: 20
  },
  priceView: {
    marginTop: 5,
    flexDirection: 'row'
  },
  backgroundText: {
    fontSize: 16,
    color: 'white',
  },
  tagsView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10
  },
  tagStyle: {
    marginRight: 10,
    padding: 10,
    backgroundColor: '#eee',
    borderRadius: 20
  }
})
