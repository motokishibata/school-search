import { ChangeEvent,  MouseEvent,useState } from "react";
import { useRouter } from "next/router";
import Search from "../../organisms/Search";
import SchoolList from "../../organisms/SchoolList";
import FixedButton from "../../atoms/FixedButton";
import { SchoolList as Schools, Condition } from "../../../repositories/schoolList";
import { Conditions } from "../../../repositories/searchCondition";

import styles from './Top.module.css';

type Props = {
  schools: Schools
  conditions: Conditions
  searchParams: Condition
};

const Top = ({schools, conditions, searchParams}: Props) => {
  let checks: { [key:string]: boolean; } = {};
  Object.keys(schools).map(key => {
    checks[`${key}`] = false;
  });
  const [schoolChecks, setSchoolChecks] = useState(checks);
  const router = useRouter();
  const handleClickCompare = (e: MouseEvent<HTMLAnchorElement>): void => {
    e.preventDefault();
    let query: { [key:string]: boolean; } = {};
    Object.keys(schoolChecks).map(key => {
      if (schoolChecks[key]) {
        query[`${key}`] = true;
      }
    });
    router.push({pathname: '/compare', query: query});
  }
  const handleClickSchoolCheck = (e: ChangeEvent<HTMLInputElement>): void => {
    const key = e.target.id;
    schoolChecks[key] = !schoolChecks[key];
    setSchoolChecks(schoolChecks);
  };
  return (
    <>
      <section className={styles.search}>
        <Search conditions={conditions} params={searchParams}/>
      </section>
      <section className={styles.schoolList}>
        <h2 className={styles.h2}>プログラミングスクール一覧</h2>
        <SchoolList schools={schools} handleChange={handleClickSchoolCheck} />
      </section>
      <FixedButton handleClick={handleClickCompare}/>
    </>
  );
}

export default Top;