import { useState, useCallback } from "react"

function Minutes() {
  const [dataInicial, setDataInicial] = useState("")
  const [dataFinal, setDataFinal] = useState("")
  const [cnpj, setCnpj] = useState("")
  const [atas, setAtas] = useState([])
  const [loading, setLoading] = useState(false)
  const [totalPaginas, setTotalPaginas] = useState(0)
  const [pagina, setPagina] = useState(1)
  const [erro, setErro] = useState("")
  const tamanhoPagina = 10

  const formatDate = (dateString) => {
    if (!dateString) return ""
    return dateString.replace(/-/g, "")
  }

  const formatCNPJ = (cnpj) => {
    if (!cnpj) return "N/A"
    const cleaned = cnpj.replace(/\D/g, "")
    if (cleaned.length !== 14) return cnpj
    return cleaned.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5")
  }

  const formatarSequencial = (numero) => {
    if (!numero) return "N/A"
    return numero.toString().padStart(4, '0')
  }

  function formatarDataBrasil(data) {
    if (!data) return "N/A"

    const [datePart] = data.toString().split('T')
    const [year, month, day] = datePart.split('-')    

    const dataLocal = new Date(year, month - 1, day);
    
    return dataLocal.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  const formatDateDisplay = (dateString) => {
    if (!dateString) return "N/A"
    try {
      return new Date(dateString).toLocaleDateString("pt-BR")
    } catch {
      return dateString
    }
  }

  const fetchAtas = useCallback(async (page) => {
    if (!dataInicial || !dataFinal) {
      setErro("Por favor, preencha as datas inicial e final")
      return { atas: [], totalPaginas: 0 }
    }

    let url = `https://pncp.gov.br/api/consulta/v1/atas?dataInicial=${formatDate(dataInicial)}&dataFinal=${formatDate(dataFinal)}&tamanhoPagina=${tamanhoPagina}&pagina=${page}`
    
    if (cnpj.trim()) {
      url += `&cnpjOrgao=${cnpj.replace(/\D/g, "")}`
    }

    try {
      setLoading(true)
      setErro("")
      const response = await fetch(url, {
        headers: {
          'Accept': 'application/json',
        }
      })

      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`)
      }

      const data = await response.json()
      
      return {
        atas: data.data || [],
        totalPaginas: data.totalPaginas || 0
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Erro desconhecido na consulta"
      setErro(errorMessage)
      return { atas: [], totalPaginas: 0 }
    } finally {
      setLoading(false)
    }
  }, [dataInicial, dataFinal, cnpj])

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault()
    setAtas([])
    
    const result = await fetchAtas(1)
    if (result.totalPaginas === 0) {
      setPagina(1)
      setTotalPaginas(0)
      setErro("Não foram encontradas atas no período selecionado")
      return
    }

    setTotalPaginas(result.totalPaginas)
    setPagina(result.totalPaginas)
    
    const lastPageResult = await fetchAtas(result.totalPaginas)
    setAtas(lastPageResult.atas)
  }, [fetchAtas])

  const buscar = useCallback(async (page) => {
    setPagina(page)
    const result = await fetchAtas(page)
    setAtas(result.atas)
  }, [fetchAtas])

  return (
    <div className="w-full flex flex-col items-center gap-5">      
      <div className="w-full bg-white p-5 rounded-lg shadow-md">
        <h1 className="text-xl md:text-2xl font-black text-center pb-5">
          Consultar Atas
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4 md:space-x-4 md:flex md:flex-row md:items-center gap-5">
          
          <div className="w-full md:w-1/4">
            <label className="block text-sm font-medium text-gray-700">Data Inicial:</label>
            <input
              type="date"
              value={dataInicial}
              onChange={(e) => setDataInicial(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="w-full md:w-1/4">
            <label className="block text-sm font-medium text-gray-700">Data Final:</label>
            <input
              type="date"
              value={dataFinal}
              onChange={(e) => setDataFinal(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="w-full md:w-1/4">
            <label className="block text-sm font-medium text-gray-700 relative">
              CNPJ:<span className="text-[9px] text-blue-600 absolute top-0 left-12">opcional</span>
            </label>
            <input
              type="text"
              value={cnpj}
              onChange={(e) => setCnpj(e.target.value.replace(/\D/g, ""))}
              placeholder="Ex: 12345678000190"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="w-full md:w-1/3">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-500 text-white font-semibold p-2 rounded-md hover:bg-blue-600 disabled:bg-blue-300"
            >
              {loading ? (
                <>
                  Carregando<span className="animate-ping">...</span>
                </>
              ) : (
                "Consultar"
              )}
            </button>
          </div>
        </form>
      </div>

      {erro && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-md w-full max-w-md">
          {erro}
        </div>
      )}

      {atas.length > 0 && (
        <div className="w-full flex flex-col gap-5">
          <h2 className="text-xl text-center font-bold bg-white p-5 rounded-lg shadow-md w-full">
            Resultados no período de { formatarDataBrasil(dataInicial)} à { formatarDataBrasil(dataFinal) }
          </h2>
          <ul className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
            {atas.map((item, index) => (
              <li
                key={index}
                className="p-5 border-b-2 border-b-gray-300/20 bg-white rounded-lg shadow-md hover:-translate-y-1 transition-transform"
              >
                <p>
                  <strong>ARP nº: </strong> {formatarSequencial(item.numeroAtaRegistroPreco)}/
                  {item.anoAta || "N/A"}
                </p>
                <p>
                  <strong>Órgão: </strong> {item.nomeOrgao || "N/A"}
                </p>
                <p>
                  <strong>CNPJ:</strong> {formatCNPJ(item.cnpjOrgao)}
                </p>
                <p>
                  <strong>Controle PNCP:</strong> {item.numeroControlePNCPAta || "N/A"}
                </p>
                <p>
                  <strong>Assinatura:</strong> {formatDateDisplay(item.dataAssinatura)}
                </p>
                <p>
                  <strong>Vigência:</strong> {formatDateDisplay(item.vigenciaInicio)} até {formatDateDisplay(item.vigenciaFim)}
                </p>
                <p className="text-justify mt-2">
                  <strong>Objeto:</strong> {item.objetoContratacao || "N/A"}
                </p>
                {item.cancelado && (
                  <span className="inline-block mt-2 px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded">
                    Cancelada
                  </span>
                )}
              </li>
            ))}
          </ul>

         <div className="flex justify-center gap-3 mt-5">
            <button
              disabled={ pagina >= totalPaginas || loading }
              onClick={() => { setPagina(p => p + 1); buscar(pagina + 1); }}
              className="bg-gray-300 px-3 py-1 rounded disabled:opacity-50"
            >
              Mais recente
            </button>
            <span>Página { (totalPaginas + 1) - pagina } de { totalPaginas }</span>
            <button
              disabled={pagina <= 1 || loading}
              onClick={() => { setPagina(p => p - 1); buscar(pagina - 1); }}
              className="bg-gray-300 px-3 py-1 rounded disabled:opacity-50"
            >
              Mais antiga
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Minutes