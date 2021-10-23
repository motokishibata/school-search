import React from 'react';
import { School, SchoolList } from '../../../repositories/schoolList';
import styles from './CompareTable.module.css';

const Row = ({school}: { school: School}) => {
  const courses = school.courses;
  const allPlan = courses.flatMap(c => c.plans);

  return (
    <>
    {courses.map((course, cIndex) => {
      const planCount = course.plans.length;
      return course.plans.map((plan, pIndex) => {
        const isFirst = (cIndex === 0) && (pIndex === 0);
        return (
          <tr>
            {isFirst && 
              <td rowSpan={allPlan.length}>
                <img src={school.thumbnail} width={70} height={70}/><br/>{school.name}
              </td>
            }
            {pIndex === 0 &&
              <>
              <td rowSpan={planCount}>{course.name}</td>
              <td rowSpan={planCount}>{course.skills}</td>
              </>
            }
            <td>入会金：{plan.addmisionFee}<br/>総額：{plan.tuitionFee}<br/>月額：{plan.monthlyFee}</td>
            <td>{plan.period}週間</td>
          </tr>
        );
      });
    })}
    </>
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
            <th>コース</th>
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