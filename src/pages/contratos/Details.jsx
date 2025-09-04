import { useState, useEffect } from "react"
import { FaCircleArrowLeft, FaCircleCheck, FaCircleXmark, FaFilePdf } from "react-icons/fa6"
import { useParams, useNavigate } from "react-router-dom"

function ContractDetails() {
  const { cnpj, ano, id } = useParams()

  const navigate = useNavigate()

  const [resultado, setResultado] = useState(null)
  const [erro, setErro] = useState("")
  const [loading, setLoading] = useState(true)

  const formatCpfCnpj = (value) => {
    if (!value) return "N/A"

    const digits = value.replace(/\D/g, "")

    if (digits.length === 11) {
      return digits.replace(
        /^(\d{3})(\d{3})(\d{3})(\d{2})$/,
        "$1.$2.$3-$4"
      )
    } else if (digits.length === 14) {
      return digits.replace(
        /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
        "$1.$2.$3/$4-$5"
      )
    }

    return value
  }

  const formatarSequencial = (sequencial) => {
    sequencial.toString()
    if (typeof sequencial === 'string' && sequencial.includes('/')){
      sequencial = sequencial.split('/')[0]
    }
    return sequencial.padStart(5, '0')
  }

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true)
      setErro("")
      try {
        const response = await fetch(`https://pncp.gov.br/pncp-api/v1/orgaos/${cnpj}/contratos/${ano}/${id}`)
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

  const dataAtual = new Date()
  const vencido = resultado?.dataVigenciaFim
    ? new Date(resultado.dataVigenciaFim) < dataAtual
    : false

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
                <p><strong className="font-bold">Contrato nº:</strong> { formatarSequencial(resultado.numeroContratoEmpenho) || "N/A" }/{ resultado.anoContrato || "N/A" }</p>
                <p><strong className="font-bold">Processo nº:</strong> { formatarSequencial(resultado.processo) || "N/A" }/{ resultado.anoContrato || "N/A" }</p>             
                <p><strong className="font-bold">Contratante:</strong> { resultado.unidadeOrgao?.nomeUnidade?.toUpperCase() || "N/A" }, CNPJ nº { formatCpfCnpj(resultado.orgaoEntidade?.cnpj) || "N/A" }</p>
                <p><strong className="font-bold">Contratado(a):</strong> { resultado.nomeRazaoSocialFornecedor || "N/A" }, CNPJ/CPF nº { formatCpfCnpj(resultado.niFornecedor) || "N/A" }</p>
                <p className="text-justify"><strong className="font-bold">Objeto do Contrato:</strong> { resultado.objetoContrato || "N/A" }.</p>              
              </div>

              <div className="w-full md:w-1/2 font-base flex flex-col gap-2.5" >              
                <p><strong className="font-bold">Valor do Contrato:</strong> { formatCurrency(resultado.valorGlobal) || 'N/A' }</p>
                <p><strong className="font-bold">Data Assinatura:</strong> { formatDate(resultado.dataAssinatura) }</p>
                <p><strong className="font-bold">Vigência:</strong> { formatDate(resultado.dataVigenciaInicio) } a { formatDate(resultado.dataVigenciaFim) }</p>
                <p><strong className="font-bold">Categoria:</strong> { resultado.categoriaProcesso?.nome || "N/A" }</p>
                <p className="flex gap-3"><strong className="font-bold">Status do Contrato: </strong>{vencido ? <span className="flex gap-2 text-red-600 font-bold"><FaCircleXmark className="text-xl" /> Vencido</span> : <span className="flex gap-2 text-green-600 font-bold"><FaCircleCheck className="text-xl" /> Virgente</span> }</p>  
                <p><strong className="font-bold">Data Publicação PNCP:</strong> { formatDate(resultado.dataPublicacaoPncp) }</p>
                <div className="py-5">
                  <a className="w-fit flex justify-center items-center gap-4 bg-blue-500 text-white font-semibold py-2 px-5 rounded-md hover:bg-blue-600 cursor-pointer" href={ `https://pncp.gov.br/pncp-api/v1/orgaos/${ cnpj }/contratos/${ ano }/${ id }/arquivos/1` } target="_blank" rel="noopener noreferrer">
                    <FaFilePdf className="text-2xl" /> Baixar Contrato
                  </a>
                </div>            
              </div>

            </div>          
          </div>
        </>        
      )}
      <div className="w-full flex justify-center md:justify-start items-center">
        <button
          onClick={() => navigate("/contratos")}
          className="w-32 flex justify-center items-center gap-4 bg-blue-500 text-white font-semibold p-2 rounded-md hover:bg-blue-600 cursor-pointer"
        >
          <FaCircleArrowLeft /> Voltar
        </button>
      </div>
    </div>
  )
}

export default ContractDetails