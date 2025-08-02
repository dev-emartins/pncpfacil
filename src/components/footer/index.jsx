import { FaEnvelope, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa6"
import { NavLink, Link } from "react-router-dom"

function Footer(){
    const currentYear = new Date().getFullYear();
  return (
    <footer className="w-full bg-blue-900 flex flex-col justify-center items-center">
      <div className="w-full max-w-6xl p-5">
        <h2 className="text-lg text-gray-100 font-semibold mb-4">Certidões</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Certidões Jurídicas */}
          <div>
            <h3 className="text-sm text-gray-100 font-semibold mb-4">Pessoa Jurídica</h3>
            <ul className="space-y-2">
              <li><NavLink to="https://solucoes.receita.fazenda.gov.br/Servicos/cnpjreva/cnpjreva_Solicitacao.asp" target="_blank" className="text-gray-300 hover:text-gray-200">Cartão CNPJ</NavLink></li>
              <li><NavLink to="https://servicos.receitafederal.gov.br/servico/certidoes/#/home/cnpj" target="_blank" className="text-gray-300 hover:text-gray-200">Certidão Federal</NavLink></li>
              <li><NavLink to="https://consulta-crf.caixa.gov.br/consultacrf/pages/consultaEmpregador.jsf" target="_blank" className="text-gray-300 hover:text-gray-200">Certidão FGTS/CRF</NavLink></li>
              <li><NavLink to="https://cndt-certidao.tst.jus.br/gerarCertidao.faces" target="_blank" className="text-gray-300 hover:text-gray-200">Certidão Trabalhista</NavLink></li>
            </ul>
          </div>

          {/* Certidões Físicas */}
          <div>
            <h3 className="text-sm text-gray-100 font-semibold mb-4">Pessoa Física</h3>
            <ul className="space-y-2">
              <li><NavLink to="https://servicos.receita.fazenda.gov.br/servicos/cpf/consultasituacao/consultapublica.asp" target="_blank" className="text-gray-300 hover:text-gray-200">Situação Cadastral</NavLink></li>
              <li><NavLink to="https://servicos.receitafederal.gov.br/servico/certidoes/#/home/cpf" target="_blank" className="text-gray-300 hover:text-gray-200">Certidão Federal</NavLink></li>
              <li><NavLink to="https://cndt-certidao.tst.jus.br/gerarCertidao.faces" target="_blank" className="text-gray-300 hover:text-gray-200">Certidão Trabalhista</NavLink></li>
            </ul>
          </div>

          {/* Certidões Judiciais */}
          <div>
            <h3 className="text-sm text-gray-100 font-semibold mb-4">Judiciais</h3>
            <ul className="space-y-2">
              <li><NavLink to="https://contasirregulares.tcu.gov.br/ordsext/f?p=105:21:0::NO:3,4,5,21:P21_FINS_ELEITORAIS:N" className="text-gray-300 hover:text-gray-200">Eleitoral</NavLink></li>
              <li><NavLink to="https://contas.tcu.gov.br/ords/f?p=1660:3:5040568678855::::P3_TIPO_RELACAO:INABILITADO" className="text-gray-300 hover:text-gray-200">Inabilitados e Inidôneos</NavLink></li>
              <li><NavLink to="https://certidoes-apf.apps.tcu.gov.br/" className="text-gray-300 hover:text-gray-200">Consulta Consolidada</NavLink></li>
            </ul>
          </div>

          {/* Redes Sociais */}
          <div>
            <h3 className="text-sm text-gray-100 font-semibold mb-4">Siga-me</h3>
            <div className="flex space-x-4">
              <Link to="mailto:everaldoinfortecnico@gmail.com" target="_blank" className="text-gray-300 hover:text-gray-200">
                <FaEnvelope className="text-2xl" />
              </Link>
              <Link to="https://www.instagram.com/dev_emartins" target="_blank" className="text-gray-300 hover:text-gray-200">
                <FaInstagram className="text-2xl" />
              </Link>
              <Link to="https://www.linkedin.com/in/everaldomartins" target="_blank" className="text-gray-300 hover:text-gray-200">
                <FaLinkedin className="text-2xl" />
              </Link>
              <Link to="https://github.com/dev-emartins" target="_blank" className="text-gray-300 hover:text-gray-200">
                <FaGithub className="text-2xl" />
              </Link>
            </div>
          </div>
        </div>        
      </div>
      <div className="w-full bg-blue-950/20 p-2">
        <p className="text-gray-100 text-center">&copy; PNCP Fácil - { currentYear } - Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer