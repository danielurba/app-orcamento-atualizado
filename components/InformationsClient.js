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
    dadosCliente: {
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
      maoDeObra: '',
      linhas: null,
    }
  }

  update = false

  async componentDidMount() {
    if(this.props.route.params) {
      let budget = await AsyncStorage.getItem(this.props.route.params.budget)
      budget = JSON.parse(budget)
      let dadosClienteNow = { ...this.state.dadosCliente }
      dadosClienteNow.data = budget.dadosCliente.data
      dadosClienteNow.nome = budget.dadosCliente.nome
      dadosClienteNow.endereco = budget.dadosCliente.endereco
      dadosClienteNow.numero = budget.dadosCliente.numero
      dadosClienteNow.bairro = budget.dadosCliente.bairro
      dadosClienteNow.cep = budget.dadosCliente.cep
      dadosClienteNow.cidade = budget.dadosCliente.cidade
      dadosClienteNow.estado = budget.dadosCliente.estado
      dadosClienteNow.fone = budget.dadosCliente.fone
      dadosClienteNow.condPag = budget.dadosCliente.condPag
      dadosClienteNow.prazoEntrega = budget.dadosCliente.prazoEntrega
      dadosClienteNow.cnpjCpf = budget.dadosCliente.cnpjCpf
      dadosClienteNow.rg = budget.dadosCliente.rg
      dadosClienteNow.modeloCarro = budget.dadosCliente.modeloCarro
      dadosClienteNow.placaCarro = budget.dadosCliente.placaCarro
      this.setState({ namePrevia: this.props.route.params.budget})
      this.setState({ dadosCliente: dadosClienteNow })
      this.update = true
    } else {
      await this.setState({ namePrevia: `${Date.now()}_Previa_Orçamento`})
      const jsonValue = JSON.stringify(this.state)
      await AsyncStorage.setItem(this.state.namePrevia,jsonValue)
    }
}
  addInformationState = async (name, value) => {
    let dadosClienteNow = { ...this.state.dadosCliente }
    if(name == "data") {
      dadosClienteNow.data = value
    } else if(name == "nomeCliente") {
      dadosClienteNow.nome = value
    } else if(name == "endereco") {
      dadosClienteNow.endereco = value
    } else if(name == "numero") {
      dadosClienteNow.numero = value
    } else if(name == "bairro") {
      dadosClienteNow.bairro = value
    } else if(name == "cep") {
      dadosClienteNow.cep = value
    } else if(name == "cidade") {
      dadosClienteNow.cidade = value
    } else if(name == "estado") {
      dadosClienteNow.estado = value
    } else if(name == "fone") {
      dadosClienteNow.fone = value
    } else if(name == "condPag") {
      dadosClienteNow.condPag = value
    } else if(name == "prazoEntrega") {
      dadosClienteNow.prazoEntrega = value
    } else if(name == "cnpjCpf") {
      dadosClienteNow.cnpjCpf = value
    } else if(name == "rg") {
      dadosClienteNow.rg = value
    } else if(name == "modeloCarro") {
      dadosClienteNow.modeloCarro = value
    } else if(name == "placaCarro") {
      dadosClienteNow.placaCarro = value
    }
    await this.setState({ dadosCliente: dadosClienteNow })
    this.setStorageDadosCliente()
  }

  setStorageDadosCliente = async () => {
    await AsyncStorage.multiSet([
      [this.state.namePrevia, JSON.stringify(this.state)]
    ])
  }

  setDateTodayInput = async () => {
    const data = new Date(),
        dia  = data.getDate().toString(),
        diaF = (dia.length == 1) ? '0'+dia : dia,
        mes  = (data.getMonth()+1).toString(), //+1 pois no getMonth Janeiro começa com zero.
        mesF = (mes.length == 1) ? '0'+mes : mes,
        anoF = data.getFullYear();
        this.setState({ data: this.state.dadosCliente.data = diaF+"/"+mesF+"/"+anoF})
        this.addInformationState('data',diaF+"/"+mesF+"/"+anoF)
  }
  render() {
    return (
      <ScrollView>
        <View style={styles.MainContainer}>
            <View style={styles.ViewInputText}>
              <Text style={styles.TextInfoInput}>Data</Text>
              <View style={styles.Date}>
                  <TextInputComponent style={styles.TextInputDate} defaultValue={this.state.dadosCliente.data} name={'data'} onChangeText={this.addInformationState}/>
                  <TouchableOpacity style={styles.Button} onPress={this.setDateTodayInput}>
                      <Text style={styles.TextButton}>Data Atual</Text>
                  </TouchableOpacity>
              </View>
            </View>
            <View style={styles.ViewInputText}>
              <Text style={styles.TextInfoInput}>Nome cliente</Text>
              <TextInputComponent style={styles.TextInput} defaultValue={this.state.dadosCliente.nome} name={'nomeCliente'} onChangeText={this.addInformationState} />
            </View>
            <View style={styles.ViewInputText}>
              <Text style={styles.TextInfoInput}>Endereço</Text>
              <TextInputComponent style={styles.TextInput} defaultValue={this.state.dadosCliente.endereco} name={'endereco'} onChangeText={this.addInformationState}/>
            </View>
            <View style={styles.ViewInputText}>
              <Text style={styles.TextInfoInput}>Número</Text>
              <TextInputComponent style={styles.TextInput} keyboardType="numeric" defaultValue={this.state.dadosCliente.numero} name={'numero'} onChangeText={this.addInformationState}/>
            </View>
            <View style={styles.ViewInputText}>
              <Text style={styles.TextInfoInput}>Bairro</Text>
              <TextInputComponent style={styles.TextInput} defaultValue={this.state.dadosCliente.bairro} name={'bairro'} onChangeText={this.addInformationState}/>
            </View>
            <View style={styles.ViewInputText}>
              <Text style={styles.TextInfoInput}>Cep</Text>
              <TextInputComponent style={styles.TextInput} keyboardType="numeric" defaultValue={this.state.dadosCliente.cep} name={'cep'} onChangeText={this.addInformationState}/>
            </View>
            <View style={styles.ViewInputText}>
              <Text style={styles.TextInfoInput}>Cidade</Text>
              <TextInputComponent style={styles.TextInput} defaultValue={this.state.dadosCliente.cidade} name={'cidade'} onChangeText={this.addInformationState}/>
            </View>
            <View style={styles.ViewInputText}>
              <Text style={styles.TextInfoInput}>Estado</Text>
              <TextInputComponent style={styles.TextInput} defaultValue={this.state.dadosCliente.estado} name={'estado'} onChangeText={this.addInformationState}/>
            </View>
            <View style={styles.ViewInputText}>
              <Text style={styles.TextInfoInput}>Telefone</Text>
              <TextInputComponent style={styles.TextInput} keyboardType="numeric" defaultValue={this.state.dadosCliente.fone} name={'fone'} onChangeText={this.addInformationState}/>
            </View>
            <View style={styles.ViewInputText}>
              <Text style={styles.TextInfoInput}>Condição de pagamento</Text>
              <TextInputComponent style={styles.TextInput} defaultValue={this.state.dadosCliente.condPag} name={'condPag'} onChangeText={this.addInformationState}/>
            </View>
            <View style={styles.ViewInputText}>
              <Text style={styles.TextInfoInput}>Prazo de entrega</Text>
              <TextInputComponent style={styles.TextInput} defaultValue={this.state.dadosCliente.prazoEntrega} name={'prazoEntrega'} onChangeText={this.addInformationState}/>
            </View>
            <View style={styles.ViewInputText}>
              <Text style={styles.TextInfoInput}>CNPJ/CFP</Text>
              <TextInputComponent style={styles.TextInput} keyboardType="numeric" defaultValue={this.state.dadosCliente.cnpjCpf} name={'cnpjCpf'} onChangeText={this.addInformationState}/>
            </View>
            <View style={styles.ViewInputText}>
              <Text style={styles.TextInfoInput}>Inscr. Est./ RG</Text>
              <TextInputComponent style={styles.TextInput} keyboardType="numeric" defaultValue={this.state.dadosCliente.rg} name={'rg'} onChangeText={this.addInformationState}/>
            </View>
            <View style={styles.ViewInputText}>
              <Text style={styles.TextInfoInput}>Modelo do carro</Text>
              <TextInputComponent style={styles.TextInput} defaultValue={this.state.dadosCliente.modeloCarro} name={'modeloCarro'} onChangeText={this.addInformationState}/>
            </View>
            <View style={styles.ViewInputText}>
              <Text style={styles.TextInfoInput}>Placa do carro</Text>
              <TextInputComponent style={styles.TextInput} defaultValue={this.state.dadosCliente.placaCarro} name={'placaCarro'} onChangeText={this.addInformationState}/>
            </View>
            <TouchableOpacity style={styles.Button} onPress={() =>
                this.props.navigation.navigate('Budget',{paramKey: this.state.namePrevia, update: this.update})}>
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
    borderRadius: 10
},
TextInputDate: {
    backgroundColor: "#fff",
    width: 250,
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
}
  });