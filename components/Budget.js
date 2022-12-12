import React,{ Component } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
  PermissionsAndroid,
  TextInput,
  ScrollView,
} from 'react-native';

import convertHtmlToPdf from './ConvertHtmlPdf.js'

import RNHTMLtoPDF from 'react-native-html-to-pdf';

import { showMessage, hideMessage } from "react-native-flash-message";

import AsyncStorage from '@react-native-async-storage/async-storage';

export default class App extends Component {
    state = {
        linhas: [],
        quantidade: "1",
        descricao: "",
        valorUnico: "",
        valorTotal: "",
        valorTotalFinal: "0,00",
        valorMãoDeObra: "0",
        namePrevia: ""
    }

    count = 0

    async componentDidMount() {
        let dados = await AsyncStorage.getItem(this.props.route.params.paramKey)
        dados = JSON.parse(dados)
        this.setState({ namePrevia: dados.namePrevia})
        if(dados.dadosCliente.linhas != null) {
            this.count = dados.dadosCliente.linhas.length
        }
        if(this.props.route.params.update) {
            if(dados.dadosCliente.linhas != null) {
                let valorTotalFinalLinhas = 0
                valorTotalFinalLinhas += Number(dados.dadosCliente.maoDeObra)
                dados.dadosCliente.linhas.forEach((linha) => {
                    valorTotalFinalLinhas += Number(linha[linha.length -1])
                })
                this.setState({ valorTotalFinal: String(valorTotalFinalLinhas) + ",00"})
                this.setState({ linhas: dados.dadosCliente.linhas })
            } else {
                this.setState({ valorTotalFinal: dados.dadosCliente.maoDeObra + ",00"})
            }
            this.setState({ valorMãoDeObra: dados.dadosCliente.maoDeObra})
        }
    }

    removeStorageStateLine = async (line) => {
        let lines = this.state.linhas
        lines.splice(lines.indexOf(line),1)
        this.setState({ linhas: lines })
        let dados = await AsyncStorage.getItem(this.props.route.params.paramKey)
        dados = JSON.parse(dados)
        dados.dadosCliente.linhas = lines
        this.count--
        await AsyncStorage.multiSet([
            [this.state.namePrevia, JSON.stringify(dados)]
          ])
    }

    setStorageOrcamento = async () => {
        let dados = await AsyncStorage.getItem(this.props.route.params.paramKey)
        dados = JSON.parse(dados)
        dados.dadosCliente.linhas = this.state.linhas
        await AsyncStorage.multiMerge([
            [this.props.route.params.paramKey, JSON.stringify(dados)]
        ])
        // let dadosNow = await AsyncStorage.getItem(this.props.route.params.paramKey)
        // console.log(dadosNow) 
    }

    setStorageMaoDeObra = async (text) => {
        this.setState({ valorMãoDeObra: text })
        let dados = await AsyncStorage.getItem(this.props.route.params.paramKey)
        dados = JSON.parse(dados)
        dados.dadosCliente.maoDeObra = text
        let valorTotalFinalLinhas = 0
        valorTotalFinalLinhas += Number(text)
        this.state.linhas.forEach((linha) => {
            valorTotalFinalLinhas += Number(linha[linha.length -1])
        })
        this.setState({ valorTotalFinal: String(valorTotalFinalLinhas) + ",00"})
        await AsyncStorage.multiMerge([
            [this.props.route.params.paramKey, JSON.stringify(dados)]
        ])
    }

    addLine = async () => {
        let linhasNow = this.state.linhas
        if(this.state.descricao == "") {
            showMessage({
                message: "Campo de descriçao do produto vazio !",
                type: "danger",
                });
            return
        }
        await linhasNow.push(
            [
                this.count, 
                this.state.quantidade, 
                this.state.descricao, 
                this.state.valorUnico == "" ? "0" : this.state.valorUnico,
                this.state.valorTotal == "" ? "0" : this.state.valorTotal
            ]
            )
        this.count++
        this.setState({ linhas: linhasNow })
        this.setStorageOrcamento()
        let valorTotalFinalLinhas = 0
        valorTotalFinalLinhas += Number(this.state.valorMãoDeObra)
        this.state.linhas.forEach((linha) => {
            valorTotalFinalLinhas += Number(linha[linha.length -1])
        })
        this.setState({ valorTotalFinal: String(valorTotalFinalLinhas) + ",00"})
    }

    addTotalAmount = (value) => {
        const valueNumber = Number(value) * Number(this.state.quantidade)
        this.setState({ valorUnico: value })
        this.setState({ valorTotal: String(valueNumber)})
    }

