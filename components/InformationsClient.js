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

export default class InformationsClient extends Component {
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
      linhasPecas: [],
      linhasMaoDeObra: [],
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
      const dataCompany = await AsyncStorage.getItem("dataCompany")
      if(dataCompany == null) {
        const data = {
          logo: require('../src/sualogoaqui.png'),
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
        await AsyncStorage.setItem("dataCompany",JSON.stringify(data))
      }
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
      let valuenew = value.replace(/\D/g, "")
      if(valuenew.length <= 11) {
        valuenew = valuenew.replace(/(\d{3})(\d)/, "$1.$2")
        valuenew = valuenew.replace(/(\d{3})(\d)/, "$1.$2")
        valuenew = valuenew.replace(/(\d{3})(\d{1,2})$/, "$1-$2")
      } 
      else {
        valuenew = valuenew.replace(/^(\d{2})(\d)/, "$1.$2")
        valuenew = valuenew.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
        valuenew = valuenew.replace(/\.(\d{3})(\d)/, ".$1/$2")
        valuenew = valuenew.replace(/(\d{4})(\d)/, "$1-$2")
      }
      dadosClienteNow.cnpjCpf = valuenew
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
    if(this.props.route.params) {
      let budget = await AsyncStorage.getItem(this.props.route.params.budget)
      budget = JSON.parse(budget)
      this.setState({ linhasMaoDeObra: this.state.dadosCliente.linhasMaoDeObra = budget.dadosCliente.linhasMaoDeObra})
      this.setState({ linhasPecas: this.state.dadosCliente.linhasPecas = budget.dadosCliente.linhasPecas}) 
    }
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
      <ScrollView keyboardShouldPersistTaps="handled">
        <View accessible={true} style={styles.MainContainer}>
            <View accessible={true} style={styles.ViewInputText}>
              <Text style={styles.TextInfoInput}>Data</Text>
              <View accessible={true} style={styles.Date}>
                  <TextInputComponent style={styles.TextInputDate} defaultValue={this.state.dadosCliente.data} name={'data'} onChangeText={this.addInformationState}/>
                  <TouchableOpacity style={styles.ButtonDate} onPress={this.setDateTodayInput}>
                      <Text style={styles.TextButton}>Data Atual</Text>
                  </TouchableOpacity>
              </View>
            </View>
            <View accessible={true} style={styles.ViewInputText}>
              <Text style={styles.TextInfoInput}>Nome cliente</Text>
              <TextInputComponent style={styles.TextInput} defaultValue={this.state.dadosCliente.nome} name={'nomeCliente'} onChangeText={this.addInformationState} />
            </View>
            <View accessible={true} style={styles.ViewInputText}>
              <Text style={styles.TextInfoInput}>Endereço</Text>
              <TextInputComponent style={styles.TextInput} defaultValue={this.state.dadosCliente.endereco} name={'endereco'} onChangeText={this.addInformationState}/>
            </View>
            <View accessible={true} style={styles.ViewInputText}>
              <Text style={styles.TextInfoInput}>Número</Text>
              <TextInputComponent style={styles.TextInput} keyboardType="numeric" defaultValue={this.state.dadosCliente.numero} name={'numero'} onChangeText={this.addInformationState}/>
            </View>
            <View accessible={true} style={styles.ViewInputText}>
              <Text style={styles.TextInfoInput}>Bairro</Text>
              <TextInputComponent style={styles.TextInput} defaultValue={this.state.dadosCliente.bairro} name={'bairro'} onChangeText={this.addInformationState}/>
            </View>
            <View accessible={true} style={styles.ViewInputText}>
              <Text style={styles.TextInfoInput}>Cep</Text>
              <TextInputComponent style={styles.TextInput} maxLength={8} keyboardType="numeric" defaultValue={this.state.dadosCliente.cep} name={'cep'} onChangeText={this.addInformationState}/>
            </View>
            <View accessible={true} style={styles.ViewInputText}>
              <Text style={styles.TextInfoInput}>Cidade</Text>
              <TextInputComponent style={styles.TextInput} defaultValue={this.state.dadosCliente.cidade} name={'cidade'} onChangeText={this.addInformationState}/>
            </View>
            <View accessible={true} style={styles.ViewInputText}>
              <Text style={styles.TextInfoInput}>Estado</Text>
              <TextInputComponent style={styles.TextInput} defaultValue={this.state.dadosCliente.estado} name={'estado'} onChangeText={this.addInformationState}/>
            </View>
            <View accessible={true} style={styles.ViewInputText}>
              <Text style={styles.TextInfoInput}>Telefone</Text>
              <TextInputComponent style={styles.TextInput} maxLength={12} keyboardType="numeric" defaultValue={this.state.dadosCliente.fone} name={'fone'} onChangeText={this.addInformationState}/>
            </View>
            <View accessible={true} style={styles.ViewInputText}>
              <Text style={styles.TextInfoInput}>Condição de pagamento</Text>
              <TextInputComponent style={styles.TextInput} defaultValue={this.state.dadosCliente.condPag} name={'condPag'} onChangeText={this.addInformationState}/>
            </View>
            <View accessible={true} style={styles.ViewInputText}>
              <Text style={styles.TextInfoInput}>Prazo de entrega</Text>
              <TextInputComponent style={styles.TextInput} defaultValue={this.state.dadosCliente.prazoEntrega} name={'prazoEntrega'} onChangeText={this.addInformationState}/>
            </View>
            <View accessible={true} style={styles.ViewInputText}>
              <Text style={styles.TextInfoInput}>CNPJ/CFP</Text>
              <TextInputComponent style={styles.TextInput} maxLength={18} keyboardType="numeric" defaultValue={this.state.dadosCliente.cnpjCpf} name={'cnpjCpf'} onChangeText={this.addInformationState}/>
            </View>
            <View accessible={true} style={styles.ViewInputText}>
              <Text style={styles.TextInfoInput}>Inscr. Est./ RG</Text>
              <TextInputComponent style={styles.TextInput} keyboardType="numeric" defaultValue={this.state.dadosCliente.rg} name={'rg'} onChangeText={this.addInformationState}/>
            </View>
            <View accessible={true} style={styles.ViewInputText}>
              <Text style={styles.TextInfoInput}>Modelo do carro/moto</Text>
              <TextInputComponent style={styles.TextInput} defaultValue={this.state.dadosCliente.modeloCarro} name={'modeloCarro'} onChangeText={this.addInformationState}/>
            </View>
            <View accessible={true} style={styles.ViewInputText}>
              <Text style={styles.TextInfoInput}>Placa do carro/moto</Text>
              <TextInputComponent style={styles.TextInput} defaultValue={this.state.dadosCliente.placaCarro} name={'placaCarro'} onChangeText={this.addInformationState}/>
            </View>
            <TouchableOpacity style={styles.ButtonNext} onPress={() =>
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
    margin: 20,
  },
  TextInput: {
    backgroundColor: "#fff",
    height: 48,
    borderRadius: 10,
    borderColor: "#000",
    borderWidth: 0.4
},
TextInputDate: {
    backgroundColor: "#fff",
    width: 210,
    height: 48,
    borderRadius: 10,
    borderColor: "#000",
    borderWidth: 0.4
},
Date: {
    flexDirection: "row",
},
TextButton: {
  color: "#fff",
  padding: 5
},
ButtonNext: {
  backgroundColor: "#348532",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: 10,
  margin: 10,
  height: 48,
},
ButtonDate: {
  backgroundColor: "#348532",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: 10,
  marginHorizontal: 10,
  height: 48,
  width: 80
},

ViewInputText: {
  margin: 10,
  width: 300
},
TextInfoInput: {
  color: "#000",
  marginVertical: 5
}
  });