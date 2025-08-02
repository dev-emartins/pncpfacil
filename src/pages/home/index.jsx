import { useState } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [cnpj, setCnpj] = useState('');
  const [dataInicial, setDataInicial] = useState('');
  const [dataFinal, setDataFinal] = useState('');
  const [resultado, setResultado] = useState([]);
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);
  const formatDate = (dateStr) => dateStr.replaceAll('-', '');

  function formatarDataBrasil(data) {
    return new Date(data).toLocaleDateString('pt-BR');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErro('');
    setResultado([]);

    try {
      const url = new URL('https://pncp.gov.br/api/consulta/v1/contratos');
      url.searchParams.append('dataInicial', formatDate(dataInicial));
      url.searchParams.append('dataFinal', formatDate(dataFinal));
      if (cnpj) url.searchParams.append('cnpjOrgao', cnpj);
      url.searchParams.append('pagina', '1');

      const response = await fetch(url);
      if (!response.ok) throw new Error('Erro na requisição: ' + response.status);
      const data = await response.json();
      setResultado(data.data || []);
    } catch (error) {
      setErro(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-5">      
      <div className="bg-white p-5 rounded-lg shadow-md w-full">
        <h1 className="text-2xl font-bold text-center pb-5">Consultar Contratações</h1>
        <form onSubmit={handleSubmit} className="space-y-4 md:space-x-4 md:flex md:flex-row md:items-center gap-5">
          <div className='w-full md:w-1/4'>
            <label className="block text-sm font-medium text-gray-700">CNPJ:</label>
            <input
              type="text"
              value={cnpj}
              onChange={(e) => setCnpj(e.target.value)}
              placeholder="Ex: 09090689000167"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className='w-full md:w-1/4'>
            <label className="block text-sm font-medium text-gray-700">Data Inicial:</label>            
            <input
              type="date"
              value={dataInicial}
              onChange={(e) => setDataInicial(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className='w-full md:w-1/4'>
            <label className="block text-sm font-medium text-gray-700">Data Final:</label>
            <input
              type="date"
              value={dataFinal}
              onChange={(e) => setDataFinal(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className='w-full md:w-1/4'>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 disabled:bg-blue-300"
            >
              {loading ? 'Carregando...' : 'Consultar'}
            </button>
          </div>          
        </form>
      </div>

      {erro && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-md w-full max-w-md">
          {erro}
        </div>
      )}

      {resultado.length > 0 && (
        <div className="w-full">
          <h2 className="text-xl text-center font-semibold mb-5 bg-white p-5 rounded-lg shadow-md w-full">
            Resultados no período de {formatarDataBrasil(dataInicial)} à {formatarDataBrasil(dataFinal)}
          </h2>
          <ul className="w-full md:grid md:grid-cols-2 md:gap-4">
            {resultado.map((item, index) => (
              <li className='p-5 border-b-2 border-b-gray-300/20 bg-white rounded-lg shadow-md hover:-translate-y-1'>
                <Link key={index} to={`/details/${cnpj}/contratos/${item.anoContrato}/${item.sequencialContrato}`}>
                  <p><strong>Contrato:</strong> {item.numeroContratoEmpenho || 'N/A'}/{ item.anoContrato || 'N/A' }</p>
                  <p><strong>Fornecedor:</strong> {item.nomeRazaoSocialFornecedor || 'N/A'}</p>
                  <p className='text-justify'><strong>Objeto:</strong> {item.objetoContrato || item.objetoCompra}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Home;