import React from "react";
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import { getPhoto } from "../api/google";
import {PlaceReview} from "../core/types/Place";
import {getStars, OpenURL} from "../core/utils";

const Review = ({data}: {data: PlaceReview}) => {
  const {time, rating, author_name, author_url, profile_photo_url, text } = data;

  const date = new Date(time*1000);

  return (
    <View style={{flexDirection: "row", marginTop: 10, marginBottom: 20}}>
      <View style={{width: 110, alignItems: "center"}}>
        <Image
          style={{width: 60, height: 60, borderRadius: 50}}
          source={
            profile_photo_url
              ? {uri: profile_photo_url}
              : require("../../assets/default_image.png")
          }
        />
        <TouchableOpacity
          style={{flexWrap: "wrap", maxWidth: 100}}
          onPress={() => author_url && OpenURL(author_url)}
        >
          <Text
            style={{
              marginTop: 5,
              fontWeight: "bold",
              textDecorationLine: "underline",
              maxWidth: 100,
              textAlign: "center",
            }}
          >
            {author_name}
          </Text>
        </TouchableOpacity>
        <View
          style={{marginTop: 5, flexDirection: "row", alignItems: "center"}}
        >
          <Text style={{marginRight: 5}}>{rating}</Text>
          {getStars(rating)}
        </View>
      </View>
      <View style={{flex: 1, marginLeft: 10}}>
        <Text style={{marginTop: -5}}>{text}</Text>
        <TouchableOpacity
          style={{marginTop: 1}}
          onPress={() => author_url && OpenURL(author_url)}
        >
          <Text style={{fontWeight: "bold", textDecorationLine: "underline"}}>
            {date.toLocaleString()}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Review;

const styles = StyleSheet.create({});
