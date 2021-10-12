import { useRouter } from 'next/router';
import { getSchoolList } from '../repositories/schoolList';
import { default as Template } from '../components/templates/Compare';

const Compare = () => {
  const keys = Object.keys(useRouter().query);
  const schools = getSchoolList({});
  const schoolKeys = Object.keys(schools);
  const diff = schoolKeys.filter(key => keys.indexOf(key) === -1);
  for (const d of diff) {
    delete schools[d];
  }

  return (
    <>
      <Template schools={schools}/>
    </>
  );
}

export default Compare;