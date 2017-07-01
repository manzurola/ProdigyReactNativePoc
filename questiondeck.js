/**
 * Created by guym on 23/06/2017.
 */
import STYLES from "./styles.js";
import React, {Component} from "react";
import Question from "./question.js";
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
} from "react-native";

export default class QuestionDeck extends Component {

    constructor(props) {
        super(props);
        console.log('QuestionDeck constructor, props:');
        console.log(props);
        this.state = {
            index: 0
        }
    }

    render() {
        console.log("questionDeck render");
        console.log(this.props);
        return (
            <View style={STYLES.questionDeck}>
                <Question {...this.props.data[this.state.index]} completed={(question) => {this.onQuestionCompleted(question)}}/>
            </View>
        );
    }

    onQuestionCompleted(question) {
        console.log('question completed');
        console.log(question);
    }

    onSwipeRight(card) {
        console.log('Card liked: ' + card.text);
    }

    onSwipeLeft(card) {
        console.log('Card disliked: ' + card.text);
    }

    swipeRight() {
        this.setState((previousState) => {
            return {
                index: previousState.index + 1
            }
        })
    }
};
