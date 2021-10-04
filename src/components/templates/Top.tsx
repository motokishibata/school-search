import Search from "../organisms/Search";
import SchoolList from "../organisms/SchoolList";
import { SchoolList as Schools } from "../../repositories/schoolList";

type Props = {
  schools: Schools
};

const Top = ({schools}: Props) => {
  return (
    <>
      <Search />
      <SchoolList schools={schools}/>
    </>
  );
}

export default Top;