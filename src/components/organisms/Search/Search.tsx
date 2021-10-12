import { ReactNode } from 'react';
import Button from '../../atoms/Button';
import styles from './Search.module.css';
import Checkbox from '../../atoms/Checkbox';
import Dropdown from '../../atoms/Dropdown';
import {Conditions} from '../../../repositories/searchCondition';

type ConditionProps = {
  header: string
  children: ReactNode
};

const Condition = ({header, children}: ConditionProps) => {
  return (
    <div>
      <h3 className={styles.h3}>{header}</h3>
      <div className={styles.flexContainer}>
        {children}
      </div>
    </div>
  );
}

const Search = ({conditions}: {conditions: Conditions}) => {
  const prices = <Dropdown name="price" options={conditions.prices} />; 
  const periods = <Dropdown name="period" options={conditions.periods} />; 
  return (
    <div className={styles.root}>
      <div className={styles.h2}>
        <h2>プログラミングスクール検索</h2>
      </div>
      <form action="/" method="GET">
        <Condition header="学べる言語・スキル" children={createSkillsElement(conditions.skills)} />
        <Condition header="価格" children={prices} />
        <Condition header="期間" children={periods} />
        <div className={styles.buttonContainer}>
          <Button text="検索" />
        </div>
      </form>
    </div>
  );
}

function createSkillsElement(skills: string[]) {
  return skills.map(skill => (
    <div className={styles.flexItem}>
      <Checkbox id={`skill_${skill}`}
        name={`skill_${skill}`}
        text={skill}
      />
    </div>
  ));
}

export default Search;