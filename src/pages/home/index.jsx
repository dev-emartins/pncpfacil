import { useEffect, useState, useCallback } from "react"
import { Link } from "react-router-dom"
import { FaFileContract, FaFileLines, FaGavel } from "react-icons/fa6"
import ButtonLink from "@/components/buttonlink"

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

  const formatCNPJ = (valor) => valor
      ? valor.replace(/\D/g, "").replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5")
      : ""

  useEffect(() => {
    const hoje = new Date()
    const quinzeDiasAtras = new Date(hoje)
    quinzeDiasAtras.setDate(hoje.getDate() - 15)
    setDataInicial(formatDate(quinzeDiasAtras))
    setDataFinal(formatDate(hoje))
  }, [])

  const buscar = useCallback(
    async (paginaAtual = pagina) => {
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

        const response = await fetch(url);
        if (!response.ok) throw new Error(`Erro na requisição: ${response.status}`);

        const data = await response.json();
        setResultado(data.data || []);
        setTotalPaginas(data.totalPaginas || 1);
      } catch (error) {
        setErro(
          error.message.includes("JSON.parse") || error.message.includes("Unexpected end")
            ? "Nenhuma licitação encontrada."
            : error.message
        );
      } finally {
        setLoading(false);
      }
    },
    [dataInicial, dataFinal, modalidade, pagina]
  )

  useEffect(() => {
    if (dataInicial && dataFinal) buscar(pagina)
  }, [dataInicial, dataFinal, modalidade, pagina, buscar])

  return (
    <div className="w-full flex flex-col items-center gap-5">
      {/* Cabeçalho */}
      <div className="w-full bg-white p-5 rounded-lg shadow-md">
        <h1 className="text-xl md:text-2xl font-black text-center pb-5">Consultar Processos</h1>
        <div className="w-full flex justify-center items-center gap-4">
          <ButtonLink icon={FaGavel} text="Compras" link="/notices" />
          <ButtonLink icon={FaFileLines} text="Atas de Registro de Preço" link="/minutes" />
          <ButtonLink icon={FaFileContract} text="Contrato" link="/contract" />
        </div>
      </div>

      {/* Mensagem de erro */}
      {erro && <div className="p-4 bg-red-100 text-red-700 rounded-md">{erro}</div>}

      {/* Lista de resultados */}
      {resultado.length > 0 && (
        <div className="w-full flex flex-col gap-5">
          <h2 className="text-xl text-center font-bold bg-white p-5 rounded-lg shadow-md">
            Resultados no período de { formatDateBR(dataInicial) } à { formatDateBR(dataFinal) }
          </h2>

          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {resultado.map((item, index) => (
              <li
                key={index}
                className="p-5 border-b-2 border-b-gray-300/20 bg-white rounded-lg shadow-md hover:-translate-y-1"
              >
                <Link
                  to={`/notices/details/${item.orgaoEntidade?.cnpj}/${item.anoCompra}/${item.sequencialCompra}`}
                >
                  <p>
                    <strong>{item.tipoInstrumentoConvocatorioNome || "N/A"} nº: </strong>
                    {item.numeroCompra || "N/A"}/{item.anoCompra || "N/A"}
                  </p>
                  <p>
                    <strong>Processo nº </strong>
                    {item.processo}
                  </p>
                  <p>
                    <strong>Modalidade: </strong>
                    {item.modalidadeNome}
                  </p>
                  <p>
                    <strong>Órgão: </strong>
                    {item.orgaoEntidade?.razaoSocial || "N/A"}/{item.unidadeOrgao?.ufSigla || "N/A"}
                  </p>
                  <p>
                    <strong>CNPJ nº: </strong>
                    {formatCNPJ(item.orgaoEntidade?.cnpj) || "N/A"}
                  </p>
                  <p className="text-justify">
                    <strong>Objeto:</strong> {item.objetoCompra || "N/A"}
                  </p>
                  <p>
                    <strong>Data da Publicação: </strong>
                    { formatDateBr(item.dataPublicacaoPncp) }
                  </p>
                </Link>
              </li>
            ))}
          </ul>

          {/* Paginação */}
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
    </div>
  );
}

export default Home;