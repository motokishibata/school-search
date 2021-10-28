import React from 'react';
import { School, SchoolList, Plan } from '../../../repositories/schoolList';
import styles from './CompareTable.module.css';

const Prices = ({plan}: {plan: Plan}) => {
  if (plan.subplans) {
    const subplans = plan.subplans.map(p => {
        let target = null;
        if (p.target) {
          target = <p>【{p.target}】</p>;
        }
        let name = null;
        if (p.name) {
          name = <p>【{p.name}】</p>;
        }
        let addmisionFee = null;
        if (p.addmisionFee) {
          addmisionFee = <p>入学金：{p.addmisionFee}円</p>
        }
        
        return (
          <>
            {name}
            {target}
            {addmisionFee}
            <p>受講料：{p.tuitionFee}円</p>
          </>
        )
    });
    return <>{subplans}</>;
  }
  let addmisionFee = null;
  if (plan.addmisionFee) {
    addmisionFee = <p>入学金：{plan.addmisionFee}円</p>;
  }

  let tuitionFee = null;
  if (plan.tuitionFee) {
    tuitionFee = <p>受講料：{plan.tuitionFee}円</p>;
  }

  let monthlyFee = null;
  if (plan.monthlyFee) {
    monthlyFee = <p>月額：{plan.monthlyFee}円</p>;
  }

  return (
    <>
    {addmisionFee}
    {tuitionFee}
    {monthlyFee}
    </>
  );
}

const PlanElement = ({plan}: {plan: Plan}) => {

  return (
    <>
    <td><Prices plan={plan}/></td>
    <td>{plan.period}{plan.period ? "週間" : "-"}</td>
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