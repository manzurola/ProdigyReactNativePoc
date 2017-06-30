/**
 * Created by guym on 27/06/2017.
 */
import SwipeCards from 'react-native-swipe-cards';
import RewriteTheSentenceQuestion from "./question.js";
import React, {Component} from "react";
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
    TouchableWithoutFeedback,
    Button
} from "react-native";

class Card extends Component {
    render() {
        return (
            <View style={[styles.card, {backgroundColor: this.props.backgroundColor}]}>
                <Question body={this.props.body}
                          answer={this.props.answer}
                          choices={this.props.choices}/>
            </View>
        )
    };
}

export default class QuestionDeckSwipeCards extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: this.props.data
        }
    }
    handleYup (card) {
        console.log(`Yup for ${card.text}`)
    }
    handleNope (card) {
        console.log(`Nope for ${card.text}`)
    }
    render() {
        return (
            <SwipeCards
                cards={this.state.cards}

                renderCard={(cardData) => <Card {...cardData} />}
                renderNoMoreCards={() => <NoMoreCards />}

                handleYup={this.handleYup}
                handleNope={this.handleNope}
            />
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF'
    },
    card: {
        flex: 1,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: '#E8E8E8',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    text: {
        textAlign: 'center',
        fontSize: 50,
        backgroundColor: 'transparent'
    }
})