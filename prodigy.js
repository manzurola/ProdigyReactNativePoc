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
            <TouchableHighlight style={{flex: 1,borderWidth:1, justifyContent:'center'}} onPress={this.props.onPress}>
                <Text
                    style={{textAlign:'center', fontFamily:'TheKingsoftheHouse-Regular', fontSize:24}}>{this.props.text}</Text>
            </TouchableHighlight>
        )
    }
}

class Answer extends Component {
    render() {
        var view = [];
        for (let i = 0; i < this.props.words.length; i++) {
            view.push(<Text style={styles.answerWordText} key={i}>{this.props.words[i]}</Text>);
        }
        return (
            <View style={{flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'center'}}>{view}</View>
        )
    }
}

export default class TransformationQuestion extends Component {
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
            <View style={{ flex:1,borderWidth:1, flexDirection: 'column'}}>
                <View style={{flex: 0.1,justifyContent: 'center',borderWidth:1, padding:20}}>
                    <Text style={styles.bodyText}>{this.props.body}</Text>
                </View>
                <View style={{
                        flex: 0.1,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderWidth:1
                    }}><Answer words={this.state.answer}/>
                </View>
                <View style={{flex: 0.1,flexDirection:'column',justifyContent: 'center'}}>
                    <Choice text={this.props.choices[this.state.index][0]} onPress={() => this.onChoice(0)}/>
                    <Choice text={this.props.choices[this.state.index][1]} onPress={() => this.onChoice(1)}/>
                    <Choice text={this.props.choices[this.state.index][2]} onPress={() => this.onChoice(2)}/>
                </View>
                {/*<View style={{flex: 0.03,flexDirection:'row',justifyContent: 'center'}}>*/}
                    {/*<Choice text={this.props.choices[this.state.index][2]} onPress={() => this.onChoice(2)}/>*/}
                    {/*<Choice text={this.props.choices[this.state.index][3]} onPress={() => this.onChoice(3)}/>*/}
                {/*</View>*/}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    bodyText: {
        fontFamily:'TheKingsoftheHouse-Regular',
        fontSize:24,
        textAlign:'center',
        textShadowColor: "black",
        textShadowOffset: {width: -1, height: -1},
        textShadowRadius: 3,
        textDecorationColor: 'black',
        color:"blue",
        textDecorationStyle: 'solid'
    },
    answerWordText: {
        padding: 2,
        fontFamily:'TheKingsoftheHouse-Regular',
        fontSize:24,
        textAlign:'center',
        textShadowColor: "black",
        textShadowOffset: {width: -1, height: -1},
        textShadowRadius: 3,
        textDecorationColor: 'black',
        color:"blue",
        textDecorationStyle: 'solid'
    }
});