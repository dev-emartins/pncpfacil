import { useState, useEffect } from "react"
import { FaCircleArrowLeft, FaCircleCheck, FaCircleXmark, FaFilePdf } from "react-icons/fa6"
import { useParams, useNavigate } from "react-router-dom"

function MinutesDetails() {
  const { cnpj, ano, id, sequencial } = useParams()  

  const navigate = useNavigate()

  console.log(cnpj, ano, sequencial, id)

  const [resultado, setResultado] = useState(null)
  const [erro, setErro] = useState("")
  const [loading, setLoading] = useState(true)

  const formatCNPJ = (cnpj) => {
    if (!cnpj) return "N/A";
    const digits = cnpj.replace(/\D/g, "")
    return digits.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5")
  }

  const formatarSequencial = (sequencial) => {
    return sequencial?.toString().padStart(5, '0') || "N/A";
  }

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true)
      setErro("")
      try {        
        const response = await fetch(`https://pncp.gov.br/pncp-api/v1/orgaos/${cnpj}/compras/${ano}/${id}/atas/${sequencial}`)
        if (!response.ok) {
          throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`)
        }
        const data = await response.json()
        setResultado(data)
      } catch (error) {
        setErro(error.message)
        console.error("Erro ao buscar dados:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchDetails()
  }, [cnpj, ano, id, sequencial])

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

  return (
    <div className="w-full flex flex-col gap-5">
      <h1 className="w-full bg-white p-5 rounded-lg shadow-md text-xl md:text-2xl font-bold">Detalhes da Ata de Registro de Preço</h1>

      {loading && (
        <div className="mt-4 p-4 bg-blue-100 text-blue-700 rounded-md w-full max-w-2xl">
          Aguarde carregando<span className="animate-ping">...</span>
        </div>
      )}

      {erro && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-md w-full max-w-2xl">
          {erro.includes("404") ? "Ata não encontrada. Verifique os parâmetros." : erro}
        </div>
      )}

      {resultado && (
        <>
          <h2 className="w-full bg-white p-5 rounded-lg shadow-md text-base md:text-xl text-center">
            {resultado.orgaoEntidade?.razaoSocial || "N/A"} - {resultado.unidadeOrgao?.ufSigla || "N/A"}
          </h2>
          <div className="w-full p-5 bg-white rounded-lg shadow-md">   
            <div className="flex md:flex-row flex-col justify-between items-stretch md:gap-8">
              <div className="w-full md:w-1/2 font-base flex flex-col gap-2.5">
                <p><strong className="font-bold">Ata nº:</strong> {resultado.numeroAtaRegistroPreco || "N/A"}/{resultado.anoAta || "N/A"}</p>
                <p><strong className="font-bold">Número Controle PNCP:</strong> {resultado.numeroControlePNCP || "N/A"}</p>             
                <p><strong className="font-bold">Órgão:</strong> {resultado.unidadeOrgao?.nomeUnidade?.toUpperCase() || "N/A"}, CNPJ nº {formatCNPJ(resultado.orgaoEntidade?.cnpj) || "N/A"}</p>
                <p><strong className="font-bold">Município:</strong> {resultado.unidadeOrgao?.municipioNome || "N/A"}/{resultado.unidadeOrgao?.ufSigla || "N/A"}</p>
                <p className="text-justify"><strong className="font-bold">Objeto da Compra:</strong> {resultado.objetoCompra || "N/A"}</p>
                <p><strong className="font-bold">Modalidade:</strong> {resultado.modalidadeNome || "N/A"}</p>
              </div>

              <div className="w-full md:w-1/2 font-base flex flex-col gap-2.5">              
                <p><strong className="font-bold">Data Assinatura:</strong> {formatDate(resultado.dataAssinatura) || "N/A"}</p>
                <p><strong className="font-bold">Vigência:</strong> {formatDate(resultado.dataVigenciaInicio) || "N/A"} a {formatDate(resultado.dataVigenciaFim) || "N/A"}</p>
                <p><strong className="font-bold">Data Publicação PNCP:</strong> {formatDate(resultado.dataPublicacaoPncp) || "N/A"}</p>
                <p><strong className="font-bold">Status:</strong> 
                  {resultado.cancelado ? 
                    <span className="flex gap-2 text-red-600 font-bold">
                      <FaCircleXmark className="text-xl" /> Cancelado
                    </span> : 
                    <span className="flex gap-2 text-green-600 font-bold">
                      <FaCircleCheck className="text-xl" /> Vigente
                    </span>
                  }
                </p>
                {resultado.cancelado && (
                  <p><strong className="font-bold">Data Cancelamento:</strong> {formatDate(resultado.dataCancelamento) || "N/A"}</p>
                )}
                <p><strong className="font-bold">Usuário Responsável:</strong> {resultado.usuarioNome || "N/A"}</p>
                <div className="py-5">
                  <a 
                    className="w-fit flex justify-center items-center gap-4 bg-blue-500 text-white font-semibold py-2 px-5 rounded-md hover:bg-blue-600 cursor-pointer" 
                    href={`https://pncp.gov.br/pncp-api/v1/orgaos/${cnpj}/atas/${ano}/${sequencial}/arquivos/1`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <FaFilePdf className="text-2xl" /> Baixar Ata
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

export default MinutesDetails