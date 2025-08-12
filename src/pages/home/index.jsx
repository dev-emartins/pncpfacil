import { FaFileContract, FaFileLines, FaGavel } from "react-icons/fa6"
import ButtonLink from "@/components/buttonlink"
const Home = () => {
  return (
    <div className="w-full flex flex-col items-center gap-5">
      <div className="w-full bg-white p-5 rounded-lg shadow-md">
        <h1 className="text-xl md:text-2xl font-black text-center pb-5">
          Consultar Processos e Contratos
        </h1>
        <div className="w-full flex justify-center items-center gap-4">
          <ButtonLink icon={ FaGavel } text="Compras" link="/notices" />
          <ButtonLink icon={ FaFileLines } text="Atas de Registro de Preço" link="/minutes" />
          <ButtonLink icon={ FaFileContract } text="Contrato" link="/contract" />
        </div>        
      </div>  
      <div className="w-full bg-white p-5 rounded-lg shadow-md text-base md:text-xl text-center">
        <h2 className="text-xl md:text-2xl font-black text-center pb-5">
          Outras informações
        </h2>
      </div>       
    </div>
  );
};

export default Home;