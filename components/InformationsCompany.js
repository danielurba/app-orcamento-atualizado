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

import { showMessage, hideMessage } from "react-native-flash-message";

import AsyncStorage from '@react-native-async-storage/async-storage';

export default class InformationsCompany extends Component {

    state = {
        logo: require('./sualogoaqui.jpg'),
        nomeEmpresa: "",
        cnpj: "",
        telefone: "",
        email: "",
        endereco: "",
        numero: "",
        cep: "",
        bairro: "",
        cidade: "",
        estado: "",
    }

    async componentDidMount() {
      let dataCompany = await AsyncStorage.getItem("dataCompany")
      if(dataCompany != null) {
        dataCompany = JSON.parse(dataCompany)
        this.setState({
          logo: dataCompany.logo, 
          nomeEmpresa: dataCompany.nomeEmpresa,
          cnpj: dataCompany.cnpj,
          telefone: dataCompany.telefone,
          email: dataCompany.email,
          endereco: dataCompany.endereco,
          numero: dataCompany.numero,
          cep: dataCompany.cep,
          bairro: dataCompany.bairro,
          cidade: dataCompany.cidade,
          estado: dataCompany.estado
        })
      }
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

    addInformationState = async (name, value) => {
      if(name == "nomeEmpresa") {
        await this.setState({ nomeEmpresa: value })
      } else if(name == "cnpj") {
        await this.setState({ cnpj: value })
      } else if(name == "telefone") {
        await this.setState({ telefone: value })
      } else if(name == "email") {
        await this.setState({ email: value })
      } else if(name == "endereco") {
        await this.setState({ endereco: value })
      } else if(name == "numero") {
        await this.setState({ numero: value })
      } else if(name == "cep") {
        await this.setState({ cep: value })
      } else if(name == "bairro") {
        await this.setState({ bairro: value })
      } else if(name == "cidade") {
        await this.setState({ cidade: value })
      } else if(name == "estado") {
        await this.setState({ estado: value })
      } 
    }
    
    saveToDataStorage = async () => {
      await AsyncStorage.multiSet([
        ["dataCompany", JSON.stringify(this.state)]
      ])
      showMessage({
        message: "Salvo com sucesso !",
        type: "success",
        });
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
              <TextInputComponent style={styles.TextInput} defaultValue={this.state.nomeEmpresa} name={'nomeEmpresa'} onChangeText={this.addInformationState}/>
            </View>
            <View style={styles.ViewInputText}>
              <Text style={styles.TextInfoInput}>Cnpj</Text>
              <TextInputComponent style={styles.TextInput} defaultValue={this.state.cnpj} name={'cnpj'} onChangeText={this.addInformationState}/>
            </View>
            <View style={styles.ViewInputText}>
              <Text style={styles.TextInfoInput}>Telefone</Text>
              <TextInputComponent style={styles.TextInput} defaultValue={this.state.telefone} keyboardType="numeric" name={'telefone'} onChangeText={this.addInformationState}/>
            </View>
            <View style={styles.ViewInputText}>
              <Text style={styles.TextInfoInput}>E-mail</Text>
              <TextInputComponent style={styles.TextInput} defaultValue={this.state.email} name={'email'} onChangeText={this.addInformationState}/>
            </View>
            <View style={styles.ViewInputText}>
              <Text style={styles.TextInfoInput}>Endereço</Text>
              <TextInputComponent style={styles.TextInput} defaultValue={this.state.endereco} name={'endereco'} onChangeText={this.addInformationState}/>
            </View>
            <View style={styles.ViewInputText}>
              <Text style={styles.TextInfoInput}>Número</Text>
              <TextInputComponent style={styles.TextInput} defaultValue={this.state.numero} keyboardType="numeric"  name={'numero'} onChangeText={this.addInformationState}/>
            </View>
            <View style={styles.ViewInputText}>
              <Text style={styles.TextInfoInput}>Cep</Text>
              <TextInputComponent style={styles.TextInput} defaultValue={this.state.cep} keyboardType="numeric"  name={'cep'} onChangeText={this.addInformationState}/>
            </View>
            <View style={styles.ViewInputText}>
              <Text style={styles.TextInfoInput}>Bairro</Text>
              <TextInputComponent style={styles.TextInput} defaultValue={this.state.bairro} name={'bairro'} onChangeText={this.addInformationState}/>
            </View>
            <View style={styles.ViewInputText}>
              <Text style={styles.TextInfoInput}>Cidade</Text>
              <TextInputComponent style={styles.TextInput} defaultValue={this.state.cidade} name={'cidade'} onChangeText={this.addInformationState}/>
            </View>
            <View style={styles.ViewInputText}>
              <Text style={styles.TextInfoInput}>Estado</Text>
              <TextInputComponent style={styles.TextInput} defaultValue={this.state.estado} name={'estado'} onChangeText={this.addInformationState}/>
            </View>
            <TouchableOpacity style={styles.Button} onPress={this.saveToDataStorage}>
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