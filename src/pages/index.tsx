import { useRouter } from 'next/router';
import Checkbox from '../components/atoms/Checkbox';
import Top from "../components/templates/Top";
import { toCondition, getSchoolList } from "../repositories/schoolList";

const Home = () => {
  const condition = toCondition(useRouter().query);
  const schools = getSchoolList(condition);
  return (
    <>
      <Top schools={schools}/>
    </>
  );
}

export default Home;