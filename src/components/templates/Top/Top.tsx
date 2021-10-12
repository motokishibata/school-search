import Search from "../../organisms/Search";
import SchoolList from "../../organisms/SchoolList";
import FixedButton from "../../atoms/FixedButton";
import { SchoolList as Schools } from "../../../repositories/schoolList";
import { Conditions } from "../../../repositories/searchCondition";

import styles from './Top.module.css';

type Props = {
  schools: Schools
  conditions: Conditions
};

const Top = ({schools, conditions}: Props) => {
  return (
    <>
      <section className={styles.search}>
        <Search conditions={conditions}/>
      </section>
      <section className={styles.schoolList}>
        <h2 className={styles.h2}>プログラミングスクール一覧</h2>
        <SchoolList schools={schools}/>
      </section>
      <FixedButton />
    </>
  );
}

export default Top;