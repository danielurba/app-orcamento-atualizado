import React,{ Component } from 'react';
import {
  StyleSheet
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import 'react-native-gesture-handler';

const Stack = createStackNavigator();

import Home from './components/Home'
import Budget from './components/Budget'
import BudgetSaves from './components/BudgetSaves'
import InformationsClient from './components/InformationsClient'

export default class App extends Component {
  render() {
    return (
      <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: 'Tela inicial',
            headerStyle: {
              backgroundColor: '#0000FF',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="InformationsClient"
          component={InformationsClient}
          options={{
            title: 'Informações do cliente',
            headerStyle: {
              backgroundColor: '#0000FF',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="BudgetSaves"
          component={BudgetSaves}
          options={{
            title: 'Orçamentos salvos',
            headerStyle: {
              backgroundColor: '#0000FF',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="Budget"
          component={Budget}
          options={{
            title: 'Orçamento',
            headerStyle: {
              backgroundColor: '#0000FF',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
    )
  }
}

const styles = StyleSheet.create({
  
});