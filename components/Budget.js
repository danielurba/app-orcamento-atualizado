import React,{ Component } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default class App extends Component {
    state = {
        linhas: [],
        quantidade: "",
        descricao: "",
        valorUnico: "",
        valorTotal: "",
        valorTotalFinal: "0,00",
        namePrevia: ""
    }

    setStorageOrcamento = async () => {
        let dados = await AsyncStorage.getItem(this.props.route.params.paramKey)
        dados = JSON.parse(dados)
        dados.dadosCliente.linhas = this.state.linhas
        await AsyncStorage.multiMerge([
            [this.props.route.params.paramKey, JSON.stringify(dados)]
        ])
        let dadosNow = await AsyncStorage.getItem(this.props.route.params.paramKey)
        console.log(dadosNow)
    }

    count = 0

    addLine = async () => {
        let linhasNow = this.state.linhas
        await linhasNow.push(
            [
                this.count, 
                this.state.quantidade, 
                this.state.descricao, 
                this.state.valorUnico,
                this.state.valorTotal
            ]
            )
        this.count++
        this.setState({ linhas: linhasNow })
        this.setStorageOrcamento()
    }
    render() {
        return (
            <ScrollView>
                <View>
                    <View style={styles.ContainerTable}>
                        <View style={styles.Tr}>
                            <Text style={styles.Tdq}>QTD</Text>
                            <Text style={styles.Tdd}>DESCRIÇÂO</Text>
                            <Text style={styles.Tdu}>V.UNIT</Text>
                            <Text style={styles.Tdt}>TOTAL</Text>
                        </View>
                        {this.state.linhas.map((ele) => (
                            <View key={ele[0]} style={styles.Tr}>
                                <Text style={styles.Tdq} >{ele[1]}</Text>
                                <Text style={styles.Tdd} >{ele[2]}</Text>
                                <Text style={styles.Tdu} >{ele[3]}</Text>
                                <Text style={styles.Tdt} >{ele[4]}</Text>
                            </View>
                        ))}
                        <View style={styles.Tr}>
                            <Text style={styles.Tdq}></Text>
                            <Text style={styles.Tdd}></Text>
                            <Text style={styles.Tdu}>TOTAL R$</Text>
                            <Text style={styles.Tdt}>R$ {this.state.valorTotalFinal}</Text>
                        </View>
                    </View>
                    <View style={styles.Table}>
                        <TextInput style={styles.TableLine} keyboardType="numeric" placeholder="Quantidade" onChangeText={(text) => this.setState({ quantidade: text })} />
                        <TextInput style={styles.TableLine} placeholder="Descrição do serviços" onChangeText={(text) => this.setState({ descricao: text })} />
                        <TextInput style={styles.TableLine} keyboardType="numeric" placeholder="Valor Unico" onChangeText={(text) => this.setState({ valorUnico: text })}/>
                        <TextInput style={styles.TableLine} keyboardType="numeric" placeholder="Valor Total" onChangeText={(text) => this.setState({ valorTotal: text })} />
                        <View style={styles.ButtonFinish}>
                            <TouchableOpacity style={styles.Button} onPress={this.addLine}>
                                <Text style={styles.TextButton}>Adicionar na linha</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.PdfButton}>
                        <TouchableOpacity >
                            <View>
                                <Image
                                    //We are showing the Image from online
                                    source={{
                                        uri:
                                            'https://raw.githubusercontent.com/AboutReact/sampleresource/master/pdf.png',
                                    }}
                                    //You can also show the image from you project directory like below
                                    //source={require('./Images/facebook.png')}
                                    style={styles.ImageStyle}
                                />
                                <Text style={styles.text}>Create PDF</Text>
                            </View>
                        </TouchableOpacity>
                        <Text style={styles.text}></Text>
                    </View>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
      text: {
          color: 'white',
          textAlign: 'center',
          fontSize: 15,
          marginBottom: 60
      },
      ImageStyle: {
          height: 60,
          width: 70
      },
      Button: {
          backgroundColor: "#333",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 20,
          marginLeft: 10
      },
      TextButton: {
          color: "#fff",
          padding: 10
      },
      PdfButton: {
          alignItems: "center",
          justifyContent: "center",
          padding: 30,
      },
      Table: {
          padding: 20
      },
      TableLine: {
          backgroundColor: "#fff",
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
          width: 30,
          height: 20,
          borderColor: "#000",
          borderWidth: 0.4
      },
      Tdd: {
          backgroundColor: "#fff",
          textAlign: "center",
          fontSize: 10,
          width: 170,
          height: 20,
          borderColor: "#000",
          borderWidth: 0.4
      },
      Tdu: {
          backgroundColor: "#fff",
          textAlign: "center",
          width: 80,
          height: 20,
          borderColor: "#000",
          borderWidth: 0.4
      },
      Tdt: {
          backgroundColor: "#fff",
          textAlign: "center",
          width: 80,
          height: 20,
          borderColor: "#000",
          borderWidth: 0.4
      },
      ContainerTable: {
          margin: 20
      },
      ButtonFinish: {
          margin: 10
      }
  });