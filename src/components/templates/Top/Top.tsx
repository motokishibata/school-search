import Search from "../../organisms/Search";
import SchoolList from "../../organisms/SchoolList";
import { SchoolList as Schools } from "../../../repositories/schoolList";

import styles from './Top.module.css';

type Props = {
  schools: Schools
};

const Top = ({schools}: Props) => {
  return (
    <>
      <section className={styles.search}>
        <Search />
      </section>
      <section className={styles.schoolList}>
        <h2 className={styles.h2}>プログラミングスクール一覧</h2>
        <SchoolList schools={schools}/>
      </section>
    </>
  );
}

export default Top;