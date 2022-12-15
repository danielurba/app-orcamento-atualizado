import React,{ Component } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  Image,
} from 'react-native';

import {launchImageLibrary} from 'react-native-image-picker';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default class InformationsCompany extends Component {

    state = {
        logo: require('./sualogoaqui.jpg')
    }

    loadImage = () => {
        launchImageLibrary({noData: true}, (response) => {
            console.log(response)

            if(response.didCancel) {
                return
            }
            else if (response.error) {
                return
            }
            else if (response.customButton) {
                return
            }
            else {
                this.setState({ logo: response.assets })
            }
        })
    }

  render() {
    return (
      <ScrollView>
        <View style={styles.MainContainer}>
            <View style={styles.ViewInputText}>
              <Text style={styles.TextInfoInput}>Logo da empresa</Text>
              <Image style={styles.ImageLogo} source={this.state.logo}/>
            </View>
            <TouchableOpacity style={styles.Button} onPress={this.loadImage}>
              <Text style={styles.TextButton}>Carregar imagem</Text>
            </TouchableOpacity>
            <View style={styles.ViewInputText}>
              <Text style={styles.TextInfoInput}>Nome da empresa</Text>
              <TextInputComponent style={styles.TextInput} name={'endereco'} onChangeText={this.addInformationState}/>
            </View>
            <View style={styles.ViewInputText}>
              <Text style={styles.TextInfoInput}>Telefone</Text>
              <TextInputComponent style={styles.TextInput} keyboardType="numeric" name={'numero'} onChangeText={this.addInformationState}/>
            </View>
            <View style={styles.ViewInputText}>
              <Text style={styles.TextInfoInput}>E-mail</Text>
              <TextInputComponent style={styles.TextInput} name={'bairro'} onChangeText={this.addInformationState}/>
            </View>
            <View style={styles.ViewInputText}>
              <Text style={styles.TextInfoInput}>Endereço</Text>
              <TextInputComponent style={styles.TextInput} keyboardType="numeric"  name={'cep'} onChangeText={this.addInformationState}/>
            </View>
            <View style={styles.ViewInputText}>
              <Text style={styles.TextInfoInput}>Número</Text>
              <TextInputComponent style={styles.TextInput}  name={'cidade'} onChangeText={this.addInformationState}/>
            </View>
            <View style={styles.ViewInputText}>
              <Text style={styles.TextInfoInput}>Cep</Text>
              <TextInputComponent style={styles.TextInput}  name={'estado'} onChangeText={this.addInformationState}/>
            </View>
            <View style={styles.ViewInputText}>
              <Text style={styles.TextInfoInput}>Bairro</Text>
              <TextInputComponent style={styles.TextInput} keyboardType="numeric"  name={'fone'} onChangeText={this.addInformationState}/>
            </View>
            <View style={styles.ViewInputText}>
              <Text style={styles.TextInfoInput}>Cidade</Text>
              <TextInputComponent style={styles.TextInput}  name={'condPag'} onChangeText={this.addInformationState}/>
            </View>
            <View style={styles.ViewInputText}>
              <Text style={styles.TextInfoInput}>Estado</Text>
              <TextInputComponent style={styles.TextInput}  name={'prazoEntrega'} onChangeText={this.addInformationState}/>
            </View>
            <TouchableOpacity style={styles.Button}>
              <Text style={styles.TextButton}>Salvar</Text>
            </TouchableOpacity>
        </View>
      </ScrollView>
      )
    }
}

const TextInputComponent = ({value, onChangeText, name, ...props}) => (
  <TextInput
      value={value}
      onChangeText={(value) => onChangeText(name, value)} //... Bind the name here
      {...props}
  />
)
  
const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: 'center',
    margin: 20
  },
  TextInput: {
    backgroundColor: "#fff",
    width: 300,
    borderRadius: 10
},
TextInputDate: {
    backgroundColor: "#fff",
    width: 210,
    borderRadius: 10
},
Date: {
    flexDirection: "row",
},
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

ViewInputText: {
  margin: 10
},
TextInfoInput: {
  marginVertical: 5
},
ImageLogo: {
    width: 300,
    height: 150
}
  });