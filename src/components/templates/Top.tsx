import Search from "../organisms/Search";
import SchoolList from "../organisms/SchoolList";

const data = [
  "name1",
  "name2",
  "name3",
  "name4",
  "name5",
  "name6",
];

const Top = () => {
  return (
    <>
      <Search />
      <SchoolList names={data}/>
    </>
  );
}

export default Top;