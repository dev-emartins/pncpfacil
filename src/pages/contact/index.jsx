import {  FaEnvelope, FaPhone, FaMapMarked } from "react-icons/fa"

function Contact() {
    return (
        <>
            <div className="text-center mb-12">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">Contato</h1>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Entre em contato conosco para tirar dúvidas, reportar problemas ou enviar sugestões sobre o projeto PNCP Fácil.
                </p>
            </div>

            <div className="w-full grid md:grid-cols-2 gap-12">  
                {/* Contact Info */}
                <div className="space-y-8">
                    <div className="w-full bg-white p-5 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold text-gray-800 mb-6">Informações de Contato</h2>
                        <div className="space-y-4">
                            <div className="flex items-start">
                                <div className="flex-shrink-0 mt-1">
                                    <FaEnvelope className="h-7 w-7 text-blue-500" />
                                </div>
                                <div className="ml-3">
                                    <h3 className="text-sm font-medium text-gray-900">E-mail</h3>
                                    <p className="text-sm text-gray-500">everaldoinfortecnico@gmail.com</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <div className="flex-shrink-0 mt-1">
                                    <FaPhone className="h-7 w-7 text-blue-500" />
                                </div>
                                <div className="ml-3">
                                    <h3 className="text-sm font-medium text-gray-900">Telefone</h3>
                                    <p className="text-sm text-gray-500">(00) 9090-0000</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <div className="flex-shrink-0 mt-1">
                                    <FaMapMarked className="h-7 w-7 text-blue-500" />
                                </div>
                                <div className="ml-3">
                                    <h3 className="text-sm font-medium text-gray-900">Endereço</h3>
                                    <p className="text-sm text-gray-500">
                                        Rua dos bobós, Bloco C, nº 0<br />
                                        Brasília - DF, 00000-000
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-full bg-white p-5 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold text-gray-800 mb-6">Horário de Atendimento</h2>
                        <div className="space-y-2">
                            <p className="text-sm text-gray-600"><span className="font-medium">Segunda a sexta:</span> 8h às 18h</p>
                            <p className="text-sm text-gray-600"><span className="font-medium">Sábados:</span> 9h às 13h</p>
                            <p className="text-sm text-gray-600"><span className="font-medium">Domingos e feriados:</span> Fechado</p>
                        </div>
                    </div>                    
                </div>

                {/* Contact Form */}
                <div className="w-full bg-white p-5 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold text-gray-800 mb-6">Envie sua mensagem</h2>
                    <form className="space-y-6" onSubmit={(e)=> e.preventDefault()}>
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
                            <input
                                type="text"
                                id="name"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Seu nome completo"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
                            <input
                                type="email"
                                id="email"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="seu@email.com"
                            />
                        </div>
                        <div>
                            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Assunto</label>
                            <select
                                id="subject"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="">Selecione um assunto</option>
                                <option value="doubt">Dúvida</option>
                                <option value="problem">Reportar problema</option>
                                <option value="suggestion">Sugestão</option>
                                <option value="other">Outro</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Mensagem</label>
                            <textarea
                                id="message"
                                rows={4}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Escreva sua mensagem aqui..."
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-3 px-4 rounded-md hover:bg-blue-600 transition-colors font-medium"
                        >
                            Enviar mensagem
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Contact