/**
 * Created by guym on 05/06/2017.
 */
import React, {Component} from "react";
// import Icon from 'react-native-vector-icons/FontAwesome';
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


{/*const myIcon = (<Icon name="rocket" size={30} color="#900" />)*/}

class Blank extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <Text>{this.props.text}</Text>
            </View>
        )
    }
}

class Choice extends Component {
    constructor(props){
        super(props);
        console.log(props);
    }
    render() {
        return (
            <TouchableHighlight style={styles.choiceButton} onPress={this.props.onPress}>
                <Text
                    style={styles.choiceText}>{this.props.data.text}</Text>
            </TouchableHighlight>
        )
    }
}

class BodyAndAnswer extends Component {
    render() {
        let parts = [];
        for (let i = 0; i < this.props.body.length; i++) {
            let part = this.props.body[i];
            if (part.isBlank) {
                let choice = this.props.answer[part.blankIndex];
                let textValue;
                if (choice !== undefined) {
                    part = <Text style={styles.bodyText} key={i}>{choice.text}</Text>
                } else {
                    part = <Text style={styles.bodyText} key={i}>?</Text>
                }
            } else {
                part = <Text style={styles.bodyText} key={i}>{part.text}</Text>
            }
            parts.push(part);
        }
        return (
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                {parts}
            </View>
        )
    }
}

class Answer extends Component {
    render() {
        var view = [];
        for (let i = 0; i < this.props.words.length; i++) {
            let text;
            const word = this.props.words[i];
            const correct = word === this.props.answerKey[i];
            if (this.props.showResult) {
                if (correct) {
                    text = <Text style={[styles.answerWordText, {color:'green'}]} key={i}>{word}</Text>;
                } else {
                    text = <Text style={[styles.answerWordText, {color:'red'}]} key={i}>{word}</Text>;
                }
            } else {
                text = <Text style={styles.answerWordText} key={i}>{word}</Text>;
            }
            view.push(text);
        }
        return (
            <View
                style={{flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'center', alignContent:'space-between'}}>{view}</View>
        )
    }
}

export default class FillInTheBlanksQuestion extends Component {
    onChoice(selectedChoiceIndex) {
        if (this.state.complete) return;
        const selectedChoice = this.props.choices[this.state.index][selectedChoiceIndex];
        this.setState((previousState) => {
            previousState.answer.push(selectedChoice);
            // if current choice was last, question is complete
            const questionComplete = this.props.answer.length === this.state.answer.length;
            return {
                answer: previousState.answer,
                index: questionComplete ? previousState.index : previousState.index + 1,
                complete: questionComplete
            }
        });
    }

    skipQuestion() {
        console.log('TODO skip question');
    }

    // can control animation of new choices in answer using the current index

    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            answer: [],
            complete: false
        }
    }

    render() {
        return (
            <View style={{ flex:1,flexDirection: 'column', paddingBottom: 15, paddingTop: 15}}>
                <View style={{
                    flex: 0.2,
                    justifyContent: 'center',
                    borderWidth: 3,
                    backgroundColor:'rgba(118, 113, 213, 0.9)',
                    margin: 1,
                    borderRadius: 5,
                    shadowRadius:1,
                    shadowOpacity: 1.0,
                    shadowColor: 'black',
                    shadowOffset: {width: 0, height: 1}
                }}>
                    <BodyAndAnswer blankToken={this.props.blankToken} body={this.props.body} answer={this.state.answer}/>
                </View>
                <View style={{flex: 0.15,flexDirection:'column',justifyContent: 'center', backgroundColor:'black', paddingTop: 3, paddingBottom:3}}>
                    <Choice data={this.props.choices[this.state.index][0]} onPress={() => this.onChoice(0)}/>
                    <Choice data={this.props.choices[this.state.index][1]} onPress={() => this.onChoice(1)}/>
                    <Choice data={this.props.choices[this.state.index][2]} onPress={() => this.onChoice(2)}/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    bodyText: {
        fontFamily: 'TheKingsoftheHouse-Regular',
        fontSize: 28,
        textAlign: 'center',
        textShadowColor: "black",
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 1,
        textDecorationColor: 'black',
        color: "white",
        textDecorationStyle: 'solid'
    },
    answerWordText: {
        padding: 2,
        fontFamily: 'TheKingsoftheHouse-Regular',
        fontSize: 28,
        textAlign: 'center',
        // textShadowColor: "black",
        // textShadowOffset: {width: -1, height: -1},
        // textShadowRadius: 3,
        // textDecorationColor: 'black',
        color: "black",
        textDecorationStyle: 'solid'
    },
    choiceButton: {
        flex: 1,
        borderWidth: 3,
        justifyContent: 'center',
        shadowRadius: 3,
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 1.0,
        // marginTop: 5,
        // marginLeft:5,
        // marginRight:5,
        paddingTop: 15,
        paddingBottom: 15,
        backgroundColor:'rgba(118, 113, 213, 0.9)',
        borderRadius: 5
    },
    choiceText: {
        textShadowColor: "black",
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 1,
        textDecorationColor: 'black',
        color: "white",
        textDecorationStyle: 'solid',
        textAlign:'center',
        fontFamily:'TheKingsoftheHouse-Regular',
        fontSize:32
    }
});