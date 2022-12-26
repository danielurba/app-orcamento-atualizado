import React,{ Component } from 'react';
import {
  StyleSheet, TouchableOpacity, Image
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import 'react-native-gesture-handler';

const Stack = createStackNavigator();

import FlashMessage from "react-native-flash-message";

import Home from './components/Home'
import Budget from './components/Budget'
import BudgetSaves from './components/BudgetSaves'
import InformationsClient from './components/InformationsClient'
import InformationsCompany from './components/InformationsCompany'

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
          options={({navigation}) => ({
            title: 'Informações do cliente',
            headerStyle: {
              backgroundColor: '#0000FF',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerLeft: () => 
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image style={styles.backLeft} source={require('./src/backleft.png')}/>
            </TouchableOpacity>
          })}
        />
        <Stack.Screen
          name="BudgetSaves"
          component={BudgetSaves}
          options={({navigation}) => ({
            title: 'Orçamentos salvos',
            headerStyle: {
              backgroundColor: '#0000FF',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerLeft: () => 
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image style={styles.backLeft} source={require('./src/backleft.png')}/>
            </TouchableOpacity>
          })}
        />
        <Stack.Screen
          name="Budget"
          component={Budget}
          options={({navigation}) => ({
            title: 'Orçamento',
            headerStyle: {
              backgroundColor: '#0000FF',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerLeft: () => 
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image style={styles.backLeft} source={require('./src/backleft.png')}/>
            </TouchableOpacity>
          })}
        />
        <Stack.Screen
          name="InformationsCompany"
          component={InformationsCompany}
          options={({navigation}) => ({
            title: 'Informações da empresa',
            headerStyle: {
              backgroundColor: '#0000FF',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerLeft: () => 
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image style={styles.backLeft} source={require('./src/backleft.png')}/>
            </TouchableOpacity>
          })}
        />
      </Stack.Navigator>
      <FlashMessage position="top" />
    </NavigationContainer>
    )
  }
}

const styles = StyleSheet.create({
  backLeft: {
    height: 48,
    width: 48
  }
});