import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Image,
} from "react-native";

const styles = (props) =>
  StyleSheet.create({
    square: {
      position: "absolute",

      width: 80,
      height: 80,
      backgroundColor: "white",
      top: props.topDistance,
      left: props.leftDistance,
    },
  });
const Square = (props) => {
  return (
    <TouchableWithoutFeedback onPress={props.onPress}>
      {!props.splat ? (
        <Image
          style={styles(props).square}
          source={require("./imgs/bug.jpg")}
        />
      ) : (
        <Image
          style={styles(props).square}
          source={require("./imgs/splat.jpg")}
        />
      )}
    </TouchableWithoutFeedback>
  );
};

export default Square;
