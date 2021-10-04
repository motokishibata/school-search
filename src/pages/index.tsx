import Top from "../components/templates/Top";
import { getSchoolList } from "../repositories/schoolList";

const Home = () => {
  const schools = getSchoolList();
  return (
    <Top schools={schools}/>
  );
}

export default Home;