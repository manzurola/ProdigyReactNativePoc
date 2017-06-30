/**
 * Created by guym on 23/06/2017.
 */
import React, {Component} from "react";
import {SwipeDeck, Card} from "react-native-elements";
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

export default class QuestionDeck extends Component {

    render() {
        console.log("questionDeck render");
        console.log(this.props);
        return (
            <SwipeDeck data={this.props.data}
                       renderCard={() => {return <Card>{this.props.renderQuestion}</Card>}}
                       renderNoMoreCards={this.renderNoMoreCards}
                       onSwipeRight={this.onSwipeRight}
                       onSwipeLeft={this.onSwipeLeft}/>
        );
    }

    renderQuestionCard(renderQuestion) {
        return (
            <Card>{renderQuestion}</Card>
        )
    }

    onSwipeRight(card) {
        console.log('Card liked: ' + card.text);
    }

    onSwipeLeft(card) {
        console.log('Card disliked: ' + card.text);
    }
}
