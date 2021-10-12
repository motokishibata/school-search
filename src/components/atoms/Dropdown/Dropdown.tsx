import { RangeOption } from '../../../repositories/searchCondition';
import styles from './Dropdown.module.css';

type Props = {
  id?: string,
  name: string,
  options: RangeOption[],
  empty?: boolean,
};

const Dropdown = ({id, name, options, empty = false}: Props) => {
  return (
    <div className={styles.root}>
      <select className={styles.select} name={name} id={id}>
        {empty && <option value="">未選択</option>}
        {options.map(op => {
          return <option value={`${op.range.min}_${op.range.max}`}>{op.display}</option>;
        })}
      </select>
    </div>
  );
}

export default Dropdown;