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
        this.state = {
            pressed: false
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log('componentWillReceiveProps:');
        console.log(nextProps);
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
        for (let i = 0; i < this.props.bodyContainer.length; i++) {
            let part = this.props.bodyContainer[i];
            if (part.isBlank) {
                let choice = this.props.answer[part.blankIndex];

                if (choice === undefined) choice = '?';

                part = <ShakingText style={styles.bodyText} key={i}>{choice}</ShakingText>;

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
        const selectedChoice = this.props.choicesContainer[this.state.index][selectedChoiceIndex];
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

    // can control animation of new choicesContainer in answer using the current index

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
                <View style={styles.bodyAndAnswer}>
                    <BodyAndAnswer blankToken={this.props.blankToken}
                                   body={this.props.bodyContainer}
                                   answer={this.state.answer}/>
                </View>
                <View style={styles.choicesContainer}>
                    <Choice style={styles.choice} text={this.props.choicesContainer[this.state.index][0]}
                            onPress={() => this.onChoice(0)}/>
                    <Choice style={styles.choice} text={this.props.choicesContainer[this.state.index][1]}
                            onPress={() => this.onChoice(1)}/>
                    <Choice style={styles.choice} text={this.props.choicesContainer[this.state.index][2]}
                            onPress={() => this.onChoice(2)}/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    bodyAndAnswer: {
        flex: 0.5,
        justifyContent: 'center'
    },
    bodyText: {
        fontSize: 24,
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
    }
});