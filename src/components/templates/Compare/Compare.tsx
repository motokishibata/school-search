import CompareTable from '../../organisms/CompareTable';
import { getSchoolList } from '../../../repositories/schoolList';
import styles from './Compare.module.css';

const Compare = () => {
  const schools = getSchoolList({});
  return (
    <>
      <section className={styles.tableWrapper}>
        <CompareTable schools={schools} />
      </section>
    </>
  );
}

export default Compare;