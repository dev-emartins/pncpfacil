import { FaChartBar, FaPhone, FaTruck } from "react-icons/fa6"
import banner from "@/assets/about_banner.png"

function About() {
    const services = [
        {
        title: "Fast Shipping",
        description: "We deliver worldwide with express options available.",
        icon: FaTruck
        },
        {
        title: "Easy Returns",
        description: "30-day return policy with no questions asked.",
        icon: FaChartBar
        },
        {
        title: "24/7 Support",
        description: "Our customer service team is always ready to help.",
        icon: FaPhone
        }
    ]
    return (
        <>
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 w-full bg-white p-5 rounded-lg shadow-md mb-5">Sobre o projeto</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
                <h4 className="text-xl font-bold text-gray-700 pb-4">Origem do Projeto</h4>
                <p className="text-gray-600 pb-4">
                    Este projeto surgiu da necessidade de aumentar a transparência nas contratações públicas, tornando as informações mais acessíveis e compreensíveis para os cidadãos. Nosso objetivo é simplificar o acesso aos dados abertos, permitindo que qualquer pessoa possa consultar e entender como os recursos públicos estão sendo utilizados.
                </p>
                <h4 className="text-xl font-bold text-gray-700 pb-4">Fonte dos Dados</h4>
                <p className="text-gray-600 pb-4">
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

        <section className="mb-16">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">Our Services</h3>
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