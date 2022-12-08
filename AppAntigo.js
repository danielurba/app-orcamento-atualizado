import React, { Component } from 'react';
import {
    Text,
    TouchableOpacity,
    View,
    StyleSheet,
    Image,
    PermissionsAndroid,
    Platform,
    TextInput,
    ScrollView
} from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
export default class App extends Component {
    state = {
        filePath: '',
        data: '',
        name: '',
        endereco: '',
        casanum: '',
        bairro: '',
        cep: '',
        cidade: '',
        estado: '',
        fone: '',
        pagamento: '',
        prazoentre: '',
        cpf: '',
        rg: '',
        modelcar: '',
        placacar: '',
        quantidade: '',
        descricao: '',
        valorunico: '',
        valortotal: '',
        upline: '',
        tabela: {
            line1: {
                quant: '',
                descr: '',
                valorUn: '',
                valorTot: ''
            },
            line2: {
                quant: '',
                descr: '',
                valorUn: '',
                valorTot: ''
            },
            line3: {
                quant: '',
                descr: '',
                valorUn: '',
                valorTot: ''
            },
            line4: {
                quant: '',
                descr: '',
                valorUn: '',
                valorTot: ''
            },
            line5: {
                quant: '',
                descr: '',
                valorUn: '',
                valorTot: ''
            },
            line6: {
                quant: '',
                descr: '',
                valorUn: '',
                valorTot: ''
            },
            line7: {
                quant: '',
                descr: '',
                valorUn: '',
                valorTot: ''
            },
            line8: {
                quant: '',
                descr: '',
                valorUn: '',
                valorTot: ''
            },
            line9: {
                quant: '',
                descr: '',
                valorUn: '',
                valorTot: ''
            },
            line10: {
                quant: '',
                descr: '',
                valorUn: '',
                valorTot: ''
            },
            line11: {
                quant: '',
                descr: '',
                valorUn: '',
                valorTot: ''
            },
            line12: {
                quant: '',
                descr: '',
                valorUn: '',
                valorTot: ''
            },
            line13: {
                quant: '',
                descr: '',
                valorUn: '',
                valorTot: ''
            },
            line14: {
                quant: '',
                descr: '',
                valorUn: '',
                valorTot: ''
            },
            line15: {
                quant: '',
                descr: '',
                valorUn: '',
                valorTot: ''
            },
            somatotal: 0,
            somatotalformat: ''
        }
    };
    setData = (text) => {
        this.setState({ data: text })
    }
    setName = (text) => {
        this.setState({ name: text })
    }
    setEndereco = (text) => {
        this.setState({ endereco: text })
    }
    setCasaNum = (text) => {
        this.setState({ casanum: text })
    }
    setBairro = (text) => {
        this.setState({ bairro: text })
    }
    setCep = (text) => {
        this.setState({ cep: text })
    }
    setCidade = (text) => {
        this.setState({ cidade: text })
    }
    setEstado = (text) => {
        this.setState({ estado: text })
    }
    setFone = (text) => {
        this.setState({ fone: text })
    }
    setPag = (text) => {
        this.setState({ pagamento: text })
    }
    setPrazo = (text) => {
        this.setState({ prazoentre: text })
    }
    setCpf = (text) => {
        this.setState({ cpf: text })
    }
    setRg = (text) => {
        this.setState({ rg: text })
    }
    setModelCar = (text) => {
        this.setState({ modelcar: text })
    }
    setPlacaCar = (text) => {
        this.setState({ placacar: text })
    }
    setLine = (text) => {
        this.setState({ upline: text })
    }
    constructor(props) {
        super(props);
    }

    colocarData = () => {
        const now = new Date()
        const mes = now.getMonth() + 1
        const ano = now.getFullYear()
        const dia = now.getDate()
        if (dia < 10 && mes < 10) {
            this.setState({ data: `0${dia}/0${mes}/${ano}` })
        } else if (dia > 10 && mes > 10) {
            this.setState({ data: `${dia}/${mes}/${ano}` })
        } else if (dia < 10 && mes >= 10) {
            this.setState({ data: `0${dia}/${mes}/${ano}` })
        } else if (dia >= 10 && mes < 10) {
            this.setState({ data: `${dia}/0${mes}/${ano}` })
        }
    }

    addQuanti = (text) => {
        this.setState({ quantidade: text })
    }

    addDescri = (text) => {
        this.setState({ descricao: text })
    }

    addValorunico = (text) => {
        this.setState({ valorunico: text })
    }

    addValortotal = (text) => {
        this.setState({ valortotal: text })
    }

