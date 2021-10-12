import { useRouter } from 'next/router';
import Top from "../components/templates/Top";
import { toCondition, getSchoolList } from "../repositories/schoolList";
import conditions from '../repositories/searchCondition';

const Home = () => {
  const condition = toCondition(useRouter().query);
  const schools = getSchoolList(condition);
  return (
    <>
      <Top schools={schools} conditions={conditions}/>
    </>
  );
}

export default Home;