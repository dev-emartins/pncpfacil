import { FaBolt, FaThumbsUp, FaClock } from "react-icons/fa6"
import banner from "@/assets/about_banner.png"

function About() {
    const services = [
    {
      title: "Rápido e Eficiente",
      description: "Em poucos cliques você obtém o resultado da sua busca.",
      icon: FaBolt
    },
    {
      title: "Fácil de Usar",
      description: "Resultados instantâneos com operação simplificada na plataforma.", 
      icon: FaThumbsUp
    },
    {
      title: "Disponível 24/7",
      description: "Serviço sempre disponível e gratuito para informações eficazes e resolutivas.",
      icon: FaClock
    }
  ]
    return (
        <>
        <section className="mb-5 flex flex-col items-center justify-center gap-5">
          <h2 className="text-2xl font-bold text-gray-800 w-full py-5">Sobre o projeto</h2>
          <div className="flex flex-col-reverse md:flex-row gap-8">
            <div>
                <h4 className="text-lg font-bold text-blue-500 pb-4">Origem do Projeto</h4>
                <p className="text-gray-600 text-justify pb-4">
                    Este projeto surgiu da necessidade de aumentar a transparência nas contratações públicas, tornando as informações mais acessíveis e compreensíveis para os cidadãos. Nosso objetivo é simplificar o acesso aos dados abertos, permitindo que qualquer pessoa possa consultar e entender como os recursos públicos estão sendo utilizados.
                </p>
                <h4 className="text-lg font-bold text-blue-500 pb-4">Fonte dos Dados</h4>
                <p className="text-gray-600 text-justify pb-4">
                    Todas as informações disponibilizadas são coletadas diretamente do Portal Nacional de Contratações Públicas (PNCP), plataforma oficial criada com base na Lei nº 14.133/2021. Esta legislação regulamenta os processos licitatórios no Brasil, estabelecendo padrões de transparência e eficiência nas compras governamentais.
                </p>
            </div>
            <div className="bg-blue-400 rounded-lg h-64 md:h-auto">
              {/* Placeholder for image */}
              <div className="flex items-center justify-center h-full text-gray-400">
                <img src={ banner } alt="Banner" />
              </div>
            </div>
          </div>
        </section>

        <section className="mb-5">
          <h2 className="text-2xl font-bold text-gray-800 w-full py-5">Nossos Serviços</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <service.icon className="text-3xl text-blue-500 mb-4"/>
                <h4 className="text-lg font-medium text-gray-800 mb-2">{service.title}</h4>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </section>        
        </>
    )
}

export default About