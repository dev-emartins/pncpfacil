import { useState, useEffect } from 'react';
import { FaArrowAltCircleLeft } from 'react-icons/fa';
import { useParams, useNavigate } from 'react-router-dom';

function Details() {
  const { cnpj, ano, id } = useParams();

  const navigate = useNavigate();

  const [resultado, setResultado] = useState(null);
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      setErro('');
      try {
        const response = await fetch(`https://pncp.gov.br/pncp-api/v1/orgaos/${cnpj}/contratos/${ano}/${id}`);
        if (!response.ok) {
          throw new Error('Erro na requisição: ' + response.status);
        }
        const data = await response.json();
        setResultado(data);
      } catch (error) {
        setErro(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [cnpj, ano, id]);

  const formatCurrency = (value) => {
    if (!value) return 'N/A';
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Intl.DateTimeFormat('pt-BR').format(new Date(date));
  };

  const dataAtual = new Date();
  const vencido = resultado?.dataVigenciaFim
    ? new Date(resultado.dataVigenciaFim) < dataAtual
    : false;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold mb-4">Detalhes da Contratação</h1>

      {loading && (
        <div className="mt-4 p-4 bg-blue-100 text-blue-700 rounded-md w-full max-w-2xl">
          Aguarde carregando...
        </div>
      )}

      {erro && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-md w-full max-w-2xl">
          {erro}
        </div>
      )}

      {resultado && (
        <div className={`${vencido ? "bg-red-100" : "bg-green-100"} mt-4 p-6 rounded-lg shadow-md w-full max-w-2xl`}>
          <h2 className="text-xl font-semibold mb-4">Detalhes do Contrato</h2>
          <div className="space-y-2">
            <p><strong>Órgão:</strong> {resultado.orgaoEntidade?.razaoSocial || 'N/A'}</p>
            <p><strong>CNPJ Órgão:</strong> {resultado.orgaoEntidade?.cnpj || 'N/A'}</p>
            <p><strong>Unidade:</strong> {resultado.unidadeOrgao?.nomeUnidade || 'N/A'} ({resultado.unidadeOrgao?.municipioNome || 'N/A'} - {resultado.unidadeOrgao?.ufSigla || 'N/A'})</p>
            <p><strong>Fornecedor:</strong> {resultado.nomeRazaoSocialFornecedor || 'N/A'}</p>
            <p><strong>CNPJ Fornecedor:</strong> {resultado.niFornecedor || 'N/A'}</p>
            <p className='text-justify'><strong>Objeto do Contrato:</strong> {resultado.objetoContrato || 'N/A'}</p>
            <p><strong>Valor Total:</strong> {formatCurrency(resultado.valorGlobal)}</p>
            <p><strong>Data Assinatura:</strong> {formatDate(resultado.dataAssinatura)}</p>
            <p><strong>Vigência:</strong> {formatDate(resultado.dataVigenciaInicio)} a {formatDate(resultado.dataVigenciaFim)}</p>
            <p><strong>Categoria:</strong> {resultado.categoriaProcesso?.nome || 'N/A'}</p>
            <p><strong>Número do Contrato:</strong> {resultado.numeroContratoEmpenho || 'N/A'}</p>
            <p><strong>Processo:</strong> {resultado.processo || 'N/A'}</p>
            <p><strong>Vencido: </strong>{ vencido ? "Vencido" : "Virgente" }</p>
            <p><strong>Data Publicação PNCP:</strong> {formatDate(resultado.dataPublicacaoPncp)}</p>
          </div>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 w-32 flex justify-center items-center gap-4 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 cursor-pointer"
          >
            <FaArrowAltCircleLeft /> Voltar
          </button>
        </div>
      )}
    </div>
  );
}

export default Details;