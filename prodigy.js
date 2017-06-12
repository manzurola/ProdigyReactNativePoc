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

class ChoiceButton extends Component {
    render() {
        return (
            <TouchableHighlight style={{flex: 1,borderWidth:1, justifyContent:'center'}} onPress={this.props.onPress}>
                <Text
                    style={{textAlign:'center', fontFamily:'TheKingsoftheHouse-Regular', fontSize:24}}>{this.props.text}</Text>
            </TouchableHighlight>
        )
    }
}

export default class TransformationQuestion extends Component {
    onChoice(selectedChoiceIndex) {
        const selectedChoice = this.choices[this.state.index][selectedChoiceIndex];
        this.setState((previousState) => {
            previousState.solution[this.state.index] = selectedChoice;
            return {
                solution: previousState.solution,
                index: previousState.index + 1 === this.choices.length ? previousState.index : previousState.index + 1
            }
        });
    }

    constructor(props) {
        super(props);
        const choices = [
            ["word1-1", "word2-1", "word3-1", "word4-1"],
            ["word1-2", "word2-2", "word3-2", "word4-2"]
        ];
        const solution = [];
        this.choices = choices;
        for (let i =0; i < choices.length; i++) {
            solution.push("?");
        }
        this.state = {
            sourceSentence: props.sourceSentence,
            index: 0,
            solution: solution
        }
    }

    render() {
        var blanks = [];
        for (let i =0; i < this.choices.length; i++) {
            blanks.push(<Blank key={i} text={this.state.solution[i]}/>);
        }
        return (
            <View style={{ flex:1,borderWidth:1, flexDirection: 'column'}}>
                <View style={{flex: 0.1,justifyContent: 'center',borderWidth:1, padding:20}}>
                    <Text style={{
                        fontFamily:'TheKingsoftheHouse-Regular',
                        fontSize:24,
                        textAlign:'center',
                        textShadowColor: "black",
                        textShadowOffset: {width: 3, height: 3},
                        textShadowRadius: 5,
                        textDecorationColor: 'black',
                        color:"white",
                        textDecorationStyle: 'solid'
                    }}>dogs are cute and people are mean sometimes but not always</Text>
                </View>
                <View
                    style={{flex: 0.1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderWidth:1}}>
                    <View
                        style={{flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'center'}}>{blanks}</View>
                </View>
                <View style={{flex: 0.03,flexDirection:'row',justifyContent: 'center'}}>
                    <ChoiceButton text={this.choices[this.state.index][0]} onPress={() => this.onChoice(0)}/>
                    <ChoiceButton text={this.choices[this.state.index][1]} onPress={() => this.onChoice(1)}/>
                </View>
                <View style={{flex: 0.03,flexDirection:'row',justifyContent: 'center'}}>
                    <ChoiceButton text={this.choices[this.state.index][2]} onPress={() => this.onChoice(2)}/>
                    <ChoiceButton text={this.choices[this.state.index][3]} onPress={() => this.onChoice(3)}/>
                </View>
            </View>
        );
    }
}
