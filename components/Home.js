import React,{ Component } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';

export default class Home extends Component {
    render() {
        return (
            <View style={styles.MainContainer}>
                <TouchableOpacity style={styles.Button} onPress={() =>
                this.props.navigation.navigate('InformationsClient')}>
                    <Text style={styles.TextButton}>Novo orçamento</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.Button} onPress={() =>
                this.props.navigation.navigate('BudgetSaves')}>
                    <Text style={styles.TextButton}>Orçamentos salvos</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.Button} onPress={() =>
                this.props.navigation.navigate('Budget')}>
              <Text style={styles.TextButton}>Proxima tela</Text>
            </TouchableOpacity>
            </View>
        )
    }
}
  
const styles = StyleSheet.create({
    MainContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 300
      },
    Button: {
        backgroundColor: "#007bff",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        margin: 10
    },
    TextButton: {
        color: "#fff",
        padding: 10
    },
  });