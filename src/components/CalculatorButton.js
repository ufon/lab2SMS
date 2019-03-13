import React, { Component } from "react";
import { TouchableHighlight, Text, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  inputButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 0.5,
    borderColor: "#A6C4E0"
  },

  inputButtonHighlighted: {
    backgroundColor: "#A6C4E0"
  },

  inputButtonText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white"
  }
});

export default class CalculatorButton extends Component {
  render() {
    return (
      <TouchableHighlight
        style={[
          styles.inputButton,
          this.props.highlight ? styles.inputButtonHighlighted : null
        ]}
        underlayColor="#A6C4E0"
        onPress={this.props.onPress}
      >
        <Text style={styles.inputButtonText}>{this.props.value}</Text>
      </TouchableHighlight>
    );
  }
}
