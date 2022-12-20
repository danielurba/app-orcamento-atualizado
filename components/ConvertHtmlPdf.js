import AsyncStorage from '@react-native-async-storage/async-storage';

export default async function convertHtmlToPdf(namePrevia) {
    let dadosNow = await AsyncStorage.getItem(namePrevia)
    let dataCompany = await AsyncStorage.getItem("dataCompany")
    dataCompany = JSON.parse(dataCompany)
    const logo = dataCompany.logo[0] ? dataCompany.logo[0].uri : "./sualogoaqui.png"
    dadosNow = JSON.parse(dadosNow)
    let linhasHtmlPecas = ""
    let linhasHtmlMaoDeObra = ""
    let totalOrcamento = 0
    let valorTotalPecas = 0
    let valorTotalMãoDeObra = 0
    let contLinesMaoDeObra = 0
    for (let i = 0; i < 15; i++) {
        if(i < dadosNow.dadosCliente.linhasPecas.length) {
            linhasHtmlPecas += '<tr id="id1">\n'
            for (let j = 1; j < dadosNow.dadosCliente.linhasPecas[i].length; j++) {
                if(j > 3) {
                    valorTotalPecas += Number(dadosNow.dadosCliente.linhasPecas[i][j])
                }
                if(j > 2) {
                    linhasHtmlPecas += `<td celula>R$ ${dadosNow.dadosCliente.linhasPecas[i][j]},00</td>\n`
                } else {
                    linhasHtmlPecas += `<td celula>${dadosNow.dadosCliente.linhasPecas[i][j]}</td>\n`
                }
                
            }
            linhasHtmlPecas += '</tr>\n'
        }
        else if(contLinesMaoDeObra < dadosNow.dadosCliente.linhasMaoDeObra.length) {
            linhasHtmlMaoDeObra += '<tr id="id1">\n'
            for (let j = 1; j < dadosNow.dadosCliente.linhasMaoDeObra[contLinesMaoDeObra].length; j++) {
                if(j > 3) {
                    valorTotalMãoDeObra += Number(dadosNow.dadosCliente.linhasMaoDeObra[contLinesMaoDeObra][j])
                }
                if(j > 2) {
                    linhasHtmlMaoDeObra += `<td celula>R$ ${dadosNow.dadosCliente.linhasMaoDeObra[contLinesMaoDeObra][j]},00</td>\n`
                } else {
                    linhasHtmlMaoDeObra += `<td celula>${dadosNow.dadosCliente.linhasMaoDeObra[contLinesMaoDeObra][j]}</td>\n`
                }
            }
            contLinesMaoDeObra++
            linhasHtmlMaoDeObra += '</tr>\n'
        }
        }
    totalOrcamento = valorTotalMãoDeObra + valorTotalPecas
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

    td {
        word-break: break-all;
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
        padding: 20px;
        width: 200px;
    }

    .data {
        width: 400px;
        border: solid 1px #000;
        margin-top: -2px;
        margin-bottom: -4px;
        margin-right: -2px;
        overflow: hidden;
        display: flex;
        justify-content: end;
        align-items: center;
        flex-direction: column;
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
    .infos-empresa {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .empresa {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .image {
        width: 250px;
        height: 120px;
        padding: 20px;
    }

    .image > img {
        width: 100%;
        height: 100%;
    }
</style>
<div id="orcamento">
    <header>
    <div class="empresa">
        <div class="infos-empresa">
            <div class="image">
                <img src="${logo}" alt="Logo">
            </div>
            <p class="info">${dataCompany.nomeEmpresa}<br><br>
                CNPJ:${dataCompany.cnpj}<br><br>
                <i style="color:rgb(55, 216, 23);" class="fa d-inline fa-lg fa-whatsapp"></i>
                <b>${dataCompany.telefone}</b><br><br>
                <i class="fa fa-envelope"></i>
                ${dataCompany.email}
            </p>
        </div>
        <p class="font"><b>${dataCompany.endereco}, ${dataCompany.numero} - CEP: ${dataCompany.cep} - ${dataCompany.bairro} - ${dataCompany.cidade}/${dataCompany.estado}</b></p>
    </div>
    <div class="data">
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
                    <td class="extende" id="cpf">${dadosNow.dadosCliente.cnpjCpf}</td>
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
                    <th class="total2" width="400">DESCRIÇÃO DE PEÇAS</th>
                    <th class="total2" width="90">V.UNIT.</th>
                    <th class="total2" width="210">TOTAL</th>
                </tr>
                ${linhasHtmlPecas}
                <tr>
                    <td class="total" colspan="3">VALOR TOTAL PEÇAS</td>
                    <td id="total">R$ ${String(valorTotalPecas)},00</td>
                </tr>
                <tr>
                    <td celula></td>
                    <td celula></td>
                    <td celula></td>
                    <td celula></td>
                </tr>
                <tr>
                    <th class="total2" width="90">QTDE.</th>
                    <th class="total2" width="400">DESCRIÇÃO DE MÃO DE OBRA</th>
                    <th class="total2" width="90">V.UNIT.</th>
                    <th class="total2" width="210">TOTAL</th>
                </tr>
                ${linhasHtmlMaoDeObra}
                <tr>
                    <td class="total" colspan="3">VALOR TOTAL MÃO DE OBRA</td>
                    <td id="total">R$ ${String(valorTotalMãoDeObra)},00</td>
                </tr>
                <tr>
                    <td celula></td>
                    <td celula></td>
                    <td celula></td>
                    <td celula></td>
                </tr>
                <tr>
                    <td class="total" colspan="3">VALOR TOTAL ORÇAMENTO</td>
                    <td id="total">R$ ${String(totalOrcamento)},00</td>
                </tr>
            </thead>
        </table>
    </footer>
</div>`
    return htmlOrcamento
}