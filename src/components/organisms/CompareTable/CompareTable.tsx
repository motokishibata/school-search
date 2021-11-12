import { wrap } from 'module';
import React from 'react';
import { School, SchoolList, Plan } from '../../../repositories/schoolList';
import styles from './CompareTable.module.css';

const Prices = ({plan}: {plan: Plan}) => {
  if (plan.subplans) {
    const subplans = plan.subplans.map((p, i) => {
        let str = "";
        if (p.target) {
          str += `【${p.target}】`;
        }
        if (p.name) {
          str += `【${p.name}】`;
        }
        if (p.addmisionFee) {
          str += `入学金：${p.addmisionFee}円`;
        }
        if (p.tuitionFee) {
          str += `受講料：${p.tuitionFee}円`;
        }
        
        if (i < (plan.subplans.length - 1)) {
          return <>{str}<br/></>;  
        }

        return str;
    });
    return <>{subplans}</>;
  }

  let fee = [];
  if (plan.addmisionFee) {
    fee.push(`入学金：${plan.addmisionFee}円`);
  }
  if (plan.tuitionFee) {
    fee.push(`受講料：${plan.tuitionFee}円`);
  }
  if (plan.monthlyFee) {
    fee.push(`月額：${plan.monthlyFee}円`);
  }

  return (
    <>
    {fee.map((f, i) => i < fee.length - 1 ? <>{f}<br/></> : f)}
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
                <div  className={styles.thumbnail}>
                  <img src={school.thumbnail} width={70} height={70}/>
                </div>
                <p className={styles.schoolName}>{school.name}</p>
                <a className={styles.linkButton} href={school.url.detail}>詳細</a>
                <a className={styles.linkButton} href={school.url.official} target="_blank">公式</a>
              </td>
            }
            {pIndex === 0 &&
              <>
              <td rowSpan={planCount}>{course.name}</td>
              <td className={styles.wordBreak} rowSpan={planCount}>{course.skills.join(', ')}</td>
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
      <div className={styles.tableWrapper}>
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
    </div>
  );
}

export default CompareTable;