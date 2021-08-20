import React from "react";
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {FontAwesome5} from "@expo/vector-icons";
import {AntDesign} from "@expo/vector-icons";
import {distance, metersToTime} from "../core/utils";
import {IPlace} from "../core/types/Place";
import {ILocation} from "../hooks/useResults";
import {getPhoto} from "../api/google";

interface IProps extends IPlace {
  navigator: () => void;
  userLocation: ILocation;
}

const Place = (props: IProps) => {
  const {
    name,
    rating,
    geometry,
    vicinity,
    photos,
    place_id,
    user_ratings_total,
    price_level,
    opening_hours,
    navigator,
  } = props;

  const {lat, lng} = props.userLocation;

  const image_url = getPhoto(
    photos && photos[0] ? photos[0].photo_reference : ""
  );

  const prices = new Array(4).fill("gray");
  if (price_level)
    prices.splice(0, price_level, ...Array(price_level).fill("black"));

  return (
    <TouchableOpacity
      onPress={navigator}
      style={styles.background}
    >
      <View style={styles.imageViewStyle}>
        <Image
          style={styles.imageStyle}
          source={
            image_url
              ? {uri: image_url}
              : require("../../assets/default_image.png")
          }
        />
        <View style={styles.walkViewStyle}>
          <FontAwesome5 name="walking" style={styles.walkText} />
          <Text style={styles.walkText}>
            ~
            {geometry &&
              metersToTime(
                distance(
                  lat,
                  lng,
                  geometry?.location.lat,
                  geometry?.location.lng
                )
              )}
          </Text>
          <Text
            style={
              opening_hours?.open_now
                ? styles.closedTextStyle
                : styles.openedTextStyle
            }
          >
            {opening_hours?.open_now ? "Closed" : "Opened"}
          </Text>
        </View>
      </View>
      <Text style={styles.titleStyle}>{name}</Text>
      <View style={styles.information}>
        <AntDesign style={styles.textStyle} name="star" color="gold" />
        <Text style={styles.textStyle}>{rating}</Text>
        <Text style={styles.textStyle}>({user_ratings_total})</Text>
        <View style={styles.priceViewStyle}>
          {prices &&
            prices.map((color, index) => (
              <FontAwesome5
                style={styles.priceStyle}
                name="dollar-sign"
                color={color}
                key={index}
              />
            ))}
        </View>
        <View style={styles.addressView}>
          {vicinity &&
            vicinity.split(" ").map((val, index) => {
              return (
                <Text style={{marginRight: 5}} key={index}>
                  {val}
                </Text>
              );
            })}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Place;

const styles = StyleSheet.create({
  background: {
    margin: 10,
  },
  imageViewStyle: {
    position: "relative",
  },
  imageStyle: {
    width: "100%",
    borderRadius: 20,
    height: 230,
  },
  walkViewStyle: {
    position: "absolute",
    bottom: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: "rgba(0,0,0,.7)",
  },
  walkText: {
    fontSize: 14,
    color: "white",
    margin: 5,
  },
  titleStyle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  information: {
    flexDirection: "row",
    alignItems: "center",
  },
  textStyle: {
    fontSize: 14,
    marginRight: 10,
  },
  priceViewStyle: {
    flexDirection: "row",
  },
  priceStyle: {
    fontSize: 14,
    marginHorizontal: 1,
  },
  closedTextStyle: {
    color: "#ff3333",
    margin: 5,
  },
  openedTextStyle: {
    color: "#33ff33",
    margin: 5,
  },
  addressView: {
    flex: 1,
    justifyContent: "flex-end",
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
