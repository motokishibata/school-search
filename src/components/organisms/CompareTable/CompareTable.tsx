import React from 'react';
import { School, SchoolList, Plan } from '../../../repositories/schoolList';
import styles from './CompareTable.module.css';

const Prices = ({plan}: {plan: Plan}) => {
  let addmisionFee = null;
  if (plan.addmisionFee) {
    addmisionFee = <span>入学金：{plan.addmisionFee}</span>;
  }

  let tuitionFee = null;
  if (plan.tuitionFee) {
    tuitionFee = <span>受講料：{plan.tuitionFee}</span>;
  }

  let monthlyFee = null;
  if (plan.monthlyFee) {
    monthlyFee = <span>月額：{plan.monthlyFee}</span>;
  }

  return (
    <>
    {addmisionFee && React.createElement("<br/>")}
    {tuitionFee && React.createElement("<br/>")}
    {monthlyFee}
    </>
  );
}

const PlanElement = ({plan}: {plan: Plan}) => {
  let addmisionFee = null;
  if (plan.addmisionFee) {
    addmisionFee = <><span>入学金：{plan.addmisionFee}</span><br/></>;
  }

  let tuitionFee = null;
  if (plan.tuitionFee) {
    tuitionFee = <><span>受講料：{plan.tuitionFee}</span><br/></>;
  }

  let monthlyFee = null;
  if (plan.monthlyFee) {
    monthlyFee = <><span>月額：{plan.monthlyFee}</span><br/></>;
  }

  const price = (
    <td>
      {addmisionFee}
      {tuitionFee}
      {monthlyFee}
      {plan.subplans && plan.subplans.map(sub => {
        if (sub.name) {
          return `${sub.name}：${sub.tuitionFee}`;
        } else {
          return `${sub.target}：${sub.tuitionFee}`;
        }
      })}
    </td>
  );

  return (
    <>
    {price}
    <td>{plan.period}週間</td>
    </>
  );
}

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
            <PlanElement plan={plan}/>
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