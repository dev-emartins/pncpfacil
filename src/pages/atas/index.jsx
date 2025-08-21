import { useState } from 'react'

function Minutes(){
  const [ano, setAno] = useState('')
  const [cnpj, setCnpj] = useState('')
  const [atas, setAtas] = useState([])
  const [erro, setErro] = useState('')
  const [loading, setLoading] = useState(false)
  const [pagina, setPagina] = useState(1)
  const [totalPaginas, setTotalPaginas] = useState(10)

  const formatarSequencial = (seq) => seq ? seq.toString().padStart(3, "0") : null
  const formatCNPJ = (cnpj) => cnpj ? cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5") : null

  const buscar = async (paginaAtual = 1) => {
    if (!ano) {
      setErro("Informe um ano válido")
      return
    }

    setLoading(true)
    setErro('')
    try {
      const hoje = new Date()
      const anoNum = parseInt(ano, 10)
      const anoAtual = hoje.getFullYear()

      const dataInicial = `${anoNum}0101`
      const dataFinal =
        anoNum === anoAtual
          ? `${anoNum}${String(hoje.getMonth() + 1).padStart(2, "0")}${String(
              hoje.getDate()
            ).padStart(2, "0")}`
          : `${anoNum}1231`

      let url = `https://pncp.gov.br/api/consulta/v1/atas/atualizacao?dataInicial=${dataInicial}&dataFinal=${dataFinal}&pagina=${paginaAtual}`
      if (cnpj) url += `&cnpjOrgao=${cnpj}`

      const resp = await fetch(url)
      if (!resp.ok) throw new Error(`Erro na API: ${resp.status}`)

      const data = await resp.json()

      // Nem sempre a API retorna "atas"
      const lista = data.atas || data.content || []
      const filtradas = lista.filter(
        ata => ata.numeroControlePNCPAta?.endsWith(anoNum.toString())
      )

      setAtas(filtradas)
      setPagina(paginaAtual)
      setTotalPaginas(data.totalPaginas || 1)
    } catch (err) {
      setErro("Erro ao buscar atas. Detalhe: " + err.message)
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    buscar(1)
  }

  return (
    <div className="w-full flex flex-col items-center gap-5">
      <div className="w-full bg-white p-5 rounded-lg shadow-md">
        <h1 className="text-xl md:text-2xl font-black text-center pb-5">
          Consultar Atas de Registro de Preços
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4 md:space-x-4 md:flex md:flex-row md:items-center gap-5">
          <div className='w-full md:w-1/3'>
            <label className="block text-sm font-medium text-gray-700">Ano da Ata:</label>
            <input
              type="number"
              value={ ano }
              onChange={ (e) => setAno(e.target.value) }
              placeholder="Ex: 2025"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className='w-full md:w-1/3'>
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
          <div className='w-full md:w-1/3'>
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

      { erro && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-md w-full max-w-md">
          {erro}
        </div>
      )}

      { atas.length > 0 && (
        <div className="w-full flex flex-col gap-5">
          <h2 className="text-xl text-center font-bold bg-white p-5 rounded-lg shadow-md w-full">
            Resultados do ano {ano}
          </h2>
          <ul className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
            { atas.map((item, index) => (
              <li key={index} className='p-5 border-b-2 border-b-gray-300/20 bg-white rounded-lg shadow-md hover:-translate-y-1'>
                <p><strong>ARP nº: </strong> { formatarSequencial(item.numeroAtaRegistroPreco) || 'N/A'}/{ item.anoAta || 'N/A'}</p>
                <p><strong>Órgão: </strong> { item.nomeOrgao || 'N/A' }</p>
                <p><strong>CNPJ:</strong> { formatCNPJ(item.cnpjOrgao) || 'N/A' }</p>
                <p>{item.numeroControlePNCPAta}</p>
                <p className='text-justify'><strong>Objeto:</strong> { item.objetoContratacao || 'N/A' }</p>
              </li>
            ))}
          </ul>

          <div className="flex justify-center gap-3 mt-5">
            <button
              disabled={ pagina <= 1 || loading }
              onClick={() => buscar(pagina - 1)}
              className="bg-gray-300 px-3 py-1 rounded disabled:opacity-50 cursor-pointer"
            >
              Anterior
            </button>
            <span>Página { pagina } de { totalPaginas }</span>
            <button
              disabled={pagina >= totalPaginas || loading}
              onClick={() => buscar(pagina + 1)}
              className="bg-gray-300 px-3 py-1 rounded disabled:opacity-50 cursor-pointer"
            >
              Próxima
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Minutes