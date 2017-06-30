/**
 * Created by guym on 27/06/2017.
 */
import Swiper from "react-native-deck-swiper";
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


export default class QuestionDeckSwiper extends Component {

    constructor(props) {
        super(props);
        console.log("QuestionDeckSwiper constructor:");
        console.log(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <Swiper
                    cards={this.props.data}
                    renderCard={this.props.renderQuestion}
                    onSwiped={(cardIndex) => {console.log(cardIndex)}}
                    onSwipedAll={() => {console.log('onSwipedAll')}}
                    cardIndex={0}
                    backgroundColor={'#4FD0E9'}>
                </Swiper>
            </View>
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