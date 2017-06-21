/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import RewriteTheSentenceQuestion from "./rewriteTheSentence.js";
import FillInTheBlanksQuestion from "./fillInTheblanks.js";
import React, {Component} from "react";
import {AppRegistry, StyleSheet, Text, View, StatusBar} from "react-native";

const rewriteTheSentencedata = {
    body: "A dog is cute.",
    answer: ["dogs", "are", "cute"],
    choices: [
        ["dogs", "dog", "a"],
        ["is", "are", "cute"],
        ["cutes", "a", "cute"]
    ]
};

const fillInTheBlanksedata = {
    // body: ["<?>", " dog is cute."],
    body: [
        {
            text: "<?>",
            isBlank: true,
            blankIndex: 0
        },
        {
            text: " dog is cute.",
            isBlank: false
        }
    ],
    answer: ["a"],
    choices: [
        [{
            text: "a",
            correct: true,
            index: 0
        },
        {
            text: "an",
            correct: false,
            index: 0
        },
        {
            text: "some",
            correct: false,
            index: 0
        }]
    ],
    blankToken: '<?>'
};

export default class ProdigyReactNativePoc extends Component {
    render() {
        return (
            <View style={styles.container}>
                <StatusBar hidden={true}/>
                <RewriteTheSentenceQuestion body={rewriteTheSentencedata.body} answer={rewriteTheSentencedata.answer} choices={rewriteTheSentencedata.choices}/>
                {/*<FillInTheBlanksQuestion body={fillInTheBlanksedata.body} answer={fillInTheBlanksedata.answer} choices={fillInTheBlanksedata.choices} blankToken={fillInTheBlanksedata.blankToken}/>*/}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        // backgroundColor:'rgba(118, 113, 213, 0.9)',
        // backgroundColor: '#F5FCFF',
        backgroundColor: '#FAF8F4'
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