    askPermission() {
        var that = this;
        async function requestExternalWritePermission() {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    {
                        title: 'CameraExample App External Storage Write Permission',
                        message:
                            'CameraExample App needs access to Storage data in your SD Card ',
                    }
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    //If WRITE_EXTERNAL_STORAGE Permission is granted
                    //changing the state to show Create PDF option
                    that.createPDF();
                } else {
                    alert(`A permissão foi negada pelo usuário ! `);
                }
            } catch (err) {
                alert('Ouve algum erro na permissão !', err);
                console.warn(err);
            }
        }
        //Calling the External Write permission function
        if (Platform.OS === 'android') {
            requestExternalWritePermission();
        } else {
            this.createPDF();
        }
    }

    async createPDF() {
        let options = {
            html: await convertHtmlToPdf(this.state.namePrevia),
            fileName: `${Date.now()}_Orçamento`,
            directory: 'Orcamentos',
        }
        let file = await RNHTMLtoPDF.convert(options);
        console.log(file.filePath)
        showMessage({
            message: "Pdf criado com sucesso !" + file.filePath,
            type: "success",
            });
        this.setState({ filePath: file.filePath });
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
                            <Text style={styles.Tda}></Text>
                        </View>
                        {this.state.linhas.map((ele) => (
                            <View key={ele[0]} style={styles.Tr}>
                                <Text style={styles.Tdq} >{ele[1]}</Text>
                                <Text style={styles.Tdd} >{ele[2]}</Text>
                                <Text style={styles.Tdu} >R${ele[3]},00</Text>
                                <Text style={styles.Tdt} >R${ele[4]},00</Text>
                                <View style={styles.Tda}>
                                    <TouchableOpacity key={ele} style={styles.ButtonDelete} onPress={() => this.removeStorageStateLine(ele[0])}>
                                        <Text style={styles.TextButtonDelete}>Excluir</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))}
                    </View>
                    <View style={styles.ContainerTable}>
                        <View style={styles.Tr}>
                            <Text style={styles.Tdq}></Text>
                            <Text style={styles.Tdd}>MÃO DE OBRA</Text>
                            <Text style={styles.Tdu}></Text>
                            <Text style={styles.Tdt}>R$ {this.state.valorMãoDeObra},00</Text>
                            <Text style={styles.Tda}></Text>
                        </View>
                        <View style={styles.Tr}>
                            <Text style={styles.Tdq}></Text>
                            <Text style={styles.Tdd}>VALOR tOTAL</Text>
                            <Text style={styles.Tdu}></Text>
                            <Text style={styles.Tdt}>R$ {this.state.valorTotalFinal}</Text>
                            <Text style={styles.Tda}></Text>
                        </View>
                    </View>
                    <View style={styles.MainContainer}>
                        <View style={styles.ViewInputText}>
                            <Text style={styles.TextInfoInput}>Quantidade</Text>
                            <TextInput style={styles.TextInput} keyboardType="numeric" defaultValue='1' onChangeText={(text) => this.setState({ quantidade: text })} />
                        </View>
                        <View style={styles.ViewInputText}>
                            <Text style={styles.TextInfoInput}>Descrição dos serviços</Text>
                            <TextInput style={styles.TextInput} onChangeText={(text) => this.setState({ descricao: text })} />
                        </View>
                        <View style={styles.ViewInputText}>
                            <Text style={styles.TextInfoInput}>Valor único</Text>
                            <TextInput style={styles.TextInput} keyboardType="numeric" onChangeText={this.addTotalAmount}/>
                        </View>
                        <View style={styles.ViewInputText}>
                            <Text style={styles.TextInfoInput}>Valor total</Text>
                            <TextInput style={styles.TextInput} keyboardType="numeric" defaultValue={this.state.valorTotal} onChangeText={(text) => this.setState({ valorTotal: text })} />
                        </View>
                        <View style={styles.ButtonFinish}>
                            <TouchableOpacity style={styles.Button} onPress={this.addLine}>
                                <Text style={styles.TextButton}>Adicionar na linha</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.MainContainer}>
                        <View style={styles.ViewInputText}>
                            <Text style={styles.TextInfoInput}>Valor mão de obra</Text>
                            <TextInput style={styles.TextInput} keyboardType="numeric" defaultValue={this.state.valorMãoDeObra} onChangeText={this.setStorageMaoDeObra} />
                        </View>
                    </View>
                    <View style={styles.PdfButton}>
                        <TouchableOpacity onPress={this.askPermission.bind(this)}>
                            <View>
                                <Image source={{
                                        uri:
                                            'https://raw.githubusercontent.com/AboutReact/sampleresource/master/pdf.png',
                                    }}
                                    style={styles.ImageStyle}
                                />
                                <Text style={styles.text}>Criar PDF</Text>
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
    MainContainer: {
        justifyContent: 'center',
        margin: 20
      },
      TextInput: {
        backgroundColor: "#fff",
        width: 350,
        borderRadius: 10
    },
      text: {
          color: 'black',
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
          textAlignVertical: "center",
          width: 30,
          height: 30,
          borderColor: "#000",
          borderWidth: 0.4
      },
      Tdd: {
          backgroundColor: "#fff",
          textAlign: "center",
          textAlignVertical: "center",
          fontSize: 12,
          width: 120,
          height: 30,
          borderColor: "#000",
          borderWidth: 0.4
      },
      Tdu: {
          backgroundColor: "#fff",
          textAlign: "center",
          textAlignVertical: "center",
          width: 100,
          height: 30,
          borderColor: "#000",
          borderWidth: 0.4
      },
      Tdt: {
          backgroundColor: "#fff",
          textAlign: "center",
          textAlignVertical: "center",
          width: 100,
          height: 30,
          borderColor: "#000",
          borderWidth: 0.4
      },
      Tda: {
        backgroundColor: "#fff",
        textAlign: "center",
        textAlignVertical: "center",
        justifyContent: "center",
        width: 50,
        height: 30,
        borderColor: "#000",
        borderWidth: 0.4
    },
      ContainerTable: {
          margin: 20
      },
      ButtonFinish: {
          margin: 10
      },
      ViewInputText: {
        margin: 10
      },
      TextInfoInput: {
        marginVertical: 5
      },
      TextButtonDelete: {
        color: "#fff",
        textAlign: "center",
        textAlignVertical: "center",
        // width: 20
    },
    ButtonDelete: {
        backgroundColor: "#dc3545",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
    },
  });