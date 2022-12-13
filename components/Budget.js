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
        linhasPecas: [],
        linhasMaoDeObra: [],
        quantidade: "1",
        descricao: "",
        valorUnico: "",
        valorTotal: "",
        valorTotalMãoDeObra: "0",
        valorTotalPecas: "0",
        valorTotalFinal: "0,00",
        namePrevia: ""
    }

    countPeca = 0
    countMaoDeObra = 0

    async componentDidMount() {
        let dados = await AsyncStorage.getItem(this.props.route.params.paramKey)
        dados = JSON.parse(dados)
        this.setState({ namePrevia: dados.namePrevia})
        if(dados.dadosCliente.linhasPecas != null) {
            this.count = dados.dadosCliente.linhasPecas.length
        }
        if(this.props.route.params.update) {
            if(dados.dadosCliente.linhasPecas != null) {
                // let valorTotalFinalLinhas = 0
                // valorTotalFinalLinhas += Number(dados.dadosCliente.linhasMaoDeObra)
                // dados.dadosCliente.linhas.forEach((linha) => {
                //     valorTotalFinalLinhas += Number(linha[linha.length -1])
                // })
                // this.setState({ valorTotalFinal: String(valorTotalFinalLinhas) + ",00"})
                this.setState({ linhasPecas: dados.dadosCliente.linhasPecas })
                this.setState({ linhasMaoDeObra: dados.dadosCliente.linhasMaoDeObra })
            } else {
                // this.setState({ valorTotalFinal: dados.dadosCliente.maoDeObra + ",00"})
            }
            // this.setState({ valorMãoDeObra: dados.dadosCliente.maoDeObra})
        }
    }

    removeStorageStateLinePecas = async (line) => {
        let lines = this.state.linhasPecas
        lines.splice(lines.indexOf(line),1)
        this.setState({ linhasPecas: lines })
        let dados = await AsyncStorage.getItem(this.props.route.params.paramKey)
        dados = JSON.parse(dados)
        dados.dadosCliente.linhasPecas = lines
        this.countPeca--
        await AsyncStorage.multiSet([
            [this.state.namePrevia, JSON.stringify(dados)]
          ])
    }

    removeStorageStateLineMaoDeObra = async (line) => {
        let lines = this.state.linhasMaoDeObra
        lines.splice(lines.indexOf(line),1)
        this.setState({ linhasMaoDeObra: lines })
        let dados = await AsyncStorage.getItem(this.props.route.params.paramKey)
        dados = JSON.parse(dados)
        dados.dadosCliente.linhasMaoDeObra = lines
        this.countMaoDeObra--
        await AsyncStorage.multiSet([
            [this.state.namePrevia, JSON.stringify(dados)]
          ])
    }

    setStoragePecas = async () => {
        let dados = await AsyncStorage.getItem(this.props.route.params.paramKey)
        dados = JSON.parse(dados)
        dados.dadosCliente.linhasPecas = this.state.linhasPecas
        await AsyncStorage.multiMerge([
            [this.props.route.params.paramKey, JSON.stringify(dados)]
        ])
        // let dadosNow = await AsyncStorage.getItem(this.props.route.params.paramKey)
        // console.log(dadosNow) 
    }

    setStorageMaoDeObra = async () => {
        let dados = await AsyncStorage.getItem(this.props.route.params.paramKey)
        dados = JSON.parse(dados)
        dados.dadosCliente.linhasMaoDeObra = this.state.linhasMaoDeObra
        await AsyncStorage.multiMerge([
            [this.props.route.params.paramKey, JSON.stringify(dados)]
        ])
        // let dadosNow = await AsyncStorage.getItem(this.props.route.params.paramKey)
        // console.log(dadosNow) 
    }

    addPecaLinha = async () => {
        let linhasNow = this.state.linhasPecas
        if(this.state.descricao == "") {
            showMessage({
                message: "Campo de descriçao do produto vazio !",
                type: "danger",
                });
            return
        }
        await linhasNow.push(
            [
                this.countPeca, 
                this.state.quantidade, 
                this.state.descricao, 
                this.state.valorUnico == "" ? "0" : this.state.valorUnico,
                this.state.valorTotal == "" ? "0" : this.state.valorTotal
            ]
            )
        this.countPeca++
        this.setState({ linhasPecas: linhasNow })
        this.setStoragePecas()
        let valorTotalFinalLinhas = 0
        this.state.linhasPecas.forEach((linha) => {
            valorTotalFinalLinhas += Number(linha[linha.length -1])
        })
        this.setState({ valorTotalPecas: String(valorTotalFinalLinhas)})
        this.setState({ valorTotalFinal: String(Number(valorTotalFinalLinhas) + Number(this.state.valorTotalMãoDeObra))})
    }

    addMaoDeObra = async () => {
        let linhasNow = this.state.linhasMaoDeObra
        if(this.state.descricao == "") {
            showMessage({
                message: "Campo de descriçao do produto vazio !",
                type: "danger",
                });
            return
        }
        await linhasNow.push(
            [
                this.countMaoDeObra, 
                this.state.quantidade, 
                this.state.descricao, 
                this.state.valorUnico == "" ? "0" : this.state.valorUnico,
                this.state.valorTotal == "" ? "0" : this.state.valorTotal
            ]
            )
        this.countMaoDeObra++
        this.setState({ linhasMaoDeObra: linhasNow })
        this.setStorageMaoDeObra()
        let valorTotalFinalLinhas = 0
        this.state.linhasMaoDeObra.forEach((linha) => {
            valorTotalFinalLinhas += Number(linha[linha.length -1])
        })
        this.setState({ valorTotalMãoDeObra: String(valorTotalFinalLinhas)})
        this.setState({ valorTotalFinal: String(Number(valorTotalFinalLinhas) + Number(this.state.valorTotalPecas))})
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
                    <Text style={styles.TextInfoInput}>Tabela de peças</Text>
                        <View style={styles.Tr}>
                            <Text style={styles.Tdq}>QTD</Text>
                            <Text style={styles.Tdd}>DESCRIÇÂO</Text>
                            <Text style={styles.Tdu}>V.UNIT</Text>
                            <Text style={styles.Tdt}>TOTAL</Text>
                            <Text style={styles.Tda}></Text>
                        </View>
                        {this.state.linhasPecas.map((ele) => (
                            <View key={ele[0]} style={styles.Tr}>
                                <Text style={styles.Tdq} >{ele[1]}</Text>
                                <Text style={styles.Tdd} >{ele[2]}</Text>
                                <Text style={styles.Tdu} >R${ele[3]},00</Text>
                                <Text style={styles.Tdt} >R${ele[4]},00</Text>
                                <View style={styles.Tda}>
                                    <TouchableOpacity key={ele} style={styles.ButtonDelete} onPress={() => this.removeStorageStateLinePecas(ele[0])}>
                                        <Text style={styles.TextButtonDelete}>Excluir</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))}
                        <View style={styles.Tr}>
                            <Text style={styles.Tdq}></Text>
                            <Text style={styles.Tdd}>VALOR TOTAL</Text>
                            <Text style={styles.Tdu}></Text>
                            <Text style={styles.Tdt}>R$ {this.state.valorTotalPecas}</Text>
                            <Text style={styles.Tda}></Text>
                        </View>
                    </View>
                    <View style={styles.ContainerTable}>
                        <Text style={styles.TextInfoInput}>Tabela de mão de obra</Text>
                        <View style={styles.Tr}>
                            <Text style={styles.Tdq}>QTD</Text>
                            <Text style={styles.Tdd}>DESCRIÇÂO</Text>
                            <Text style={styles.Tdu}>V.UNIT</Text>
                            <Text style={styles.Tdt}>TOTAL</Text>
                            <Text style={styles.Tda}></Text>
                        </View>
                        {this.state.linhasMaoDeObra.map((ele) => (
                            <View key={ele[0]} style={styles.Tr}>
                                <Text style={styles.Tdq} >{ele[1]}</Text>
                                <Text style={styles.Tdd} >{ele[2]}</Text>
                                <Text style={styles.Tdu} >R${ele[3]},00</Text>
                                <Text style={styles.Tdt} >R${ele[4]},00</Text>
                                <View style={styles.Tda}>
                                    <TouchableOpacity key={ele} style={styles.ButtonDelete} onPress={() => this.removeStorageStateLineMaoDeObra(ele[0])}>
                                        <Text style={styles.TextButtonDelete}>Excluir</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))}
                        <View style={styles.Tr}>
                            <Text style={styles.Tdq}></Text>
                            <Text style={styles.Tdd}>VALOR TOTAL</Text>
                            <Text style={styles.Tdu}></Text>
                            <Text style={styles.Tdt}>R$ {this.state.valorTotalMãoDeObra}</Text>
                            <Text style={styles.Tda}></Text>
                        </View>
                    </View>
                    <View style={styles.ContainerTable}>
                    <Text style={styles.TextInfoInput}>Valor total</Text>
                        <View style={styles.Tr}>
                            <Text style={styles.Tdq}></Text>
                            <Text style={styles.Tdd}>VALOR TOTAL</Text>
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
                            <TouchableOpacity style={styles.Button} onPress={this.addPecaLinha}>
                                <Text style={styles.TextButton}>Adicionar peça</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.ButtonFinish}>
                            <TouchableOpacity style={styles.Button} onPress={this.addMaoDeObra}>
                                <Text style={styles.TextButton}>Adicionar mão de obra</Text>
                            </TouchableOpacity>
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
        width: 300,
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
          width: 100,
          height: 30,
          borderColor: "#000",
          borderWidth: 0.4
      },
      Tdu: {
          backgroundColor: "#fff",
          textAlign: "center",
          textAlignVertical: "center",
          width: 70,
          height: 30,
          borderColor: "#000",
          borderWidth: 0.4
      },
      Tdt: {
          backgroundColor: "#fff",
          textAlign: "center",
          textAlignVertical: "center",
          width: 80,
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