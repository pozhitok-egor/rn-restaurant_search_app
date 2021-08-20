import {FontAwesome5} from "@expo/vector-icons";
import React, {useEffect, useReducer, useState} from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  ScrollView,
} from "react-native";
import yelp from "../api/yelp";
import {Props, resultsAction, resultState} from "../core/types/result";
import {getStars} from "../core/utils";
import Review from "../Components/Review";
import Map from "../Components/Map";
import google, {getPhoto} from "../api/google";
import {PlaceReview} from "../core/types/Place";

const reducer = (state: resultState, action: resultsAction): resultState => {
  switch (action.type) {
    case "SET_DATA":
      return {
        ...state,
        data: {...state.data, ...action.payload},
        loading: false,
        error: null,
      };
    case "SET_LOADING":
      return {...state, data: state.data, loading: true, error: null};
    case "SET_ERROR":
      return {...state, data: null, loading: false, error: action.payload};
    default:
      return state;
  }
};

const placesShowScreen = ({route, navigation}: Props) => {
  const [place, dispatch] = useReducer(reducer, {
    data: {...route.params.place},
    loading: false,
    error: null,
  });

  const image_url = getPhoto(
    place.data && place.data.photos && place.data.photos[0]
      ? place.data.photos[0].photo_reference
      : ""
  );

  const getplace = async () => {
    dispatch({type: "SET_LOADING"});
    try {
      const placeResponse = await google.get("/details/json", {
        params: {
          place_id: place.data?.place_id,
          fields: "photos,opening_hours,reviews",
        },
      });
      dispatch({type: "SET_DATA", payload: placeResponse.data.result});
      navigation.setOptions({headerTintColor: "#FFFFFF"});
    } catch (error) {
      dispatch({type: "SET_ERROR", payload: error.message});
    }
  };

  const price = new Array(4).fill("#bbb");
  place.data?.price_level &&
    price.splice(
      0,
      place.data.price_level,
      ...Array(place.data.price_level).fill("white")
    );

  useEffect(() => {
    getplace();
  }, []);

  return (
    <>
      {place.loading ? (
        <Text
          style={{flex: 1, textAlignVertical: "center", textAlign: "center"}}
        >
          Loading...
        </Text>
      ) : place.error ? (
        <Text
          style={{
            flex: 1,
            textAlignVertical: "center",
            textAlign: "center",
            color: "#ff3333",
          }}
        >
          {place.error}
        </Text>
      ) : place.data ? (
        <>
          <View style={styles.background}>
            <Image
              style={styles.backgroundImage}
              source={
                image_url
                  ? {uri: image_url}
                  : require("../../assets/default_image.png")
              }
            />
            <View style={styles.darkerBackground} />
            <View style={styles.backgroundTextView}>
              <Text style={{color: "white", fontSize: 20, fontWeight: "bold"}}>
                {place.data.name}
              </Text>
              <Text style={styles.backgroundText}>
                {place.data.vicinity &&
                  place.data.vicinity
                    .split(" ")
                    .map((val: string, index: number) => {
                      return (
                        <Text style={{marginRight: 5}} key={index}>
                          {val}
                        </Text>
                      );
                    })}
              </Text>
              <View style={styles.priceView}>
                {place.data.price_level
                  ? price.map((color, index) => (
                      <Text
                        key={index}
                        style={{...styles.backgroundText, marginRight: 5}}
                      >
                        <FontAwesome5 name="dollar-sign" color={color} />
                      </Text>
                    ))
                  : null}
              </View>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              backgroundColor: "white",
              marginTop: -30,
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
              padding: 20,
            }}
          >
            <ScrollView>
              <View style={styles.tagsView}>
                {place.data.types && place.data.types.length > 0
                  ? place.data.types.map((value: string, index: number) => (
                      <TouchableOpacity
                        key={index}
                        style={{...styles.tagStyle}}
                      >
                        <Text>{value}</Text>
                      </TouchableOpacity>
                    ))
                  : null}
              </View>
              {place.data.photos && place.data.photos.length > 0 ? (
                <FlatList
                  style={{maxHeight: 220}}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={(photo) => photo.photo_reference}
                  data={place.data.photos}
                  renderItem={({item}) => (
                    <Image
                      style={{
                        borderRadius: 20,
                        marginBottom: 10,
                        marginRight: 20,
                        width: 300,
                        height: 200,
                      }}
                      source={{uri: getPhoto(item.photo_reference)}}
                    />
                  )}
                />
              ) : null}
              <Map place={place.data} location={route.params.userLocation}/>
              {place.data.rating && place.data.user_ratings_total && (
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 10,
                    alignItems: "center",
                  }}
                >
                  {getStars(place.data.rating, {fontSize: 15, marginRight: 2})}
                  <Text style={{marginLeft: 10}}>{place.data.rating}</Text>
                  <Text style={{marginLeft: 5}}>
                    ({place.data.user_ratings_total})
                  </Text>
                </View>
              )}
              {place.data.reviews && (
                <View>
                  {place.data.reviews.length > 0
                    ? place.data.reviews.map(
                        (review: PlaceReview, index: number) => (
                          <Review data={review} key={index} />
                        )
                      )
                    : null}
                </View>
              )}
            </ScrollView>
          </View>
        </>
      ) : null}
    </>
  );
};

export default placesShowScreen;

const styles = StyleSheet.create({
  background: {
    position: "relative",
  },
  backgroundImage: {
    width: "100%",
    height: 330,
  },
  darkerBackground: {
    position: "absolute",
    width: "100%",
    height: 330,
    top: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,.5)",
  },
  backgroundTextView: {
    position: "absolute",
    bottom: 50,
    left: 20,
  },
  priceView: {
    marginTop: 5,
    flexDirection: "row",
  },
  backgroundText: {
    fontSize: 16,
    color: "white",
  },
  tagsView: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 10,
  },
  tagStyle: {
    marginRight: 10,
    padding: 10,
    backgroundColor: "#eee",
    borderRadius: 20,
  },
});
