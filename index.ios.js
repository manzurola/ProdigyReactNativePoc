/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import FillInTheBlanksQuestion from "./fillInTheblanks.js";
import RewriteTheSentenceQuestion from "./rewriteTheSentence.js";
import QuestionDeck from "./questiondeck.js";
import Game from "./game.js";
import QuestionDeckSwiper from "./questiondeckswiper.js";
import QuestionDeckSwipeCard from "./questiondeckswipecards.js";
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

const rewriteTheSentencedata2 = {
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
};

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
                {/*<QuestionDeckSwipeCard data={GameQuestionData}/>*/}
                {/*<QuestionDeckSwiper questions={GameQuestionData}/>*/}
                {/*<QuestionDeck data={GameQuestionData}/>*/}
                <Game questions={GameQuestionData}/>
                {/*<View style={styles.questionContainer}>*/}
                    {/*/!*<QuestionDeck/>*!/*/}
                    {/*<RewriteTheSentenceQuestion bodyContainer={rewriteTheSentencedata2.bodyContainer} answer={rewriteTheSentencedata2.answer} choices={rewriteTheSentencedata2.choices}/>*/}
                    {/*/!*<FillInTheBlanksQuestion bodyContainer={fillInTheBlanksedata.bodyContainer} answer={fillInTheBlanksedata.answer}*!/*/}
                                             {/*/!*choices={fillInTheBlanksedata.choices}*!/*/}
                                             {/*/!*blankToken={fillInTheBlanksedata.blankToken}/>*!/*/}
                {/*</View>*/}
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
