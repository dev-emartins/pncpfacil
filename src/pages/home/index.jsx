import { FaFileContract, FaFileLines, FaGavel } from "react-icons/fa6"
import ButtonLink from "@/components/buttonlink"
const Home = () => {

  return (
    <div className="w-full bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="w-full flex justify-center items-center gap-4">
        <ButtonLink icon={ FaGavel } text="Compras" link="/notices" />
        <ButtonLink icon={ FaFileLines } text="Atas de Registro de Preço" link="/minutes" />
        <ButtonLink icon={ FaFileContract } text="Contrato" link="/contract" />
      </div>
    </div>
  );
};

export default Home;