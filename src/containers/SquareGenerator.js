import React, { Component } from "react";
import {
  View,
  Dimensions,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Square from "../components/UI/Square";
import now from "performance-now";
import { AsyncStorage } from "react-native";

class SquareGenerator extends Component {
  state = {
    topDistance: 100,
    leftDistance: 100,
    startTimer: true,
    points: 0,
    timeTaken: 0,
    timeStart: 0,
    rounds: 0,
    splat: false,
  };
  componentDidMount() {
    global.width = Dimensions.get("window").width - 100; //486/1536
    global.height = Dimensions.get("window").height - 100;
    console.log(height);
  }

  onKillBug = () => {
    let newPoints = this.state.points + 1;
    let endTime = now();

    let timeTaken = ((endTime - this.state.timeStart) / 1000).toFixed(2);

    this.setState({
      splat: true,
      startTimer: true, //on click will end the timer and stop showing the square
      points: newPoints,
      timeStart: 0,
      timeTaken: timeTaken,

      //   topDistance: Math.random() * 301,
      //  leftDistance: Math.random() * 301,
    });
    // setTimeout(()=>{this.setState({splat:false})}, 1000);
  };

  onTimeout = () => {
    let newRounds = this.state.rounds + 1;
    this.setState({
      rounds: newRounds,
      timeStart: now(),
      startTimer: true,
      splat: false,
      topDistance: Math.random() * height,
      leftDistance: Math.random() * width,
    });
  };

  render() {
    if (this.state.startTimer) {
      setTimeout(this.onTimeout, 4000);
    }
    if (this.state.rounds === 10) {
      this.props.endGameHandler(this.state.points);
    }
    // this._storeData()
    // this._retrieveData()

    return (
      <View>
        <View style={styles.button}>
          <TouchableOpacity
            onPress={() => this.props.endGameHandler(this.state.points)}
          >
            <Text style={styles.text}>EXIT</Text>
          </TouchableOpacity>
        </View>
        <Text style={{ fontSize: 17 }}>
          Score: {this.state.points}, Time Taken: {this.state.timeTaken}s,
          Rounds:{this.state.rounds}
        </Text>

        {this.state.startTimer ? (
          <Square
            onPress={this.onKillBug}
            topDistance={this.state.topDistance}
            leftDistance={this.state.leftDistance}
            color={this.state.color}
            splat={this.state.splat}
          />
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  button: {
    position: "absolute",
    backgroundColor: "red",
    top: "0",
    right: "0",
    textAlign: "center",
    padding: 10,
  },
  text: {
    color: "white",
    fontSize: 15,
  },
});

export default SquareGenerator;
