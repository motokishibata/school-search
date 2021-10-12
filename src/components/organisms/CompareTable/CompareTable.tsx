import React from 'react';
import { School, SchoolList } from '../../../repositories/schoolList';
import styles from './CompareTable.module.css';

const Row = ({school}: { school: School}) => {
  const skills = (
    <>
    {school.skills.map((skill, index) => {
      return <React.Fragment key={index}>{skill}<br/></React.Fragment>;
    })}
    </>
  );

  const prices = school.courses.map(course => course.price);
  const price = `${Math.min(...prices)}円 ~ ${Math.max(...prices)}円`

  const periods = school.courses.map(course => course.period);
  const period = `${Math.min(...periods)}週間 ~ ${Math.max(...periods)}週間`

  return (
    <tr>
      <th><img src="150x150.png" width={70} height={70}/><br/>{school.name}</th>
      <td>{skills}</td>
      <td>{price}</td>
      <td>{period}</td>
    </tr>
  );
}

const CompareTable = ({schools}: {schools: SchoolList}) => {
  const keys = Object.keys(schools);
  return (
    <div className={styles.root}>
      <h2 className={styles.h2}>比較表</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>スクール</th>
            <th>スキル</th>
            <th>価格</th>
            <th>期間</th>
          </tr>
        </thead>
        <tbody>
          {keys.map(key => <Row school={schools[key]}/>)}
        </tbody>
      </table>
    </div>
  );
}

export default CompareTable;