import { NavLink } from "react-router-dom"
import Social from "@/components/social"
import logo2 from "@/assets/logo2.png"
import Logo from "../logo";

function Footer(){
    const currentYear = new Date().getFullYear();

    const pjuridica = [
        { name: "Cartão CNPJ", link: "https://solucoes.receita.fazenda.gov.br/Servicos/cnpjreva/cnpjreva_Solicitacao.asp" },
        { name: "Certidão Federal", link: "https://servicos.receitafederal.gov.br/servico/certidoes/#/home/cnpj" },
        { name: "Certidão FGTS/CRF", link: "https://consulta-crf.caixa.gov.br/consultacrf/pages/consultaEmpregador.jsf" },
        { name: "Certidão Trabalhista", link: "https://cndt-certidao.tst.jus.br/gerarCertidao.faces" }
    ]

    const pfisica = [
        { name: "Situação Cadastral", link: "https://servicos.receita.fazenda.gov.br/servicos/cpf/consultasituacao/consultapublica.asp" },
        { name: "Certidão Federal", link: "https://servicos.receitafederal.gov.br/servico/certidoes/#/home/cpf" },
        { name: "Certidão Trabalhista", link: "https://cndt-certidao.tst.jus.br/gerarCertidao.faces" }
    ]

    const juridica = [
        { name: "Eleitoral", link: "https://contasirregulares.tcu.gov.br/ordsext/f?p=105:21:0::NO:3,4,5,21:P21_FINS_ELEITORAIS:N" },
        { name: "Inabilitados e Inidôneos", link: "https://contas.tcu.gov.br/ords/f?p=1660:3:5040568678855::::P3_TIPO_RELACAO:INABILITADO" },
        { name: "Consulta Consolidada", link: "https://certidoes-apf.apps.tcu.gov.br/" }
    ]
  return (
    <footer className="w-full bg-blue-900 shadow-md flex flex-col justify-center items-center">
      <div className="w-full max-w-7xl p-5">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Certidões Jurídicas */}
          <div>
            <h3 className="text-lg text-gray-100 font-semibold mb-4">Pessoa Jurídica</h3>
            <ul className="space-y-2 text-sm">
              {
                pjuridica.map((item, index) => (
                  <li key={ index }><NavLink to={ item.link } target="_blank" className="text-gray-300 hover:text-gray-200">{ item.name }</NavLink></li>
                ))
              }
            </ul>
          </div>

          {/* Certidões Físicas */}
          <div>
            <h3 className="text-lg text-gray-100 font-semibold mb-4">Pessoa Física</h3>
            <ul className="space-y-2 text-sm">
              {
                pfisica.map((item, index) => (
                  <li key={ index }><NavLink to={ item.link } target="_blank" className="text-gray-300 hover:text-gray-200">{ item.name }</NavLink></li>
                ))
              }
            </ul>
          </div>

          {/* Certidões Judiciais */}
          <div>
            <h3 className="text-lg text-gray-100 font-semibold mb-4">Judiciais</h3>
            <ul className="space-y-2 text-sm">
              {
                juridica.map((item, index) => (
                  <li key={ index }><NavLink to={ item.link } target="_blank" className="text-gray-300 hover:text-gray-200">{ item.name }</NavLink></li>
                ))
              }
            </ul>
          </div>

          {/* Redes Sociais */}
          <div> 
            <div className="py-5">
              <Logo logo={ logo2 } size="w-32" />
            </div>           
            <Social color={ "text-gray-300 hover:text-gray-200" } />            
          </div>
        </div>        
      </div>
      <div className="w-full bg-blue-950/20 p-2">
        <p className="text-gray-100 text-center text-xs">&copy; PNCP Fácil - { currentYear } - Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer