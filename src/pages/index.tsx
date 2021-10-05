import { useRouter } from 'next/router';
import Top from "../components/templates/Top";
import { Condition, getSchoolList } from "../repositories/schoolList";

const Home = () => {
  const condition = useRouter().query as Condition;
  const schools = getSchoolList(condition);
  return (
    <>
      <Top schools={schools}/>
    </>
  );
}

export default Home;