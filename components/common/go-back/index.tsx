import { useRouter } from "next/navigation";
import { MdArrowBack } from "react-icons/md";

interface GoBackProps {
    link: string;
}

const GoBack = ({ link }: GoBackProps) => {
  const router = useRouter();

  const handleLogout = () => {
    router.push(link);
  };
  return (
    <div onClick={handleLogout} className="flex gap-2 items-center text-primary cursor-pointer hover:text-gray-400">
      <MdArrowBack size={18}/>
      <span className="text-md">Go Back</span>
    </div>
  );
};

export default GoBack;
