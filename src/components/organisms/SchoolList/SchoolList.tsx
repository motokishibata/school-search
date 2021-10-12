import { ChangeEventHandler } from 'react';
import SchoolCard from "../SchoolCard";
import { SchoolList as Schools } from '../../../repositories/schoolList';
import styles from './SchoolList.module.css';

type Props = {
  schools: Schools
  handleChange: ChangeEventHandler<HTMLInputElement>
};

const SchoolList = ({schools, handleChange}: Props) => {
  const keys = Object.keys(schools);

  return (
    <div className={styles.root}>
      {keys.map(key => {
        const school = schools[key];
        return (
          <SchoolCard
            key={key}
            schoolKey={key}
            school={school}
            handleChange={handleChange}
          />
        );
      })}
    </div>
  );
}

export default SchoolList;