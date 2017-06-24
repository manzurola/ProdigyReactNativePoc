/**
 * Created by guym on 23/06/2017.
 */
import React, {Component} from "react";
import {SwipeDeck, Card} from "react-native-elements";
import RewriteTheSentenceQuestion from "./rewriteTheSentence.js";
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    ScrollView,
    ListView,
    TouchableHighlight,
    TouchableWithoutFeedback
} from "react-native"

const DATA = [
    {
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
    },
    {
        body: "XXX Exercises are not always easy for beginners.",
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

export default class QuestionDeck extends Component {

    render() {
        return (
            <SwipeDeck data={DATA}
                       renderCard={this.renderQuestion}
                       renderNoMoreCards={this.renderNoMoreCards}
                       onSwipeRight={this.onSwipeRight}
                       onSwipeLeft={this.onSwipeLeft}/>
        );
    }

    renderQuestion(question) {
        return (
            <Card>
            <RewriteTheSentenceQuestion body={question.body}
                                        answer={question.answer}
                                        choices={question.choices}/>
            </Card>
        );
    }

    onSwipeRight(card) {
        console.log('Card liked: ' + card.text);
    }

    onSwipeLeft(card) {
        console.log('Card disliked: ' + card.text);
    }
}
