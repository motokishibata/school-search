import { SchoolList } from '../../../repositories/schoolList';
import CompareTable from '../../organisms/CompareTable';
import styles from './Compare.module.css';

type Props = {
  schools: SchoolList
}

const Compare = ({schools}: Props) => {
  return (
    <>
      <section className={styles.tableWrapper}>
        <CompareTable schools={schools} />
      </section>
    </>
  );
}

export default Compare;