/**
 * Created by guym on 27/06/2017.
 */
import RewriteTheSentenceQuestion from "./rewriteTheSentence.js";
import Swiper from "react-native-deck-swiper";
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
    TouchableWithoutFeedback,
    Button
} from "react-native";


export default class QuestionDeckSwiper extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Swiper
                    cards={this.props.questions}
                    renderCard={this.renderQuestion}
                    onSwiped={(cardIndex) => {console.log(cardIndex)}}
                    onSwipedAll={() => {console.log('onSwipedAll')}}
                    cardIndex={0}
                    backgroundColor={'#4FD0E9'}>
                    <Button
                        onPress={() => {console.log('oulala')}}
                        title="Press me">
                        You can press me
                    </Button>
                </Swiper>
            </View>
        )
    }

    renderQuestion(question) {
        return (
            <View style={styles.card}>
                <RewriteTheSentenceQuestion body={question.body}
                                            answer={question.answer}
                                            choices={question.choices}/>
            </View>
        );
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