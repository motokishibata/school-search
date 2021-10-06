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
      <SchoolList schools={schools}/>
    </>
  );
}

export default Top;