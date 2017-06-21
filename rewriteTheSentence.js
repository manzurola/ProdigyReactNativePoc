/**
 * Created by guym on 05/06/2017.
 */
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
    render() {
        return (
            <TouchableHighlight style={styles.choiceButton} onPress={this.props.onPress}>
                <Text
                    style={{textAlign:'center',  fontSize:32}}>{this.props.text}</Text>
            </TouchableHighlight>
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

export default class RewriteTheSentenceQuestion extends Component {
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

    deleteLastWordInAnswer() {
        console.log("delete last word in answer");
        this.setState((previousState) => {
            previousState.answer.pop();
            return {
                answer: previousState.answer
            }
        });
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
            <View style={{ flex:1,flexDirection: 'column'}}>
                <View style={{
                    flex: 0.1,
                    justifyContent: 'center',
                    borderBottomWidth: 0.5,
                    backgroundColor:'rgba(118, 113, 213, 0.9)',
                    /*shadowRadius:50,
                    shadowOpacity: 1.0,
                    shadowColor: 'black',
                    shadowOffset: {width: -10, height: -10}*/
                }}>
                    <Text style={styles.bodyText}>{this.props.body}</Text>
                </View>
                <TouchableWithoutFeedback onPress={() => this.deleteLastWordInAnswer}>
                    <View style={{
                        flex: 0.1,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderBottomWidth: 1
                    }}><Answer words={this.state.answer} answerKey={this.props.answer}
                               showResult={this.state.complete}/>
                    </View>
                </TouchableWithoutFeedback>
                <View style={{flex: 0.1,flexDirection:'column',justifyContent: 'center'}}>
                    <Choice text={this.props.choices[this.state.index][0]} onPress={() => this.onChoice(0)}/>
                    <Choice text={this.props.choices[this.state.index][1]} onPress={() => this.onChoice(1)}/>
                    <Choice text={this.props.choices[this.state.index][2]} onPress={() => this.onChoice(2)}/>
                    <TouchableHighlight style={[styles.choiceButton, {backgroundColor: 'black'}]}>
                        <Text style={{fontFamily:'TheKingsoftheHouse-Regular', textAlign:'center', color:'white'}}
                              onPress={() => this.skipQuestion}>Skip Question</Text>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    bodyText: {
        // fontFamily: 'TheKingsoftheHouse-Regular',
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
        borderTopWidth: 1,
        borderBottomWidth: 1,
        justifyContent: 'center',
        shadowRadius: 10,
        shadowColor: 'black',
        shadowOffset: {width: -10, height: -10}
    }
});