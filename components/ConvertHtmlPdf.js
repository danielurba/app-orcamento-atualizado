import AsyncStorage from '@react-native-async-storage/async-storage';

export default async function convertHtmlToPdf(namePrevia) {
    let dadosNow = await AsyncStorage.getItem(namePrevia)
    dadosNow = JSON.parse(dadosNow)
    let linhasHtml = ""
    for (let i = 0; i < dadosNow.dadosCliente.linhas.length; i++) {
        linhasHtml = linhasHtml + '<tr id="id1">'
        for (let j = 1; j < dadosNow.dadosCliente.linhas[i].length; j++) {
            linhasHtml = linhasHtml + `<td celula>${dadosNow.dadosCliente.linhas[i][j]}</td>`
        }
        linhasHtml = linhasHtml + '</tr>'
    }
    let htmlOrcamento = `<style>
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
            <nav class="numerodata">Data: <section id="date">${dadosNow.dadosCliente.data}</section>
            </nav>
        </div>
    </header>
    <main>
        <div>
            <table>
                <tr>
                    <td>Cliente:</td>
                    <td id="nome">${dadosNow.dadosCliente.nome}</td>
                </tr>
                <tr>
                    <td>Endereço:</td>
                    <td class="extende" id="ende">${dadosNow.dadosCliente.endereco}</td>
                    <td>N:</td>
                    <td class="extende" id="nume">${dadosNow.dadosCliente.numero}</td>
                    <td>Bairro:</td>
                    <td class="extende" id="bairro">${dadosNow.dadosCliente.bairro}</td>
                </tr>
                <tr>
                    <td>CEP:</td>
                    <td class="extende" id="cep">${dadosNow.dadosCliente.cep}</td>
                    <td>Cidade:</td>
                    <td class="extende" id="cida">${dadosNow.dadosCliente.cidade}</td>
                    <td>Est.:</td>
                    <td class="extende" id="esta">${dadosNow.dadosCliente.estado}</td>
                </tr>
                <tr>
                    <td>Fone:</td>
                    <td class="extende1" id="fone">${dadosNow.dadosCliente.fone}</td>
                    <td>Cond. de Pagto.:</td>
                    <td class="extende1" id="pagto">${dadosNow.dadosCliente.condPag}</td>
                    <td>Prazo de Entrega:</td>
                    <td class="extende1" id="prazo">${dadosNow.dadosCliente.prazoEntrega}</td>
                </tr>
                <tr>
                    <td>CNPJ/CPF:</td>
                    <td class="extende" id="cpf">${dadosNow.dadosCliente.cpnjCpf}</td>
                    <td>Inscr. Est./ RG:</td>
                    <td class="extende" id="rg">${dadosNow.dadosCliente.rg}</td>
                </tr>
                <tr>
                    <td>Modelo:</td>
                    <td class="extende" id="carro">${dadosNow.dadosCliente.modeloCarro}</td>
                    <td>Placa:</td>
                    <td class="extende" id="placa">${dadosNow.dadosCliente.placaCarro}</td>
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
                ${linhasHtml}
                <tr>
                    <td class="total" colspan="3">TOTAL R$</td>
                    <td id="total"></td>
                </tr>
            </thead>
        </table>
    </footer>
    <div>
        <h5 style="margin:0;">Faça seu orçamento em pdf - whatsapp(45)99978-9334</h5>
    </div>
</div>`
    return htmlOrcamento
}