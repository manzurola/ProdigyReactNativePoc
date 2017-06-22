/**
 * Created by guym on 22/06/2017.
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
    TouchableHighlight
} from "react-native";

class Choice extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TouchableHighlight style={styles.choice} onPress={this.props.onPress}>
                <Text style={{textAlign:'center',  fontSize:20}}>{this.props.text}</Text>
            </TouchableHighlight>
        )
    }
}

// receives a multidimensional array of choices (text), the current answer and a boolean 'complete' indicating if the question is complete
export default class Choices extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let choices = [];
        for (let data of this.props.choices) {
            choices.push(<Choice text={data.text} correct={data.correct}/>)
        }
        return (
            <View style={styles.container}>
                {choices}
            </View>
        );
    }
}

const styles = {
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    choice: {
        width: 220,
        height: 50,
        borderWidth: 1,
        borderRadius: 30,
        justifyContent: 'center'
    }
};