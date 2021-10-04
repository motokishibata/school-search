import SchoolCard from "../SchoolCard";
import { SchoolList as Schools } from '../../../repositories/schoolList';

type Props = {
  schools: Schools
};

const SchoolList = ({schools}: Props) => {
  const keys = Object.keys(schools);

  return (
    <div>
      {keys.map(key => {
        const school = schools[key];
        return <SchoolCard key={key} school={school} />;
      })}
    </div>
  );
}

export default SchoolList;