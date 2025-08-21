import { useState } from "react";

function MinutesDetails() {
  const { cnpj, dataInicial, dataFinal } = useParams()
  const [resultado, setResultado] = useState([])
  const [erro, setErro] = useState("")
  const [loading, setLoading] = useState(false)

  const formatDate = (dateStr) => dateStr.replaceAll("-", "")

  function formatarDataBrasil(data) {
    if (!data) return "N/A";

    const [datePart] = data.toString().split("T");
    const [year, month, day] = datePart.split("-");

    const dataLocal = new Date(year, month - 1, day);

    return dataLocal.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  }

  const formatCNPJ = (cnpj) => {
    if (!cnpj) return "N/A";
    const digits = cnpj.replace(/\D/g, "");
    return digits.replace(
      /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
      "$1.$2.$3/$4-$5"
    );
  };

  const formatarSequencial = (sequencial) => {
    return sequencial.toString().padStart(5, "0");
  };

  const buscar = async (paginaAtual = pagina) => {
    setLoading(true);
    setErro("");
    setResultado([]);

    try {
      const url = new URL("https://pncp.gov.br/api/consulta/v1/atas");
      url.searchParams.append("dataInicial", dataInicial);
      url.searchParams.append("dataFinal", dataFinal);
      if (cnpj) url.searchParams.append("cnpj", cnpj);
      url.searchParams.append("tamanhoPagina", 1);
      url.searchParams.append("pagina", 1);

      const response = await fetch(url);
      if (!response.ok)
        throw new Error("Erro na requisição: " + response.status);
      const data = await response.json();

      setResultado(data.data || []);
      setTotalPaginas(data.totalPaginas || 1);
    } catch (error) {
      setErro(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {erro && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-md w-full max-w-md">
          {erro}
        </div>
      )}

      <div className="header-gradient rounded-t-lg p-6 text-white shadow-lg">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              Ata de Registro de Preços
            </h1>
            <p className="text-blue-100">
              Detalhes completos do processo de registro de preços
            </p>
          </div>
          <div className="bg-white/20 px-4 py-2 rounded-lg mt-4 md:mt-0">
            <p className="text-sm">Nº Controle PNCP</p>
            <p className="font-mono text-sm">
              18457226000181-1-000015/2023-000001
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-b-lg shadow-md relative">
        <div className="status-badge">
          <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded">
            Ativa
          </span>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="info-group">
              <span className="info-label">
                <i className="fas fa-file-contract mr-2"></i>Número da Ata
              </span>
              <p className="info-value text-xl">NPERP 003/2023</p>
            </div>
            <div className="info-group">
              <span className="info-label">
                <i className="fas fa-calendar-alt mr-2"></i>Ano
              </span>
              <p className="info-value text-xl">2023</p>
            </div>
            <div className="info-group">
              <span className="info-label">
                <i className="fas fa-building mr-2"></i>Órgão
              </span>
              <p className="info-value">MUNICIPIO DE SANTA VITORIA</p>
            </div>
            <div className="info-group">
              <span className="info-label">
                <i className="fas fa-id-card mr-2"></i>CNPJ
              </span>
              <p className="info-value">18.457.226/0001-81</p>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <h2 className="text-lg font-semibold text-blue-800 mb-3 flex items-center">
              <i className="fas fa-calendar-check mr-2"></i> Vigência da Ata
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <p className="info-label">Início</p>
                <p className="info-value">07/07/2023</p>
              </div>
              <div className="text-center">
                <p className="info-label">Término</p>
                <p className="info-value">07/10/2026</p>
              </div>
              <div className="text-center">
                <p className="info-label">Duração</p>
                <p className="info-value">3 anos e 3 meses</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-700 mb-3 flex items-center">
                <i className="fas fa-signature mr-2"></i> Assinatura e
                Publicação
              </h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="info-label">Data de Assinatura</span>
                  <span className="info-value">16/06/2023</span>
                </div>
                <div className="flex justify-between">
                  <span className="info-label">Data de Publicação</span>
                  <span className="info-value">06/07/2023</span>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-700 mb-3 flex items-center">
                <i className="fas fa-database mr-2"></i> Registro no Sistema
              </h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="info-label">Data de Inclusão</span>
                  <span className="info-value">06/07/2023</span>
                </div>
                <div className="flex justify-between">
                  <span className="info-label">Última Atualização</span>
                  <span className="info-value">06/07/2023</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-3 flex items-center">
              <i className="fas fa-bullseye mr-2"></i> Objeto da Contratação
            </h2>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <p className="text-justify">
                A presente licitação tem por objeto a futura e eventual
                contratação de empresa especializada visando a prestação de
                serviço de análises técnicas com amostragem e ensaios para o
                cumprimento do Programa de Automonitoramento da Licença
                Ambiental Simplificada Nº 1924/2021 do empreendimento do
                Município de Santa Vitória – Canalização do Córrego Santa
                Vitória – que consta no item 2 [qualidade do ar com Dióxido de
                Enxofre (SO2), Partículas Totais em Suspensão (PTS), Monóxido de
                Carbono (co) e Ozônio (O3)], item 3 (monitoramento da frota com
                coloração) e item 4 (ruídos) do Anexo II do Parecer Técnico de
                Licença Ambiental Simplificada (LAS) nº 30321878, com as
                análises e entrega dos relatórios semestrais e anuais, para o
                período de 36 meses, acompanhados dos certificados de calibração
                dos equipamentos de amostragem quando necessário, ART’s emitidas
                pelos profissionais responsáveis, demonstrando o atendimento aos
                padrões definidos nas normas vigentes para cada monitoramento, e
                incluindo as despesas necessárias às coletas das amostras para
                cumprimento do serviço, conforme especificações do Termo de
                Referência.
              </p>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-700 mb-3">
              Informações Adicionais
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className="info-label">Usuário do Sistema</span>
                <p className="info-value">Licita + Brasil</p>
              </div>
              <div>
                <span className="info-label">Unidade Orgão</span>
                <p className="info-value">
                  MUNICIPIO DE SANTA VITORIA (Código: 1)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 text-center text-sm text-gray-500">
        <p>
          <i className="fas fa-info-circle mr-1"></i> Estas informações são de
          caráter público e foram extraídas do Sistema PNCP
        </p>
      </div>
    </div>
  );
}

export default MinutesDetails;
