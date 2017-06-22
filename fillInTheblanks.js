/**
 * Created by guym on 05/06/2017.
 */
import React, {Component} from "react";
import ShakingText from "react-native-shaking-text";
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
    Button,
    Animated,
    Easing
} from "react-native";


{/*const myIcon = (<Icon name="rocket" size={30} color="#900" />)*/
}

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
    constructor(props) {
        super(props);
        console.log(props);
    }

    render() {
        return (
            <TouchableHighlight style={styles.choice} onPress={this.props.onPress}>
                <Text
                    style={styles.choiceText}>{this.props.data.text}</Text>
            </TouchableHighlight>
        )
    }
}

class BodyAndAnswer extends Component {
    state = {
        fadeAnim: new Animated.Value(0),  // Initial value for opacity: 0
    };

    componentDidMount() {
        Animated.timing(                  // Animate over time
            this.state.fadeAnim,            // The animated value to drive
            {
                toValue: 1,                   // Animate to opacity: 1 (opaque)
                duration: 150              // Make it take a while
            }
        ).start();                        // Starts the animation
    }

    render() {
        let {fadeAnim} = this.state;
        let parts = [];
        for (let i = 0; i < this.props.body.length; i++) {
            let part = this.props.body[i];
            if (part.isBlank) {
                let choice = this.props.answer[part.blankIndex];
                let text;

                if (choice !== undefined) text = choice.text;
                else text = '?';

                part = <ShakingText style={styles.bodyText} key={i}>{text}</ShakingText>;

            } else {
                part = <Text style={styles.bodyText} key={i}>{part.text}</Text>
            }

            parts.push(part);
        }
        return (
            <Animated.View style={{
                flexDirection: 'row',
                justifyContent: 'center',
                opacity: fadeAnim
            }}>
                {parts}
            </Animated.View>
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
                <View style={styles.bodyAndAnswer}>
                    <BodyAndAnswer blankToken={this.props.blankToken}
                                   body={this.props.body}
                                   answer={this.state.answer}/>
                </View>
                <View
                    style={{flex: 0.13,flexDirection:'column',justifyContent: 'center', paddingTop: 3, paddingBottom:3}}>
                    <View style={styles.lineSeparator}/>
                    <Choice data={this.props.choices[this.state.index][0]} onPress={() => this.onChoice(0)}/>
                    <View style={styles.lineSeparator}/>
                    <Choice data={this.props.choices[this.state.index][1]} onPress={() => this.onChoice(1)}/>
                    <View style={styles.lineSeparator}/>
                    <Choice data={this.props.choices[this.state.index][2]} onPress={() => this.onChoice(2)}/>
                    <View style={styles.lineSeparator}/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    lineSeparator: {
        borderWidth: 0.3,
        height: 0,
        borderColor: 'gray'
        // flex:1
    },
    bodyAndAnswer: {
        flex: 0.2,
        justifyContent: 'center',
        margin: 20
    },
    bodyText: {
        fontFamily: 'TheKingsoftheHouse-Regular',
        fontSize: 34,
        textShadowColor: "#D6D4D1",
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 0,
        color: "black"
    },
    choice: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: 10,
        paddingBottom: 10,
    },
    choiceText: {
        textDecorationColor: 'black',
        color: "black",
        textDecorationStyle: 'solid',
        textShadowColor: "#D6D4D1",
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 0,
        textAlign: 'center',
        fontFamily: 'TheKingsoftheHouse-Regular',
        fontSize: 28
    }
});