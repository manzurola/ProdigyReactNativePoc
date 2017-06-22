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
    TouchableWithoutFeedback
} from "react-native";

class Choice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pressed: false
        }
    }

    render() {
        return (
            <TouchableHighlight activeOpacity={1}
                                style={this.state.pressed ? styles.choicePressed : styles.choice}
                                onPress={this.props.onPress}
                                onHideUnderlay={()=>{this.setState({pressed: false})}}
                                onShowUnderlay={()=>{this.setState({pressed: true})}}
            >
                <Text style={this.state.pressed ? styles.choiceTextPressed: styles.choiceText}>{this.props.text}</Text>
            </TouchableHighlight>
        )
    }
}

class Answer extends Component {
    render() {
        let view = [];
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
                <View style={styles.header}/>
                <View style={styles.body}>
                    <Text style={styles.bodyText}>{this.props.body}</Text>
                </View>
                <View style={styles.answer}>
                    <TouchableWithoutFeedback onPress={() => this.deleteLastWordInAnswer()}>
                        <View style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderWidth: 1,
                        borderRadius: 30,
                        minHeight: 50,
                        width: 300
                    }}><Answer words={this.state.answer} answerKey={this.props.answer}
                               showResult={this.state.complete}/>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                <View style={styles.choices}>
                    <Choice style={styles.choice} text={this.props.choices[this.state.index][0]}
                            onPress={() => this.onChoice(0)}/>
                    <Choice style={styles.choice} text={this.props.choices[this.state.index][1]}
                            onPress={() => this.onChoice(1)}/>
                    <Choice style={styles.choice} text={this.props.choices[this.state.index][2]}
                            onPress={() => this.onChoice(2)}/>
                </View>
                <View style={styles.footer}/>
            </View>
        );
    }

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
        if (this.state.index === 0 || this.state.complete) return;
        this.setState((previousState) => {
            previousState.answer.pop();
            return {
                answer: previousState.answer,
                index: previousState.index - 1
            }
        });
    }

    // can control animation of new choices in answer using the current index
}

const styles = StyleSheet.create({
    bodyText: {
        // fontFamily: 'TheKingsoftheHouse-Regular',
        fontSize: 24,
        textAlign: 'center',
        paddingLeft: 30,
        paddingRight: 30,
    },
    answerWordText: {
        padding: 2,
        fontSize: 20,
        textAlign: 'center',
        color: "black",
        textDecorationStyle: 'solid'
    },
    choice: {
        width: 220,
        height: 50,
        borderWidth: 1,
        borderRadius: 30,
        justifyContent: 'center',
        overflow: 'hidden',
        backgroundColor: 'black'
    },
    choicePressed: {
        width: 220,
        height: 50,
        borderWidth: 1,
        borderRadius: 30,
        justifyContent: 'center',
        overflow: 'hidden',
        backgroundColor: 'white'
    },
    choiceText: {
        textAlign: 'center',
        fontSize: 20,
        color: 'white'
    },
    choiceTextPressed: {
        textAlign: 'center',
        fontSize: 20,
        color: 'black'
    },
    body: {
        flex: 0.3,
        justifyContent: 'center',
    },
    answer: {
        flex: 0.25,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    choices: {
        flex: 0.25,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    header: {
        flex: 0.1
    },
    footer: {
        flex: 0.1
    }
});