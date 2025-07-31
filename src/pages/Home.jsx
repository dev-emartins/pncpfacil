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
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold mb-4">Consultar Contratações - PNCP</h1>
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">CNPJ:</label>
            <input
              type="text"
              value={cnpj}
              onChange={(e) => setCnpj(e.target.value)}
              placeholder="Ex: 09090689000167"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Data Inicial:</label>            
            <input
              type="date"
              value={dataInicial}
              onChange={(e) => setDataInicial(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Data Final:</label>
            <input
              type="date"
              value={dataFinal}
              onChange={(e) => setDataFinal(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 disabled:bg-blue-300"
          >
            {loading ? 'Carregando...' : 'Consultar'}
          </button>
        </form>
      </div>

      {erro && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-md w-full max-w-md">
          {erro}
        </div>
      )}

      {resultado.length > 0 && (
        <div className="mt-4 p-6 bg-white rounded-lg shadow-md w-full max-w-2xl">
          <h2 className="text-xl font-semibold mb-4">Resultados:</h2>
          <ul className="space-y-2">
            {resultado.map((item, index) => (
              <li className='pb-2 border-b-2 border-b-gray-300/20'>
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