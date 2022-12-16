import React,{ Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default class BudgetSaves extends Component {
    state = {
        budgets: []
    }
    async componentDidMount() {
        const user = await AsyncStorage.getAllKeys()
        let keysBudget = []
        user.forEach((ele) => {
            if(ele != "dataCompany") {
                keysBudget.push(ele)
            }
        })
        this.setState({ budgets: keysBudget })
    }

    removeBudgetStorage = async (budget) => {
        let state = this.state.budgets
        state.splice(state.indexOf(budget),1)
        this.setState({ budgets: state })
        await AsyncStorage.removeItem(budget)
    }
    
    render() {
        return (
            <ScrollView>
                <View style={styles.MainContainer}>
                    <View style={styles.Tr}>
                        <Text style={styles.Tdq}>Nome do orçamento</Text>
                        <Text style={styles.Tdd}>Ação</Text>
                    </View>
                    {this.state.budgets.map((ele) => (
                        <View key={ele} style={styles.Tr}>
                            <TouchableOpacity style={styles.Tdq} onPress={() =>
                                this.props.navigation.navigate('InformationsClient',{budget: ele})}>
                                <Text style={styles.Tdq}>{ele}</Text>
                            </TouchableOpacity>
                            <View style={styles.Tdd}>
                                <TouchableOpacity key={ele} style={styles.ButtonDelete} onPress={() => this.removeBudgetStorage(ele)}>
                                    <Text style={styles.TextButtonDelete}>Excluir</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>
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
    MainContainer: {
        justifyContent: 'center',
        margin: 20
    },
    Tr: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    Tdq: {
        backgroundColor: "#fff",
        textAlign: "center",
        textAlignVertical: "center",
        width: 240,
        height: 35,
        borderColor: "#000",
        borderWidth: 0.4,
    },
    Tdd: {
        backgroundColor: "#fff",
        textAlign: "center",
        textAlignVertical: "center",
        justifyContent: "center",
        alignItems: "center",
        width: 70,
        height: 35,
        borderColor: "#000",
        borderWidth: 0.4
    },
    TextButtonDelete: {
        color: "#fff",
        textAlign: "center",
        textAlignVertical: "center",
        width: 70
        // padding: 10
    },
    ButtonDelete: {
        backgroundColor: "#dc3545",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
        // margin: 5
    },
  });