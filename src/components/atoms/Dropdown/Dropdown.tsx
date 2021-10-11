import styles from './Dropdown.module.css';

type Props = {
  id?: string,
  name: string,
  options: {
    range: {
      min: number,
      max: number
    },
    display: string
  }[]
};

const Dropdown = ({id, name, options}: Props) => {
  return (
    <div className={styles.root}>
      <select className={styles.select} name={name} id={id}>
        {options.map(op => {
          <option value={op[0]}>{op[1]}</option>
        })}
      </select>
    </div>
  );
}

export default Dropdown;