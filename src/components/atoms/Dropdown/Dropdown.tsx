import { RangeOption } from '../../../repositories/searchCondition';
import styles from './Dropdown.module.css';

type Props = {
  id?: string,
  name: string,
  options: RangeOption[]
};

const Dropdown = ({id, name, options}: Props) => {
  console.log(options);
  return (
    <div className={styles.root}>
      <select className={styles.select} name={name} id={id}>
        {options.map(op => {
          return <option value={`${op.range.min}_${op.range.max}`}>{op.display}</option>;
        })}
      </select>
    </div>
  );
}

export default Dropdown;