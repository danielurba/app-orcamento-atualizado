import React,{ Component } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  TextInput,
  ScrollView,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default class App extends Component {
  state = {
    namePrevia: '',
    orcamento: {
      data: '',
      nome: '',
      endereco: '',
      numero: '',
      bairro: '',
      cep: '',
      cidade: '',
      estado: '',
      fone: '',
      condPag: '',
      prazoEntrega: '',
      cnpjCpf: '',
      rg: '',
      modeloCarro: '',
      placaCarro: '',
    }
  }

  async componentDidMount() {
    const jsonValue = JSON.stringify(this.state.orcamento)
    const namePrevia = `${Date.now()}_Previa_Orçamento`
    this.setState({ namePrevia: namePrevia })
    await AsyncStorage.setItem(namePrevia,jsonValue)
}
  addInformationState = async (name, value) => {
    let orcamento = { ...this.state.orcamento }
    if(name == "data") {
      orcamento.data = value
    } else if(name == "nomeCliente") {
      orcamento.nome = value
    } else if(name == "endereco") {
      orcamento.endereco = value
    } else if(name == "numero") {
      orcamento.numero = value
    } else if(name == "bairro") {
      orcamento.bairro = value
    } else if(name == "cep") {
      orcamento.cep = value
    } else if(name == "cidade") {
      orcamento.cidade = value
    } else if(name == "estado") {
      orcamento.estado = value
    } else if(name == "fone") {
      orcamento.fone = value
    } else if(name == "condPag") {
      orcamento.condPag = value
    } else if(name == "prazoEntrega") {
      orcamento.prazoEntrega = value
    } else if(name == "cnpjCpf") {
      orcamento.cnpjCpf = value
    } else if(name == "rg") {
      orcamento.rg = value
    } else if(name == "modeloCarro") {
      orcamento.modeloCarro = value
    } else if(name == "placaCarro") {
      orcamento.placaCarro = value
    }
    await this.setState({ orcamento })
    this.setStorageOrcamento()
  }

  setStorageOrcamento = async () => {
    await AsyncStorage.multiSet([
      [this.state.namePrevia, JSON.stringify(this.state.orcamento)]
    ])
  }

  teste = () => {
    console.log(this.state) 
  }
  render() {
    return (
      <ScrollView>
        <View style={styles.MainContainer}>
            <View style={styles.Date}>
                <TextInputComponent style={styles.TextInputDate} placeholder="Data" name={'data'} onChangeText={this.addInformationState}/>
                <TouchableOpacity style={styles.Button} onPress={this.teste}>
                    <Text style={styles.TextButton}>Data Atual</Text>
                </TouchableOpacity>
            </View>
            <TextInputComponent style={styles.TextInput} placeholder="Nome do cliente" name={'nomeCliente'} onChangeText={this.addInformationState} />
            <TextInputComponent style={styles.TextInput} placeholder="Endereço" name={'endereco'} onChangeText={this.addInformationState}/>
            <TextInputComponent style={styles.TextInput} keyboardType="numeric" placeholder="Numero da casa" name={'numero'} onChangeText={this.addInformationState}/>
            <TextInputComponent style={styles.TextInput} placeholder="Bairro" name={'bairro'} onChangeText={this.addInformationState}/>
            <TextInputComponent style={styles.TextInput} keyboardType="numeric" placeholder="CEP" name={'cep'} onChangeText={this.addInformationState}/>
            <TextInputComponent style={styles.TextInput} placeholder="Cidade" name={'cidade'} onChangeText={this.addInformationState}/>
            <TextInputComponent style={styles.TextInput} placeholder="Estado" name={'estado'} onChangeText={this.addInformationState}/>
            <TextInputComponent style={styles.TextInput} keyboardType="numeric" placeholder="Fone" name={'fone'} onChangeText={this.addInformationState}/>
            <TextInputComponent style={styles.TextInput} placeholder="Condição de pagamento" name={'condPag'} onChangeText={this.addInformationState}/>
            <TextInputComponent style={styles.TextInput} placeholder="Prazo de entrega" name={'prazoEntrega'} onChangeText={this.addInformationState}/>
            <TextInputComponent style={styles.TextInput} keyboardType="numeric" placeholder="CNPJ/CFP" name={'cnpjCpf'} onChangeText={this.addInformationState}/>
            <TextInputComponent style={styles.TextInput} keyboardType="numeric" placeholder="Inscr. Est./ RG" name={'rg'} onChangeText={this.addInformationState}/>
            <TextInputComponent style={styles.TextInput} placeholder="Modelo do carro" name={'modeloCarro'} onChangeText={this.addInformationState}/>
            <TextInputComponent style={styles.TextInput} placeholder="Placa do carro" name={'placaCarro'} onChangeText={this.addInformationState}/>
            <TouchableOpacity style={styles.Button} onPress={() =>
                this.props.navigation.navigate('Budget')}>
              <Text style={styles.TextButton}>Proxima tela</Text>
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
    width: 350,
    margin: 10,
    borderRadius: 10
},
TextInputDate: {
    backgroundColor: "#fff",
    width: 250,
    borderRadius: 10
},
Date: {
    flexDirection: "row",
    margin: 10
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
  });