    updateTotal = () => {
        const tabela = { ...this.state.tabela }
        const listTotal = [
            Number(tabela.line1.valorTot.split(",", 1)),
            Number(tabela.line2.valorTot.split(",", 1)),
            Number(tabela.line3.valorTot.split(",", 1)),
            Number(tabela.line4.valorTot.split(",", 1)),
            Number(tabela.line5.valorTot.split(",", 1)),
            Number(tabela.line6.valorTot.split(",", 1)),
            Number(tabela.line7.valorTot.split(",", 1)),
            Number(tabela.line8.valorTot.split(",", 1)),
            Number(tabela.line9.valorTot.split(",", 1)),
            Number(tabela.line10.valorTot.split(",", 1)),
            Number(tabela.line11.valorTot.split(",", 1)),
            Number(tabela.line12.valorTot.split(",", 1)),
            Number(tabela.line13.valorTot.split(",", 1)),
            Number(tabela.line14.valorTot.split(",", 1)),
            Number(tabela.line15.valorTot.split(",", 1))
        ]

        const newTotal = listTotal.reduce(function(total, valor) {
            return total + valor
        })
        tabela.somatotal = newTotal
        tabela.somatotalformat = `${tabela.somatotal},00 R$`
        this.setState({ tabela })
    }

    updateLine = () => {
        const quantidade = this.state.quantidade
        const descricao = this.state.descricao
        const valorunico = this.state.valorunico
        const valortotal = this.state.valortotal
        const line = this.state.upline
        const tabela = { ...this.state.tabela }
        if (line === '1') {
            tabela.line1.quant = quantidade
            tabela.line1.descr = descricao
            tabela.line1.valorUn = `${valorunico},00 R$`
            tabela.line1.valorTot = `${valortotal},00 R$`
            this.setState({ tabela })
            this.updateTotal()
            this.updateTotal()
        } else if (line === '2') {
            tabela.line2.quant = quantidade
            tabela.line2.descr = descricao
            tabela.line2.valorUn = `${valorunico},00 R$`
            tabela.line2.valorTot = `${valortotal},00 R$`
            this.setState({ tabela })
            this.updateTotal()
        } else if (line === '3') {
            tabela.line3.quant = quantidade
            tabela.line3.descr = descricao
            tabela.line3.valorUn = `${valorunico},00 R$`
            tabela.line3.valorTot = `${valortotal},00 R$`
            this.setState({ tabela })
            this.updateTotal()
        } else if (line === '4') {
            tabela.line4.quant = quantidade
            tabela.line4.descr = descricao
            tabela.line4.valorUn = `${valorunico},00 R$`
            tabela.line4.valorTot = `${valortotal},00 R$`
            this.setState({ tabela })
            this.updateTotal()
        } else if (line === '5') {
            tabela.line5.quant = quantidade
            tabela.line5.descr = descricao
            tabela.line5.valorUn = `${valorunico},00 R$`
            tabela.line5.valorTot = `${valortotal},00 R$`
            this.setState({ tabela })
            this.updateTotal()
        } else if (line === '6') {
            tabela.line6.quant = quantidade
            tabela.line6.descr = descricao
            tabela.line6.valorUn = `${valorunico},00 R$`
            tabela.line6.valorTot = `${valortotal},00 R$`
            this.setState({ tabela })
            this.updateTotal()
        } else if (line === '7') {
            tabela.line7.quant = quantidade
            tabela.line7.descr = descricao
            tabela.line7.valorUn = `${valorunico},00 R$`
            tabela.line7.valorTot = `${valortotal},00 R$`
            this.setState({ tabela })
            this.updateTotal()
        } else if (line === '8') {
            tabela.line8.quant = quantidade
            tabela.line8.descr = descricao
            tabela.line8.valorUn = `${valorunico},00 R$`
            tabela.line8.valorTot = `${valortotal},00 R$`
            this.setState({ tabela })
            this.updateTotal()
        } else if (line === '9') {
            tabela.line9.quant = quantidade
            tabela.line9.descr = descricao
            tabela.line9.valorUn = `${valorunico},00 R$`
            tabela.line9.valorTot = `${valortotal},00 R$`
            this.setState({ tabela })
            this.updateTotal()
        } else if (line === '10') {
            tabela.line10.quant = quantidade
            tabela.line10.descr = descricao
            tabela.line10.valorUn = `${valorunico},00 R$`
            tabela.line10.valorTot = `${valortotal},00 R$`
            this.setState({ tabela })
            this.updateTotal()
        } else if (line === '11') {
            tabela.line11.quant = quantidade
            tabela.line11.descr = descricao
            tabela.line11.valorUn = `${valorunico},00 R$`
            tabela.line11.valorTot = `${valortotal},00 R$`
            this.setState({ tabela })
            this.updateTotal()
        } else if (line === '12') {
            tabela.line12.quant = quantidade
            tabela.line12.descr = descricao
            tabela.line12.valorUn = `${valorunico},00 R$`
            tabela.line12.valorTot = `${valortotal},00 R$`
            this.setState({ tabela })
            this.updateTotal()
        } else if (line === '13') {
            tabela.line13.quant = quantidade
            tabela.line13.descr = descricao
            tabela.line13.valorUn = `${valorunico},00 R$`
            tabela.line13.valorTot = `${valortotal},00 R$`
            this.setState({ tabela })
            this.updateTotal()
        } else if (line === '14') {
            tabela.line14.quant = quantidade
            tabela.line14.descr = descricao
            tabela.line14.valorUn = `${valorunico},00 R$`
            tabela.line14.valorTot = `${valortotal},00 R$`
            this.setState({ tabela })
            this.updateTotal()
        } else if (line === '15') {
            tabela.line15.quant = quantidade
            tabela.line15.descr = descricao
            tabela.line15.valorUn = `${valorunico},00 R$`
            tabela.line15.valorTot = `${valortotal},00 R$`
            this.setState({ tabela })
            this.updateTotal()
        } else {
            alert('Linha não existe!!')
        }
    }

