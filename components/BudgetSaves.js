import React,{ Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default class BudgetSaves extends Component {
    state = {
        budgets: []
    }
    async componentDidMount() {
        const user = await AsyncStorage.getAllKeys()
        this.setState({ budgets: user })
        // console.log(user[0])
        if(user[0]) {
            const dados = await AsyncStorage.getItem(user[0])
            console.log(dados)
        }
    }

    async clearStorage() {
        await AsyncStorage.clear()
    }
    
    render() {
        console.log(this.state)
        return (
            <View>
                {this.state.budgets.map((ele) => (
                    <Text key={ele}>{ele}</Text>
                ))}
                <TouchableOpacity style={styles.Button} onPress={this.clearStorage}>
                    <Text style={styles.TextButton}>Limpar</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    TextButton: {
        color: "#fff",
        padding: 10
      },
      Button: {
        backgroundColor: "#28a745",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        margin: 10
      },
  });