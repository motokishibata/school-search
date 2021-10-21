import { School } from '../../../repositories/schoolList';
import styles from './SchoolInfo.module.css';

type Props = {
  school: School
};

const SchoolInfo = ({school}: Props) => {
  return (
    <>
      <h2>基本情報</h2>
      <p>{school.name}</p>
    </>
  );
}

export default SchoolInfo;