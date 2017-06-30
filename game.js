/**
 * Created by guym on 24/06/2017.
 */
import QuestionDeckSwiper from "./questiondeckswiper.js";
import QuestionDeck from "./questiondeck.js";
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
            questionIndex: 0
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}/>
                <QuestionDeckSwiper data={this.props.questions} renderQuestion={(data) => {return this.renderQuestion(data)}}/>
                <View style={styles.footer}/>
            </View>
        );
    }

    renderQuestion(data) {
        return (
            <Question {...data} completed={(question) => {this.onQuestionCompleted(question)}}/>
        );
    }

    onQuestionCompleted(question) {
        console.log('question completed:');
        console.log(question);
        this.setState((previousState) => {
            let gameOver = this.props.questions.length === previousState.questionIndex + 1;
            return {
                isGameOver: gameOver,
                questionIndex: gameOver ? previousState.questionIndex : previousState.questionIndex + 1
            }
        });
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

class Question extends Component {

    constructor(props) {
        super(props);

        console.log("calling question constructor");

        this.state = {
            isAnswerComplete: false,
            answer: [],
            answerIndex: 0
        };
    }

    getAnswer() {
        return this.state.answer;
    }

    isCorrect() {
        return
    }

    render() {
        return (
            <View style={styles.questionContainer}>
                <View style={styles.bodyContainer}>
                    <Text style={styles.bodyText}>{this.props.body}</Text>
                </View>
                <View style={styles.answerContainer}>
                    <Answer onPress={() => this.deleteLastWordInAnswer()}
                            words={this.state.answer}
                            instructions={this.props.instructions}
                            answerKey={this.props.answer}
                            showResult={this.state.isAnswerComplete}/>
                </View>
                <View style={styles.choicesContainer}>
                    <Choice style={styles.choice} text={this.props.choices[this.state.answerIndex][0]}
                            onPress={() => this.onChoice(0)}/>
                    <Choice style={styles.choice} text={this.props.choices[this.state.answerIndex][1]}
                            onPress={() => this.onChoice(1)}/>
                    <Choice style={styles.choice} text={this.props.choices[this.state.answerIndex][2]}
                            onPress={() => this.onChoice(2)}/>
                </View>
            </View>
        );
    }

    deleteLastWordInAnswer() {
        console.log("delete last word in answer");
        if (this.state.answer.length === 0 || this.state.isAnswerComplete) return;
        this.setState((previousState) => {
            previousState.answer.pop();
            return {
                answer: previousState.answer,
                answerIndex: previousState.answerIndex - 1
            }
        });
    }

    onChoice(selectedChoiceIndex) {

        // if question is complete then do nothing

        if (this.state.isAnswerComplete) return;

        console.log("adding choice to answer");

        // add the choice to the answer and evaluate if question is complete

        const selectedChoice = this.props.choices[this.state.answerIndex][selectedChoiceIndex];

        this.setState((previousState) => {
            previousState.answer.push(selectedChoice);

            // if current choice was last, question is complete

            const answerComplete = this.props.answer.length === this.state.answer.length;

            console.log("isAnswerComplete: " + answerComplete);

            return {
                answer: previousState.answer,
                answerIndex: answerComplete ? previousState.answerIndex : previousState.answerIndex + 1,
                isAnswerComplete: answerComplete
            }
        });
        this.completed();
    }

    completed() {
        this.props.completed(this);
    }
}

class Answer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isComplete: false,
            isCorrect: false,
            input: []
        }
    }

    render() {
        let view = [];
        // show instructions if answer is empty
        if (this.props.words.length === 0) {
            console.log("setting instructions");
            view.push(<Text key='0' style={styles.instructionsText}>{this.props.instructions}</Text>);
        } else {
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
    instructions: {
        flex: 0.1,
        justifyContent: 'center'
    },
    instructionsText: {
        fontSize: 14,
        textAlign: 'center'
    },
    bodyContainer: {
        flex: 0.3,
        justifyContent: 'center'
    },
    bodyText: {
        // fontFamily: 'TheKingsoftheHouse-Regular',
        fontSize: 24,
        textAlign: 'center',
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 120
    },
    answerWordText: {
        padding: 2,
        fontSize: 20,
        textAlign: 'center',
        color: "black",
        textDecorationStyle: 'solid'
    },
    choicesContainer: {
        flex: 0.25,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    choice: {
        width: 250,
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
        width: 320
    }
});