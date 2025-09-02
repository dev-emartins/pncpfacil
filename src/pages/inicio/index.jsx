import { useEffect, useState, useCallback } from "react"
import { Link } from "react-router-dom"
import { FaFileContract, FaFileLines, FaGavel } from "react-icons/fa6"
import ButtonLink from "@/components/buttonlink"
import debounce from "lodash/debounce"

function Home() {
  const [dataInicial, setDataInicial] = useState("")
  const [dataFinal, setDataFinal] = useState("")
  const [resultado, setResultado] = useState([])
  const [erro, setErro] = useState("")
  const [loading, setLoading] = useState(false)
  const [pagina, setPagina] = useState(1)
  const [totalPaginas, setTotalPaginas] = useState(1)

  const TAMANHO_PAGINA = 10
  const modalidade = 6

  const formatDate = (date) => date.toISOString().split("T")[0].replace(/-/g, "")

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

  const formatDateBR = (dateString) => {
    if (!dateString) return "N/A";
    
    const ano = dateString.substring(0, 4)
    const mes = dateString.substring(4, 6)
    const dia = dateString.substring(6, 8)
    
    return `${dia}/${mes}/${ano}`
  }

  const formatDateBr = (dataString) => {
    if (!dataString) return "N/A"
    
    const data = new Date(dataString)
    const dia = String(data.getDate()).padStart(2, '0')
    const mes = String(data.getMonth() + 1).padStart(2, '0')
    const ano = data.getFullYear()

    return `${dia}/${mes}/${ano}`
  }

  useEffect(() => {
    const hoje = new Date()
    const quinzeDiasAtras = new Date(hoje)
    quinzeDiasAtras.setDate(hoje.getDate() - 15)
    setDataInicial(formatDate(quinzeDiasAtras))
    setDataFinal(formatDate(hoje))
  }, [])

  const validateDates = () => {
    if (!dataInicial || !dataFinal) return false;
    const initialDate = new Date(dataInicial.substring(0, 4), dataInicial.substring(4, 6) - 1, dataInicial.substring(6, 8))
    const finalDate = new Date(dataFinal.substring(0, 4), dataFinal.substring(4, 6) - 1, dataFinal.substring(6, 8))
    if (initialDate > finalDate) {
      setErro("A data inicial deve ser anterior à data final")
      return false
    }
    return true
  }

  const buscar = useCallback(debounce(async (paginaAtual = 1) => {
    if (!validateDates()) return

    setLoading(true)
    setErro("")
    setResultado([])

    try {
      const url = new URL("https://pncp.gov.br/api/consulta/v1/contratacoes/publicacao")
      url.searchParams.append("dataInicial", dataInicial)
      url.searchParams.append("dataFinal", dataFinal)
      url.searchParams.append("codigoModalidadeContratacao", modalidade)
      url.searchParams.append("tamanhoPagina", TAMANHO_PAGINA)
      url.searchParams.append("pagina", paginaAtual)

      const response = await fetch(url, {
        headers: { 'Accept': 'application/json' }
      })

      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`)
      }

      const data = await response.json()
      setResultado(data.data || [])
      setTotalPaginas(data.totalPaginas || 1)
      setPagina(paginaAtual)
    } catch (error) {
      setErro(
        error.message.includes("JSON.parse") || error.message.includes("Unexpected end")
          ? "Nenhuma licitação encontrada para o período especificado."
          : `Erro ao buscar processos: ${error.message}`
      );
      console.error('Erro na busca:', error)
    } finally {
      setLoading(false)
    }
  }, 500), [dataInicial, dataFinal, modalidade])

  useEffect(() => {
    if (dataInicial && dataFinal) buscar(pagina)
  }, [dataInicial, dataFinal, pagina, buscar])

  const SkeletonLoader = () => (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 animate-pulse">
      {[...Array(10)].map((_, index) => (
        <div key={index} className="p-5 bg-white rounded-lg shadow-md">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
        </div>
      ))}
      <div className="flex justify-center gap-3 mt-5">
            <button
              disabled={pagina <= 1 || loading}
              onClick={() => setPagina((p) => p - 1)}
              className="bg-gray-300 px-3 py-1 rounded disabled:opacity-50"
            >
              Anterior
            </button>
            <span>
              Página {pagina} de {totalPaginas}
            </span>
            <button
              disabled={pagina >= totalPaginas || loading}
              onClick={() => setPagina((p) => p + 1)}
              className="bg-gray-300 px-3 py-1 rounded disabled:opacity-50"
            >
              Próxima
            </button>
          </div>
    </div>
  )

  return (
    <div className="w-full flex flex-col items-center gap-5">
      {/* Cabeçalho */}
      <div className="w-full bg-white p-5 rounded-lg shadow-md">
        <h1 className="text-xl md:text-2xl font-black text-center pb-5">Consultar Processos</h1>
        <div className="w-full flex flex-col md:flex-row justify-center items-stretch md:itens-center gap-4">
          <ButtonLink icon={FaGavel} text="Compras" link="/editais" />
          <ButtonLink icon={FaFileLines} text="Atas de Registro de Preço" link="/atas" />
          <ButtonLink icon={FaFileContract} text="Contrato" link="/contratos" />
        </div>
      </div>
      
      {erro && <div className="p-4 bg-red-100 text-red-700 rounded-md">{erro}</div>}

      {loading && <SkeletonLoader />}
      
      {!loading && resultado.length > 0 && (
        <div className="w-full flex flex-col gap-5">
          <h2 className="text-xl text-center font-bold bg-white p-5 rounded-lg shadow-md">
            Pregões - Eletrônicos publicados no período de { formatDateBR(dataInicial) } à { formatDateBR(dataFinal) }
          </h2>

          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {resultado.map((item, index) => (
              <li
                key={index}
                className="p-5 border-b-2 border-b-gray-300/20 bg-white rounded-lg shadow-md hover:-translate-y-1"
              >
                <Link to={`/detalhes/${item.orgaoEntidade?.cnpj}/${item.anoCompra}/${item.sequencialCompra}`}>
                  <p><strong>{item.tipoInstrumentoConvocatorioNome || "N/A"} nº: </strong>{ formatarSequencial(item.numeroCompra) || "N/A"}/{item.anoCompra || "N/A"}</p>
                  <p><strong>Processo nº </strong>{formatarSequencial(item.processo)}</p>
                  <p><strong>Modalidade: </strong>{item.modalidadeNome}</p>
                  <p><strong>Órgão: </strong>{item.orgaoEntidade?.razaoSocial || "N/A"}/{item.unidadeOrgao?.ufSigla || "N/A"}</p>
                  <p><strong>CNPJ nº: </strong>{formatCpfCnpj(item.orgaoEntidade?.cnpj) || "N/A"}</p>
                  <p className="text-justify"><strong>Objeto:</strong> {item.objetoCompra || "N/A"}</p>
                  <p><strong>Data da Publicação: </strong>{ formatDateBr(item.dataPublicacaoPncp) }</p>
                </Link>
              </li>
            ))}
          </ul>
          
          <div className="flex justify-center gap-3 mt-5">
            <button
              disabled={pagina <= 1 || loading}
              onClick={() => setPagina((p) => p - 1)}
              className="bg-gray-300 px-3 py-1 rounded disabled:opacity-50"
            >
              Anterior
            </button>
            <span>
              Página {pagina} de {totalPaginas}
            </span>
            <button
              disabled={pagina >= totalPaginas || loading}
              onClick={() => setPagina((p) => p + 1)}
              className="bg-gray-300 px-3 py-1 rounded disabled:opacity-50"
            >
              Próxima
            </button>
          </div>
        </div>
      )}
      {!loading && resultado.length === 0 && !erro && dataInicial && dataFinal && (
        <div className="w-full p-4 bg-yellow-100 text-yellow-700 rounded-md">
          Nenhuma licitação encontrada para o período de {formatDateBR(dataInicial)} à {formatDateBR(dataFinal)}
        </div>
      )}
    </div>
  );
}

export default Home;