/**
 * Created by guym on 24/06/2017.
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


export default class Game extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isGameOver: false,
            questionIndex: 0,
            isAnswerComplete: false,
            answer: [],
            choiceIndex: 0
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}/>
                {this.renderQuestion(this.getCurrentQuestion())}
                <View style={styles.footer}/>
            </View>
        );
    }

    renderQuestion(data) {
        return (
            <View style={styles.questionContainer}>
                <View style={styles.body}>
                    <Text style={styles.bodyText}>{data.body}</Text>
                </View>
                <View style={styles.answerContainer}>
                    <Answer onPress={() => this.deleteLastWordInAnswer()}
                            words={this.state.answer}
                            answerKey={data.answer}
                            showResult={this.state.isAnswerComplete}/>
                </View>
                <View style={styles.choices}>
                    <Choice style={styles.choice} text={data.choices[this.state.choiceIndex][0]}
                            onPress={() => this.onChoice(0)}/>
                    <Choice style={styles.choice} text={data.choices[this.state.choiceIndex][1]}
                            onPress={() => this.onChoice(1)}/>
                    <Choice style={styles.choice} text={data.choices[this.state.choiceIndex][2]}
                            onPress={() => this.onChoice(2)}/>
                </View>
            </View>
        );
    }

    onChoice(selectedChoiceIndex) {
        // if question complete then move on to next question
        // else put choice in answer
        // if question is complete, validate answer

        let question = this.getCurrentQuestion();

        // if a choice was clicked after a question is complete, move on to next question and reset state
        const answerComplete = question.answer.length === this.state.answer.length;
        if (answerComplete) {
            console.log("answer is complete, moving on to next question");
            this.setState((previousState) => {
                let gameOver = this.props.questions.length === previousState.questionIndex + 1;
                return {
                    answer: [],
                    isGameOver: gameOver,
                    questionIndex: gameOver ? previousState.questionIndex : previousState.questionIndex + 1,
                    choiceIndex: 0,
                    isAnswerComplete: false
                }
            });
        } else {
            console.log("answer is not complete, adding selected choice to answer");
            // add the choice to the answer and evaluate if question is complete
            const selectedChoice = question.choices[this.state.choiceIndex][selectedChoiceIndex];
            // if current choice was last, question is complete
            this.setState((previousState) => {
                previousState.answer.push(selectedChoice);
                const answerComplete = question.answer.length === this.state.answer.length;
                console.log("isAnswerComplete: " + answerComplete);
                return {
                    answer: previousState.answer,
                    choiceIndex: answerComplete ? previousState.choiceIndex : previousState.choiceIndex + 1,
                    isAnswerComplete: answerComplete
                }
            });
        }
    }

    skipQuestion() {
        console.log('TODO skip question');
    }

    deleteLastWordInAnswer() {
        console.log("delete last word in answer");
        if (this.state.answer.length === 0 || this.state.isAnswerComplete) return;
        this.setState((previousState) => {
            previousState.answer.pop();
            return {
                answer: previousState.answer,
                choiceIndex: previousState.choiceIndex - 1
            }
        });
    }

    getCurrentQuestion() {
        return this.props.questions[this.state.questionIndex];
    }
}

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
            <TouchableHighlight
                onPress={this.props.onPress}
                style={styles.answer}>
                <View style={{
                    flexWrap: 'wrap',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignContent:'space-between',
                }}>{view}</View>
            </TouchableHighlight>
        )
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
    questionContainer: {
        flex: 0.8
    },
    header: {
        flex: 0.1
    },
    footer: {
        flex: 0.1
    },
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
    choices: {
        flex: 0.25,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center'
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
    answerContainer: {
        flex: 0.25,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    answer: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 30,
        minHeight: 50,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 30,
        paddingRight: 30,
        width: 300
    }
});