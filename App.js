import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  AsyncStorage,
} from "react-native";
import SquareGenerator from "./src/containers/SquareGenerator";
class App extends Component {
  state = {
    startGame: false,
    points: 0,
  };
  

  onEndGameHandler = (points) => {
    if (this.state.points < points) {
      this.setState({ startGame: false, points: points });
      console.log(this.state.points);
      this._storeData(points);
    } else {
      this.setState({ startGame: false });
    }
  };
  _storeData = async (points) => {
    try {
      await AsyncStorage.setItem("highscore", points);
    } catch (error) {
      // Error saving data
    }
    console.log(this.state.points);
  };

  componentDidMount() {
    this._retrieveData();
  }
  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("highscore");
      if (value !== null) {
        // We have data!!
        this.setState({ points: value });
      }
    } catch (error) {
      // Error retrieving data
    }
  };
  render() {
    return (
      <View style={styles.container}>
        {!this.state.startGame ? (
          <View>
            <View style={styles.button}>
              <TouchableOpacity
                startGame={this.state.startGame}
                onPress={() => {
                  this.setState({ startGame: true });
                }}
              >
                <Text style={styles.start}>START</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.highScore}>
              <Text style={styles.highScoretext}>
                High Score: {this.state.points}
              </Text>
            </View>
          </View>
        ) : null}
        {this.state.startGame ? (
          <View>
            <SquareGenerator
              startGame={this.state.startGame}
              endGameHandler={this.onEndGameHandler}
            />
          </View>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    display: "table",
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
  },
  button: {
    position: "absolute",
    top: "100%",
    left: "25%",
    backgroundColor: "green",

    textAlign: "center",
    padding: 10,
    display: "table-cell",
    verticalAlign: "middle",
  },
  start: {
    color: "white",
    fontSize: 60,
  },
  highScore: {
    position: "relative",
    top: 200,
  },
  highScoretext: {
    fontSize: 50,
    textAlign: "center",
  },
});

export default App;
