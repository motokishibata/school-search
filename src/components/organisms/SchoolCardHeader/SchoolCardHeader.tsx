import { ChangeEventHandler } from 'react';
import styles from './SchoolCardHeader.module.css';

type Props = {
  id: string,
  title: string,
  checked:boolean,
  handleChange?: ChangeEventHandler<HTMLInputElement>
}

const SchoolCardHeader = ({id, title, handleChange, checked}: Props) => {
  return (
    <div className={styles.root}>
      <input className={styles.checkbox}
        type="checkbox" name={id} id={id}
        onChange={handleChange}
        defaultChecked={checked}
      />
      <label className={styles.checklabel} htmlFor={id}>{title}</label>
    </div>
  );
}

export default SchoolCardHeader;