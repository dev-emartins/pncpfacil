import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { FaCircleArrowLeft, FaFilePdf, FaGlobe } from "react-icons/fa6"
import { useParams, useNavigate } from "react-router-dom"

function NoticesDetails() {
  const { cnpj, ano, id } = useParams()

  const navigate = useNavigate()

  const [resultado, setResultado] = useState(null)
  const [erro, setErro] = useState("")
  const [loading, setLoading] = useState(true)

  const formatCNPJ = (cnpj) => {
    if (!cnpj) return "N/A";
    const digits = cnpj.replace(/\D/g, "")
    return digits.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5")
  }

  const formatarSequencial = (sequencial) => {
    return sequencial.toString().padStart(5, '0');
  }

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true)
      setErro("")
      try {
        const response = await fetch(`https://pncp.gov.br/api/consulta/v1/orgaos/${cnpj}/compras/${ano}/${id}`)
        if (!response.ok) {
          throw new Error("Erro na requisição: " + response.status)
        }
        const data = await response.json()        
        setResultado(data)
      } catch (error) {
        setErro(error.message)
      } finally {
        setLoading(false)
      }
    }
    fetchDetails()
  }, [cnpj, ano, id])

  const formatCurrency = (value) => {
    if (!value) return "N/A"
    return new Intl.NumberFormat('pt-BR', {
      style: "currency",
      currency: 'BRL',
    }).format(value)
  }

  const formatDate = (date) => {
    if (!date) return "N/A"
    return new Intl.DateTimeFormat('pt-BR').format(new Date(date))
  }

  const formatDateComHora = (date) => {
    if (!date) return "N/A";
    
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    }).format(new Date(date))
  }

  const formatDateHoraMaisUmMinuto = (date) => {
    if (!date) return "N/A";  
    const dataObj = new Date(date);  
    dataObj.setTime(dataObj.getTime() + 60000);  
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    }).format(dataObj)
  }

  return (
    <div className="w-full flex flex-col gap-5">
      <h1 className="w-full bg-white p-5 rounded-lg shadow-md text-xl md:text-2xl font-bold">Detalhes da Contratação</h1>

      {loading && (
        <div className="mt-4 p-4 bg-blue-100 text-blue-700 rounded-md w-full max-w-2xl">
          Aguarde carregando<span className="animate-ping">...</span>
        </div>
      )}

      {erro && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-md w-full max-w-2xl">
          {erro}
        </div>
      )}

      {resultado && (
        <>
          <h2 className="w-full bg-white p-5 rounded-lg shadow-md text-base md:text-xl text-center">{ resultado.orgaoEntidade?.razaoSocial || "N/A" } - { resultado.unidadeOrgao?.ufSigla || "N/A" }</h2>
          <div className="w-full p-5 bg-white rounded-lg shadow-md">   
            <div className="flex md:flex-row flex-col justify-between items-stretch md:gap-8">

              <div className="w-full md:w-1/2 font-base flex flex-col gap-2.5" > 
                <p><strong>{ resultado.tipoInstrumentoConvocatorioNome || 'N/A' } nº: </strong>{ formatarSequencial(resultado.numeroCompra) || 'N/A'}/{ resultado.anoCompra|| 'N/A' }</p>
                <p><strong className="font-bold">Processo nº:</strong> { resultado.processo || "N/A" }</p>  
                <p><strong>Modalidade: </strong>{ resultado.modalidadeNome || 'N/A' }</p> 
                <p><strong>Modo Disputa: </strong>{ resultado.modoDisputaNome || 'N/A' }</p>          
                <p><strong>Órgão: </strong> { resultado.unidadeOrgao?.nomeUnidade?.toUpperCase() || "N/A" } ( { resultado.unidadeOrgao.municipioNome } - { resultado.unidadeOrgao?.ufSigla || "N/A" } )</p>
                <p><strong>CNPJ nº: </strong>{ formatCNPJ(resultado.orgaoEntidade?.cnpj) || "N/A" }</p>
                <p><strong className="font-bold">Valor Estimado:</strong> { formatCurrency(resultado.valorTotalEstimad) }</p>
              </div>

              <div className="w-full md:w-1/2 font-base flex flex-col gap-2.5" >
                <p><strong>Sigilo da Disputa: </strong>{ resultado.orcamentoSigilosoDescricao || 'N/A' }</p>
                <p><strong className="font-bold">Data da Publicação: </strong> { formatDate(resultado.dataPublicacaoPncp) || 'N/A' }</p>
                <p><strong className="font-bold">Data do Encerramento das Propostas: </strong> { formatDateComHora(resultado.dataEncerramentoProposta) || 'N/A' }</p>
                <p><strong className="font-bold">Data do Certame: </strong>{ formatDateHoraMaisUmMinuto(resultado.dataEncerramentoProposta) || 'N/A' }</p>
                <div className="pt-3">
                  {resultado.linkSistemaOrigem && (
                    <Link to={resultado.linkSistemaOrigem} target="_blank" className="inline-flex items-center gap-2 text-blue-600 hover:underline">
                      <FaGlobe className="text-xl" /> Abrir Licitação
                    </Link>
                  )}
                </div>               
                
                <div className="py-3">
                  <a 
                  className="w-fit flex justify-center items-center gap-4 bg-blue-500 text-white font-semibold py-2 px-5 rounded-md hover:bg-blue-600 cursor-pointer" 
                  href={ `https://pncp.gov.br/pncp-api/v1/orgaos/${ cnpj }/compras/${ ano }/${ id }/arquivos/1` } 
                  target="_blank" 
                  rel="noopener noreferrer"
                  >
                    <FaFilePdf className="text-2xl" /> Baixar Edital
                  </a>
                </div>            
              </div>

            </div>          
          </div>
        </>        
      )}
      <div className="w-full flex justify-center md:justify-start items-center">
        <button
          onClick={() => navigate("/")}
          className="w-32 flex justify-center items-center gap-4 bg-blue-500 text-white font-semibold p-2 rounded-md hover:bg-blue-600 cursor-pointer"
        >
          <FaCircleArrowLeft /> Voltar
        </button>
      </div>
    </div>
  )
}

export default NoticesDetails