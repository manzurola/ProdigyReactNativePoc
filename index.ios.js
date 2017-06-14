/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import TransformationQuestion from './prodigy.js';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

const data = {
    body: "A dog is cute.",
    answer: ["dogs", "are", "cute"],
    choices: [
        ["dogs", "dog", "a", ""],
        ["", "are", "cute", ""],
        ["", "", "cute", ""]
    ]
};

export default class ProdigyReactNativePoc extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TransformationQuestion body={data.body} answer={data.answer} choices={data.choices}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('ProdigyReactNativePoc', () => ProdigyReactNativePoc);
