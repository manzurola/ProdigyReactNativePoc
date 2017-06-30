/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import Game from "./game.js";
import React, {Component} from "react";
import {AppRegistry, StyleSheet, Text, View, StatusBar} from "react-native";

const GameQuestionData = [
    {
        instructions: "fill in the blanks",
        body: "Will you have ___ more tea?",
        answer: ["some"],
        choices: [
            ["any", "some", "a"],
        ]
    },
    {
        instructions: "fill in the blanks",
        body: "I ___ you for a long time.",
        answer: ["haven't seen"],
        choices: [
            ["did not see", "haven't seen", "didn't saw"],
        ]
    },
    {
        instructions: "fill in the blanks",
        body: "He ___ here since Christmas; I wonder where he ___ since then.",
        answer: ["hasn't been, has lived"],
        choices: [
            ["hasn't been / has lived", "wasn't / lived", "hasn't be / has live"]
        ]
    },
    {
        instructions: "rewrite the sentence into the plural",
        body: "A dog is cute.",
        answer: ["dogs", "are", "cute"],
        choices: [
            ["dogs", "dog", "a"],
            ["is", "are", "cute"],
            ["cutes", "a", "cute"]
            ]
    },
    {
        instructions: "rewrite the sentence into the plural",
        body: "Exercises are not always easy for beginners.",
        answer: ["an", "exercise", "is", "not", "always", "easy", "for", "a", "beginner"],
        choices: [
            ["exercise", "a", "an"],
            ["is", "are", "exercise"],
            ["is", "not", "are"],
            ["always", "not", "isn't"],
            ["is", "easy", "always"],
            ["easy", "for", "always"],
            ["beginners", "for", "beginner"],
            ["a", "beginners", "beginner"],
            ["beginners", "beginner", ""]
        ]
    }
];

const fillInTheBlanksedata = {
    // bodyContainer: ["<?>", " dog is cute."],
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
        ["a", "an", "some"]
    ],
    blankToken: '<?>'
};

export default class ProdigyReactNativePoc extends Component {
    render() {
        return (
            <View style={styles.container}>
                <StatusBar hidden={true}/>
                <Game questions={GameQuestionData}/>
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
    questionContainer: {
        flex: 0.8
    },
    header: {
        flex: 0.1
    },
    footer: {
        flex: 0.1
    }
});

AppRegistry.registerComponent('ProdigyReactNativePoc', () => ProdigyReactNativePoc);