    addLine = () => {
        const quantidade = this.state.quantidade
        const descricao = this.state.descricao
        const valorunico = this.state.valorunico
        const valortotal = this.state.valortotal
        const tabela = { ...this.state.tabela }
        if (!tabela.line1.descr) {
            tabela.line1.quant = quantidade
            tabela.line1.descr = descricao
            tabela.line1.valorUn = `${valorunico},00 R$`
            tabela.line1.valorTot = `${valortotal},00 R$`
            tabela.somatotal += Number(valortotal)
            tabela.somatotalformat = `${tabela.somatotal},00 R$`
            this.setState({ tabela })
        } else if (!tabela.line2.descr) {
            tabela.line2.quant = quantidade
            tabela.line2.descr = descricao
            tabela.line2.valorUn = `${valorunico},00 R$`
            tabela.line2.valorTot = `${valortotal},00 R$`
            this.setState({ tabela })
            this.updateTotal()
        } else if (!tabela.line3.descr) {
            tabela.line3.quant = quantidade
            tabela.line3.descr = descricao
            tabela.line3.valorUn = `${valorunico},00 R$`
            tabela.line3.valorTot = `${valortotal},00 R$`
            this.setState({ tabela })
            this.updateTotal()
        } else if (!tabela.line4.descr) {
            tabela.line4.quant = quantidade
            tabela.line4.descr = descricao
            tabela.line4.valorUn = `${valorunico},00 R$`
            tabela.line4.valorTot = `${valortotal},00 R$`
            this.setState({ tabela })
            this.updateTotal()
        } else if (!tabela.line5.descr) {
            tabela.line5.quant = quantidade
            tabela.line5.descr = descricao
            tabela.line5.valorUn = `${valorunico},00 R$`
            tabela.line5.valorTot = `${valortotal},00 R$`
            this.setState({ tabela })
            this.updateTotal()
        } else if (!tabela.line6.descr) {
            tabela.line6.quant = quantidade
            tabela.line6.descr = descricao
            tabela.line6.valorUn = `${valorunico},00 R$`
            tabela.line6.valorTot = `${valortotal},00 R$`
            this.setState({ tabela })
            this.updateTotal()
        } else if (!tabela.line7.descr) {
            tabela.line7.quant = quantidade
            tabela.line7.descr = descricao
            tabela.line7.valorUn = `${valorunico},00 R$`
            tabela.line7.valorTot = `${valortotal},00 R$`
            this.setState({ tabela })
            this.updateTotal()
        } else if (!tabela.line8.descr) {
            tabela.line8.quant = quantidade
            tabela.line8.descr = descricao
            tabela.line8.valorUn = `${valorunico},00 R$`
            tabela.line8.valorTot = `${valortotal},00 R$`
            this.setState({ tabela })
            this.updateTotal()
        } else if (!tabela.line9.descr) {
            tabela.line9.quant = quantidade
            tabela.line9.descr = descricao
            tabela.line9.valorUn = `${valorunico},00 R$`
            tabela.line9.valorTot = `${valortotal},00 R$`
            this.setState({ tabela })
            this.updateTotal()
        } else if (!tabela.line10.descr) {
            tabela.line10.quant = quantidade
            tabela.line10.descr = descricao
            tabela.line10.valorUn = `${valorunico},00 R$`
            tabela.line10.valorTot = `${valortotal},00 R$`
            this.setState({ tabela })
            this.updateTotal()
        } else if (!tabela.line11.descr) {
            tabela.line11.quant = quantidade
            tabela.line11.descr = descricao
            tabela.line11.valorUn = `${valorunico},00 R$`
            tabela.line11.valorTot = `${valortotal},00 R$`
            this.setState({ tabela })
            this.updateTotal()
        } else if (!tabela.line12.descr) {
            tabela.line12.quant = quantidade
            tabela.line12.descr = descricao
            tabela.line12.valorUn = `${valorunico},00 R$`
            tabela.line12.valorTot = `${valortotal},00 R$`
            this.setState({ tabela })
            this.updateTotal()
        } else if (!tabela.line13.descr) {
            tabela.line13.quant = quantidade
            tabela.line13.descr = descricao
            tabela.line13.valorUn = `${valorunico},00 R$`
            tabela.line13.valorTot = `${valortotal},00 R$`
            this.setState({ tabela })
            this.updateTotal()
        } else if (!tabela.line14.descr) {
            tabela.line14.quant = quantidade
            tabela.line14.descr = descricao
            tabela.line14.valorUn = `${valorunico},00 R$`
            tabela.line14.valorTot = `${valortotal},00 R$`
            this.setState({ tabela })
            this.updateTotal()
        } else if (!tabela.line15.descr) {
            tabela.line15.quant = quantidade
            tabela.line15.descr = descricao
            tabela.line15.valorUn = `${valorunico},00 R$`
            tabela.line15.valorTot = `${valortotal},00 R$`
            this.setState({ tabela })
            this.updateTotal()
        } else {
            alert('Acabaram as Linhas!!')
        }
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
                    alert(`WRITE_EXTERNAL_STORAGE permission denied `);
                }
            } catch (err) {
                alert('Write permission err', err);
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
            //Content to print
            html:
                `<style>
        header {
            grid-area: cabecalho;
            display: flex;
            justify-content: space-between;
            border-radius: 10px;
            border: solid 1px #000;
            width: 800px;
            height: 200px;
            overflow: hidden;
            border-bottom: none;
        }

        main {
            grid-area: meio;
            border-radius: 10px;
            border: solid 1px #000;
            width: 800px;
            height: 250px;
            overflow: hidden;
            border-bottom: none;
        }

        footer {
            grid-area: tabela;
            border-radius: 7px;
            border: solid 1px #000;
            width: 800px;
            height: 512px;
            overflow: hidden;
            border-left: none;
            border-right: none;
            border-bottom: none;
        }

        body {
            grid-template-areas:
                'cabecalho'
                'meio'
                'tabela';
        }

        img {
            padding: 25px 0px 40px 0px;
        }

        main table {
            padding: 5px;
        }

        main td {
            display: inline-block;
            vertical-align: 19px;
        }

        footer table {
            border-collapse: collapse;
        }

        footer thead tr {
            border: solid 2px #444;
            height: 30px;
            text-align: center;
        }

        th {
            border: solid 1px #444;
        }

        .extende {
            padding: 0px 130px 0px 0px;
        }

        .extende1 {
            padding: 0px 75px 0px 0px;
        }

        .info {
            margin: 0;
            float: right;
            text-align: center;
            padding: 25px;
        }

        .data {
            width: 400px;
            border: solid 1px #000;
            margin-top: -2px;
            margin-bottom: -4px;
            margin-right: -2px;
            overflow: hidden;
        }

        .data div {
            border: solid 1px #000;
            padding: 0px 0px 50px 0px;
            margin-left: -4px;
        }

        .numerodata {
            display: flex;
            font-size: 20px;
            margin: 0;
            padding: 40% 0px 0px 10px;
        }

        .font {
            margin: 0;
            padding: 7px;
            text-align: center;
            width: 600px;
            border: solid 1px #000;
            border-left: none;
            border-right: none;
            border-bottom: none;
        }

        .menupdf {
            padding: 20px;
            width: 400px;
        }

        .total {
            text-align: end;
            padding-right: 10px;
        }

        .entrada {
            display: flex;
            flex-direction: column;
            flex-wrap: wrap;
            border: solid 2px #444;
            padding: 50px;
            justify-items: center;
        }

        .add {
            border: solid 1px #444;
            padding: 30px;
        }

        .boto {
            height: 100px;
            width: 100px;
        }
    </style>
    <div id="orcamento">
        <header>
            <div>
                <img src="https://docs.google.com/uc?id=1NZGbjI92g0Oci3fOfJ_7GyDju8zYWkBa" alt="PersonalCar" width="300" height="100">
                <p class="info">W.CESAR RODRIGUES<br>
                    ACESSORIOS AUTOMOTIVOS<br><br>
                    <i style="color:rgb(55, 216, 23);" class="fa d-inline fa-lg fa-whatsapp"></i>
                    (45) <b>99953-5458</b><br><br>
                    <i class="fa fa-envelope"></i>
                    wrc.rodrigues82@hotmail.com
                </p>
                <p class="font"><b>Rua Manoel Ribas, 3615 - CEP: 85811-130 - Cancelli - Cascavel/PR</b></p>
            </div>
            <div class="data">
                <div>
                    <input type="radio" name="tipo" value="Pedido">PEDIDO<br>
                    <input type="radio" name="tipo" value="Orçamento">ORÇAMENTO
                </div>
                <nav class="numerodata">Data: <section id="date">${this.state.data}</section>
                </nav>
            </div>
        </header>
        <main>
            <div>
                <table>
                    <tr>
                        <td>Cliente:</td>
                        <td id="nome">${this.state.name}</td>
                    </tr>
                    <tr>
                        <td>Endereço:</td>
                        <td class="extende" id="ende">${this.state.endereco}</td>
                        <td>N:</td>
                        <td class="extende" id="nume">${this.state.casanum}</td>
                        <td>Bairro:</td>
                        <td class="extende" id="bairro">${this.state.bairro}</td>
                    </tr>
                    <tr>
                        <td>CEP:</td>
                        <td class="extende" id="cep">${this.state.cep}</td>
                        <td>Cidade:</td>
                        <td class="extende" id="cida">${this.state.cidade}</td>
                        <td>Est.:</td>
                        <td class="extende" id="esta">${this.state.estado}</td>
                    </tr>
                    <tr>
                        <td>Fone:</td>
                        <td class="extende1" id="fone">${this.state.fone}</td>
                        <td>Cond. de Pagto.:</td>
                        <td class="extende1" id="pagto">${this.state.pagamento}</td>
                        <td>Prazo de Entrega:</td>
                        <td class="extende1" id="prazo">${this.state.prazoentre}</td>
                    </tr>
                    <tr>
                        <td>CNPJ/CPF:</td>
                        <td class="extende" id="cpf">${this.state.cpf}</td>
                        <td>Inscr. Est./ RG:</td>
                        <td class="extende" id="rg">${this.state.rg}</td>
                    </tr>
                    <tr>
                        <td>Modelo:</td>
                        <td class="extende" id="carro">${this.state.modelcar}</td>
                        <td>Placa:</td>
                        <td class="extende" id="placa">${this.state.placacar}</td>
                    </tr>
                </table>
            </div>
        </main>
        <footer>
            <table border="1">
                <thead>
                    <tr>
                        <th class="total2" width="90">QTDE.</th>
                        <th class="total2" width="400">DESCRIÇÂO</th>
                        <th class="total2" width="90">V.UNIT.</th>
                        <th class="total2" width="210">TOTAL</th>
                    </tr>
                    <tr id="id1">
                        <td celula>${this.state.tabela.line1.quant}</td>
                        <td celula>${this.state.tabela.line1.descr}</td>
                        <td celula>${this.state.tabela.line1.valorUn}</td>
                        <td celula>${this.state.tabela.line1.valorTot}</td>
                    </tr>
                    <tr id="id2">
                        <td celula>${this.state.tabela.line2.quant}</td>
                        <td celula>${this.state.tabela.line2.descr}</td>
                        <td celula>${this.state.tabela.line2.valorUn}</td>
                        <td celula>${this.state.tabela.line2.valorTot}</td>
                    </tr>
                    <tr id="id3">
                        <td celula>${this.state.tabela.line3.quant}</td>
                        <td celula>${this.state.tabela.line3.descr}</td>
                        <td celula>${this.state.tabela.line3.valorUn}</td>
                        <td celula>${this.state.tabela.line3.valorTot}</td>
                    </tr>
                    <tr id="id4">
                        <td celula>${this.state.tabela.line4.quant}</td>
                        <td celula>${this.state.tabela.line4.descr}</td>
                        <td celula>${this.state.tabela.line4.valorUn}</td>
                        <td celula>${this.state.tabela.line4.valorTot}</td>
                    </tr>
                    <tr id="id5">
                        <td celula>${this.state.tabela.line5.quant}</td>
                        <td celula>${this.state.tabela.line5.descr}</td>
                        <td celula>${this.state.tabela.line5.valorUn}</td>
                        <td celula>${this.state.tabela.line5.valorTot}</td>
                    </tr>
                    <tr id="id6">
                        <td celula>${this.state.tabela.line6.quant}</td>
                        <td celula>${this.state.tabela.line6.descr}</td>
                        <td celula>${this.state.tabela.line6.valorUn}</td>
                        <td celula>${this.state.tabela.line6.valorTot}</td>
                    </tr>
                    <tr id="id7">
                        <td celula>${this.state.tabela.line7.quant}</td>
                        <td celula>${this.state.tabela.line7.descr}</td>
                        <td celula>${this.state.tabela.line7.valorUn}</td>
                        <td celula>${this.state.tabela.line7.valorTot}</td>
                    </tr>
                    <tr id="id8">
                        <td celula>${this.state.tabela.line8.quant}</td>
                        <td celula>${this.state.tabela.line8.descr}</td>
                        <td celula>${this.state.tabela.line8.valorUn}</td>
                        <td celula>${this.state.tabela.line8.valorTot}</td>
                    </tr>
                    <tr id="id9">
                        <td celula>${this.state.tabela.line9.quant}</td>
                        <td celula>${this.state.tabela.line9.descr}</td>
                        <td celula>${this.state.tabela.line9.valorUn}</td>
                        <td celula>${this.state.tabela.line9.valorTot}</td>
                    </tr>
                        <td celula>${this.state.tabela.line10.quant}</td>
                        <td celula>${this.state.tabela.line10.descr}</td>
                        <td celula>${this.state.tabela.line10.valorUn}</td>
                        <td celula>${this.state.tabela.line10.valorTot}</td>
                    </tr>
                    <tr id="id11">
                        <td celula>${this.state.tabela.line11.quant}</td>
                        <td celula>${this.state.tabela.line11.descr}</td>
                        <td celula>${this.state.tabela.line11.valorUn}</td>
                        <td celula>${this.state.tabela.line11.valorTot}</td>
                    </tr>
                    <tr id="id12">
                        <td celula>${this.state.tabela.line12.quant}</td>
                        <td celula>${this.state.tabela.line12.descr}</td>
                        <td celula>${this.state.tabela.line12.valorUn}</td>
                        <td celula>${this.state.tabela.line12.valorTot}</td>
                    </tr>
                    <tr id="id13">
                        <td celula>${this.state.tabela.line13.quant}</td>
                        <td celula>${this.state.tabela.line13.descr}</td>
                        <td celula>${this.state.tabela.line13.valorUn}</td>
                        <td celula>${this.state.tabela.line13.valorTot}</td>
                    </tr>
                    <tr id="id14">
                        <td celula>${this.state.tabela.line14.quant}</td>
                        <td celula>${this.state.tabela.line14.descr}</td>
                        <td celula>${this.state.tabela.line14.valorUn}</td>
                        <td celula>${this.state.tabela.line14.valorTot}</td>
                    </tr>
                    <tr id="id15">
                        <td celula>${this.state.tabela.line15.quant}</td>
                        <td celula>${this.state.tabela.line15.descr}</td>
                        <td celula>${this.state.tabela.line15.valorUn}</td>
                        <td celula>${this.state.tabela.line15.valorTot}</td>
                    </tr>
                    <tr>
                        <td class="total" colspan="3">TOTAL R$</td>
                        <td id="total">${this.state.tabela.somatotalformat}</td>
                    </tr>
                </thead>
            </table>
        </footer>
        <div>
            <h5 style="margin:0;">Faça seu orçamento em pdf - whatsapp(45)99978-9334</h5>
        </div>
    </div>`,
            //File Name
            fileName: `${Date.now()}_Orçamento`,
            //File directory
            directory: 'Documents/orcamentos',
        };
        let file = await RNHTMLtoPDF.convert(options);
        this.setState({ filePath: file.filePath });
    }
    render() {
        return (
            <View style={styles.Header}>
                <View style={styles.Top}>
                    <Text style={styles.TextTop}>Criador Orçamentos em PDF - Personal Car</Text>
                </View>
                <ScrollView keyboardShouldPersistTaps="handled">
                    <View style={styles.MainContainer}>
                        <View style={styles.Data}>
                            <TextInput style={styles.TextInputData} value={this.state.data} placeholder="Data" onChangeText={this.setData} />
                            <TouchableOpacity style={styles.Button} onPress={this.colocarData}>
                                <Text style={styles.TextButton}>Data Atual</Text>
                            </TouchableOpacity>
                        </View>
                        <TextInput style={styles.TextInput} placeholder="Nome do cliente" onChangeText={this.setName} />
                        <TextInput style={styles.TextInput} placeholder="Endereço" onChangeText={this.setEndereco} />
                        <TextInput style={styles.TextInput} keyboardType="numeric" placeholder="Numero da casa" onChangeText={this.setCasaNum} />
                        <TextInput style={styles.TextInput} placeholder="Bairro" onChangeText={this.setBairro} />
                        <TextInput style={styles.TextInput} keyboardType="numeric" placeholder="CEP" onChangeText={this.setCep} />
                        <TextInput style={styles.TextInput} placeholder="Cidade" onChangeText={this.setCidade} />
                        <TextInput style={styles.TextInput} placeholder="Estado" onChangeText={this.setEstado} />
                        <TextInput style={styles.TextInput} keyboardType="numeric" placeholder="Fone" onChangeText={this.setFone} />
                        <TextInput style={styles.TextInput} placeholder="Condição de pagamento" onChangeText={this.setPag} />
                        <TextInput style={styles.TextInput} placeholder="Prazo de entrega" onChangeText={this.setPrazo} />
                        <TextInput style={styles.TextInput} keyboardType="numeric" placeholder="CNPJ/CFP" onChangeText={this.setCpf} />
                        <TextInput style={styles.TextInput} keyboardType="numeric" placeholder="Inscr. Est./ RG" onChangeText={this.setRg} />
                        <TextInput style={styles.TextInput} placeholder="Modelo do carro" onChangeText={this.setModelCar} />
                        <TextInput style={styles.TextInput} placeholder="Placa do carro" onChangeText={this.setPlacaCar} />
                    </View>
                    <View style={styles.ContainerTable}>
                        <View style={styles.Tr}>
                            <Text style={styles.Tdq}>QTD</Text>
                            <Text style={styles.Tdd}>DESCRIÇÂO</Text>
                            <Text style={styles.Tdu}>V.UNIT</Text>
                            <Text style={styles.Tdt}>TOTAL</Text>
                        </View>
                        <View style={styles.Tr}>
                            <Text style={styles.Tdq}>{this.state.tabela.line1.quant}</Text>
                            <Text style={styles.Tdd}>{this.state.tabela.line1.descr}</Text>
                            <Text style={styles.Tdu}>{this.state.tabela.line1.valorUn}</Text>
                            <Text style={styles.Tdt}>{this.state.tabela.line1.valorTot}</Text>
                        </View>
                        <View style={styles.Tr}>
                            <Text style={styles.Tdq}>{this.state.tabela.line2.quant}</Text>
                            <Text style={styles.Tdd}>{this.state.tabela.line2.descr}</Text>
                            <Text style={styles.Tdu}>{this.state.tabela.line2.valorUn}</Text>
                            <Text style={styles.Tdt}>{this.state.tabela.line2.valorTot}</Text>
                        </View>
                        <View style={styles.Tr}>
                            <Text style={styles.Tdq}>{this.state.tabela.line3.quant}</Text>
                            <Text style={styles.Tdd}>{this.state.tabela.line3.descr}</Text>
                            <Text style={styles.Tdu}>{this.state.tabela.line3.valorUn}</Text>
                            <Text style={styles.Tdt}>{this.state.tabela.line3.valorTot}</Text>
                        </View>
                        <View style={styles.Tr}>
                            <Text style={styles.Tdq}>{this.state.tabela.line4.quant}</Text>
                            <Text style={styles.Tdd}>{this.state.tabela.line4.descr}</Text>
                            <Text style={styles.Tdu}>{this.state.tabela.line4.valorUn}</Text>
                            <Text style={styles.Tdt}>{this.state.tabela.line4.valorTot}</Text>
                        </View>
                        <View style={styles.Tr}>
                            <Text style={styles.Tdq}>{this.state.tabela.line5.quant}</Text>
                            <Text style={styles.Tdd}>{this.state.tabela.line5.descr}</Text>
                            <Text style={styles.Tdu}>{this.state.tabela.line5.valorUn}</Text>
                            <Text style={styles.Tdt}>{this.state.tabela.line5.valorTot}</Text>
                        </View>
                        <View style={styles.Tr}>
                            <Text style={styles.Tdq}>{this.state.tabela.line6.quant}</Text>
                            <Text style={styles.Tdd}>{this.state.tabela.line6.descr}</Text>
                            <Text style={styles.Tdu}>{this.state.tabela.line6.valorUn}</Text>
                            <Text style={styles.Tdt}>{this.state.tabela.line6.valorTot}</Text>
                        </View>
                        <View style={styles.Tr}>
                            <Text style={styles.Tdq}>{this.state.tabela.line7.quant}</Text>
                            <Text style={styles.Tdd}>{this.state.tabela.line7.descr}</Text>
                            <Text style={styles.Tdu}>{this.state.tabela.line7.valorUn}</Text>
                            <Text style={styles.Tdt}>{this.state.tabela.line7.valorTot}</Text>
                        </View>
                        <View style={styles.Tr}>
                            <Text style={styles.Tdq}>{this.state.tabela.line8.quant}</Text>
                            <Text style={styles.Tdd}>{this.state.tabela.line8.descr}</Text>
                            <Text style={styles.Tdu}>{this.state.tabela.line8.valorUn}</Text>
                            <Text style={styles.Tdt}>{this.state.tabela.line8.valorTot}</Text>
                        </View>
                        <View style={styles.Tr}>
                            <Text style={styles.Tdq}>{this.state.tabela.line9.quant}</Text>
                            <Text style={styles.Tdd}>{this.state.tabela.line9.descr}</Text>
                            <Text style={styles.Tdu}>{this.state.tabela.line9.valorUn}</Text>
                            <Text style={styles.Tdt}>{this.state.tabela.line9.valorTot}</Text>
                        </View>
                        <View style={styles.Tr}>
                            <Text style={styles.Tdq}>{this.state.tabela.line10.quant}</Text>
                            <Text style={styles.Tdd}>{this.state.tabela.line10.descr}</Text>
                            <Text style={styles.Tdu}>{this.state.tabela.line10.valorUn}</Text>
                            <Text style={styles.Tdt}>{this.state.tabela.line10.valorTot}</Text>
                        </View>
                        <View style={styles.Tr}>
                            <Text style={styles.Tdq}>{this.state.tabela.line11.quant}</Text>
                            <Text style={styles.Tdd}>{this.state.tabela.line11.descr}</Text>
                            <Text style={styles.Tdu}>{this.state.tabela.line11.valorUn}</Text>
                            <Text style={styles.Tdt}>{this.state.tabela.line11.valorTot}</Text>
                        </View>
                        <View style={styles.Tr}>
                            <Text style={styles.Tdq}>{this.state.tabela.line12.quant}</Text>
                            <Text style={styles.Tdd}>{this.state.tabela.line12.descr}</Text>
                            <Text style={styles.Tdu}>{this.state.tabela.line12.valorUn}</Text>
                            <Text style={styles.Tdt}>{this.state.tabela.line12.valorTot}</Text>
                        </View>
                        <View style={styles.Tr}>
                            <Text style={styles.Tdq}>{this.state.tabela.line13.quant}</Text>
                            <Text style={styles.Tdd}>{this.state.tabela.line13.descr}</Text>
                            <Text style={styles.Tdu}>{this.state.tabela.line13.valorUn}</Text>
                            <Text style={styles.Tdt}>{this.state.tabela.line13.valorTot}</Text>
                        </View>
                        <View style={styles.Tr}>
                            <Text style={styles.Tdq}>{this.state.tabela.line14.quant}</Text>
                            <Text style={styles.Tdd}>{this.state.tabela.line14.descr}</Text>
                            <Text style={styles.Tdu}>{this.state.tabela.line14.valorUn}</Text>
                            <Text style={styles.Tdt}>{this.state.tabela.line14.valorTot}</Text>
                        </View>
                        <View style={styles.Tr}>
                            <Text style={styles.Tdq}>{this.state.tabela.line15.quant}</Text>
                            <Text style={styles.Tdd}>{this.state.tabela.line15.descr}</Text>
                            <Text style={styles.Tdu}>{this.state.tabela.line15.valorUn}</Text>
                            <Text style={styles.Tdt}>{this.state.tabela.line15.valorTot}</Text>
                        </View>
                        <View style={styles.Tr}>
                            <Text style={styles.Tdq}></Text>
                            <Text style={styles.Tdd}></Text>
                            <Text style={styles.Tdu}>TOTAL R$</Text>
                            <Text style={styles.Tdt}>{this.state.tabela.somatotalformat}</Text>
                        </View>
                    </View>
                    <View style={styles.Table}>
                        <TextInput style={styles.TableLine} keyboardType="numeric" placeholder="Informe a linha para alteração" onChangeText={this.setLine} />
                        <TextInput style={styles.TableLine} keyboardType="numeric" placeholder="Quantidade" onChangeText={this.addQuanti} />
                        <TextInput style={styles.TableLine} placeholder="Descrição do serviços" onChangeText={this.addDescri} />
                        <TextInput style={styles.TableLine} keyboardType="numeric" placeholder="Valor Unico" onChangeText={this.addValorunico} />
                        <TextInput style={styles.TableLine} keyboardType="numeric" placeholder="Valor Total" onChangeText={this.addValortotal} />
                        <View style={styles.ButtonFinish}>
                            <TouchableOpacity style={styles.Button} onPress={this.addLine}>
                                <Text style={styles.TextButton}>Adicionar na linha</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.ButtonFinish}>
                            <TouchableOpacity style={styles.Button} onPress={this.updateLine}>
                                <Text style={styles.TextButton}>Alterar a linha</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.PdfButton}>
                        <TouchableOpacity onPress={this.askPermission.bind(this)}>
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
                        <Text style={styles.text}>{this.state.filePath}</Text>
                    </View>
                </ScrollView>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    MainContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    Header: {
        backgroundColor: '#2F4F4F',
    },
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
    Top: {
        top: 0,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,.9)"
    },
    TextTop: {
        color: "#fff",
        fontSize: 18
    },
    TextInput: {
        backgroundColor: "#fff",
        width: 300,
        margin: 10,
        borderRadius: 20
    },
    TextInputData: {
        backgroundColor: "#fff",
        width: 200,
        borderRadius: 20
    },
    Data: {
        flexDirection: "row",
        margin: 10
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