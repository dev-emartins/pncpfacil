import { useState } from 'react'
import { Link } from 'react-router-dom'

function Notices(){
  const [cnpj, setCnpj] = useState('')
  const [modalidade, setModalidade] = useState(4)
  const [dataInicial, setDataInicial] = useState('')
  const [dataFinal, setDataFinal] = useState('')
  const [resultado, setResultado] = useState([])
  const [erro, setErro] = useState('')
  const [loading, setLoading] = useState(false)
  const [pagina, setPagina] = useState(1)
  const [totalPaginas, setTotalPaginas] = useState(1)

  const formatDate = (dateStr) => dateStr.replaceAll('-', '')

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

  const buscar = async (paginaAtual = pagina) => {
    setLoading(true)
    setErro('')
    setResultado([])

    try {
      const url = new URL('https://pncp.gov.br/api/consulta/v1/contratacoes/publicacao')
      url.searchParams.append('dataInicial', formatDate(dataInicial))
      url.searchParams.append('dataFinal', formatDate(dataFinal))
      url.searchParams.append('codigoModalidadeContratacao', modalidade)
      if (cnpj) url.searchParams.append('cnpj', cnpj)
      url.searchParams.append('tamanhoPagina', 10)
      url.searchParams.append('pagina', paginaAtual.toString())      

      const response = await fetch(url)
      if (!response.ok) throw new Error('Erro na requisição: ' + response.status)
      const data = await response.json()

      console.log(data)

      setResultado(data.data || [])
      setTotalPaginas(data.totalPaginas || 1)
    } catch (error) {
      if (error.message.includes("JSON.parse") || error.message.includes("Unexpected end of JSON input")) {
        setErro("Nenhuma licitação encontrada.");
      } else {
        setErro(error.message);
      }
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setPagina(1)
    buscar(1)
  }

  const opcoesModalidade = [  
    { value: 4, label: "Concorrência - Eletrônica" },
    { value: 5, label: "Concorrência - Presencial" }, 
    { value: 3, label: "Concurso" },
    { value: 12, label: "Credenciamento" },
    { value: 8, label: "Dispensa" },
    { value: 9, label: "Inexigibilidade" },
    { value: 1, label: "Leilão - Eletrônico" },
    { value: 13, label: "Leilão - Presencial" },    
    { value: 10, label: "Manifestação de Interesse" },
    { value: 11, label: "Pré-qualificação" },
    { value: 6, label: "Pregão - Eletrônico" },
    { value: 7, label: "Pregão - Presencial" }
  ]

  return (
    <div className="w-full flex flex-col items-center gap-5">
      { /* FORM */ }
      <div className="w-full bg-white p-5 rounded-lg shadow-md">
        <h1 className="text-xl md:text-2xl font-black text-center pb-5">
          Consultar Contratações
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4 md:space-x-4 md:flex md:flex-row md:items-center gap-5">
          { /* campos */ }          
          <div className='w-full md:w-1/4'>
            <label className="block text-sm font-medium text-gray-700">Data Inicial:</label>
            <input
              type="date"
              value={ dataInicial }
              onChange={ (e) => setDataInicial(e.target.value) }
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className='w-full md:w-1/4'>
            <label className="block text-sm font-medium text-gray-700">Data Final:</label>
            <input
              type="date"
              value={ dataFinal }
              onChange={ (e) => setDataFinal(e.target.value) }
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className='w-full md:w-1/4'>
            <label className="block text-sm font-medium text-gray-700 relative">
              Modalidade:
            </label>
            <select 
              className="mt-1 block w-full p-2.5 border border-gray-300 rounded-md"
              value={ modalidade } 
              onChange={(e) => setModalidade(e.target.value)}
            >
              {opcoesModalidade.map((op, i) => (
                <option key={i} value={op.value}>
                  {op.label}
                </option>
              ))}
            </select>
          </div>
          <div className='w-full md:w-1/4'>
            <label className="block text-sm font-medium text-gray-700 relative">
              CNPJ:<span className="text-[9px] text-blue-600 absolute top-0 left-12">opcional</span>
            </label>
            <input
              type="text"
              value={ cnpj }
              onChange={ (e) => setCnpj(e.target.value.replace(/\D/g, '')) }
              placeholder="Ex: 12345678000190"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className='w-full md:w-1/4'>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-500 text-white font-semibold p-2 rounded-md hover:bg-blue-600 disabled:bg-blue-300"
            >
              {loading ? <>Carregando<span className="animate-ping">...</span></> : 'Consultar'}
            </button>
          </div>
        </form>
      </div>

      { /* ERRO */ }
      { erro && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 text-center rounded-md w-full max-w-md">
          {erro}
        </div>
      ) }

      {/* RESULTADOS */}
      {resultado.length > 0 && (
        <div className="w-full flex flex-col gap-5">
          <h2 className="text-xl text-center font-bold bg-white p-5 rounded-lg shadow-md w-full">
            Resultados no período de { formatarDataBrasil(dataInicial)} à {formatarDataBrasil(dataFinal) }
          </h2>
          <ul className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
            { resultado.map((item, index) => (
              <li key={index} className='p-5 border-b-2 border-b-gray-300/20 bg-white rounded-lg shadow-md hover:-translate-y-1'>
                <Link to={`/notices/details/${ cnpj || item.orgaoEntidade?.cnpj }/${ item.anoCompra }/${ item.sequencialCompra }`}>
                  <p><strong>{ item.tipoInstrumentoConvocatorioNome || 'N/A' } nº: </strong>{ item.numeroCompra || 'N/A'}/{ item.anoCompra|| 'N/A' }</p>
                  <p><strong>Processo nº </strong>{ item.processo }</p>
                  <p><strong>Modalidade: </strong>{ item.modalidadeNome }</p>
                  <p><strong>Órgão: </strong> { item.orgaoEntidade?.razaoSocial || 'N/A' }/{ item.unidadeOrgao?.ufSigla || 'N/A' }</p>
                  <p><strong>CNPJ nº: </strong> { item.orgaoEntidade?.cnpj || 'N/A' }</p>
                  <p className='text-justify'><strong>Objeto:</strong> { item.objetoCompra || 'N/A'}</p>
                  <p><strong>Data da Publicação: </strong>{ formatarDataBrasil(item.dataPublicacaoPncp) }</p>
                </Link>
              </li>
            )) }
          </ul>

          { /* PAGINAÇÃO */ }
          <div className="flex justify-center gap-3 mt-5">
            <button
              disabled={ pagina <= 1 || loading }
              onClick={() => { setPagina(p => p - 1); buscar(pagina - 1); }}
              className="bg-gray-300 px-3 py-1 rounded disabled:opacity-50"
            >
              Anterior
            </button>
            <span>Página { pagina } de { totalPaginas }</span>
            <button
              disabled={pagina >= totalPaginas || loading}
              onClick={() => { setPagina(p => p + 1); buscar(pagina + 1); }}
              className="bg-gray-300 px-3 py-1 rounded disabled:opacity-50"
            >
              Próxima
            </button>
          </div>
        </div>
      )}
    </div>
    )
}

export default Notices