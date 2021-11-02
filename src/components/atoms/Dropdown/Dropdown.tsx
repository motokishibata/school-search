import { RangeOption } from '../../../repositories/searchCondition';
import styles from './Dropdown.module.css';

type Props = {
  id?: string,
  name: string,
  options: RangeOption[] | string[],
  empty?: boolean,
  selectedItem?: string,
};

const Dropdown = ({id, name, options, empty = false, selectedItem}: Props) => {
  return (
    <div className={styles.root}>
      <select className={styles.select} name={name} id={id}>
        {empty && <option value="">未選択</option>}
        {options.map(op => {
          if (typeof(op) == "string") {
            if (op === selectedItem) {
              return <option value={op} selected>{op}</option>;
            }
            return <option value={op}>{op}</option>;
          } else {
            const v = `${op.range.min}_${op.range.max}`;
            if (v === selectedItem) {
              return <option value={v} selected>{op.display}</option>;
            }
            return <option value={v}>{op.display}</option>;
          }
        })}
      </select>
    </div>
  );
}

export default Dropdown;