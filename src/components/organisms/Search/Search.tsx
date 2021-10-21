import { ReactNode } from 'react';
import Button from '../../atoms/Button';
import styles from './Search.module.css';
import Checkbox from '../../atoms/Checkbox';
import Dropdown from '../../atoms/Dropdown';
import {Conditions, SkillConditions} from '../../../repositories/searchCondition';

const checkboxs = (items: [string, string][]): JSX.Element => {
  return (
    <div className={styles.flexContainer}>
      {items.map(item => {
        const [skill, id] = item;
        return (
          <div className={styles.flexItem}>
          <Checkbox id={id}
            name={id}
            text={skill}
          />
        </div>
        );
      })}
    </div>
  );
}

type ConditionProps = {
  header: string
  children: ReactNode
};

const Condition = ({header, children}: ConditionProps) => {
  return (
    <div>
      <h3 className={styles.h3}>{header}</h3>
      <div>
        {children}
      </div>
    </div>
  );
}

const Search = ({conditions}: {conditions: Conditions}) => {
  const prices = <Dropdown name="price" options={conditions.prices} empty={true}/>; 
  const periods = <Dropdown name="period" options={conditions.periods} empty={true}/>; 
  const learnStyles = checkboxs(conditions.learnStyles.map(l => [l, `learn_${l}`]));
  const targets = <Dropdown name="target" options={conditions.targets} empty={true}/>;
  const areas = <Dropdown name="area" options={conditions.areas} empty={true}/>;
  return (
    <div className={styles.root}>
      <div className={styles.h2}>
        <h2>プログラミングスクール検索</h2>
      </div>
      <form action="/" method="GET">
        <Condition header="学べるスキル" children={createSkillsElement(conditions.skills)} />
        <Condition header="価格" children={prices}/>
        <Condition header="期間" children={periods}/>
        <Condition header="学習スタイル" children={learnStyles}/>
        <Condition header="対象者" children={targets}/>
        <Condition header="地域" children={areas}/>
        <div className={styles.buttonContainer}>
          <Button text="検索" />
        </div>
      </form>
    </div>
  );
}

function createSkillsElement(skills: SkillConditions) {
  const skillMap = (title: string, childs: string[]): JSX.Element => {
    const items: [string, string][] = childs.map(c => [c, `skill_${c}`]);
    return (
      <>
        <h4 className={styles.h4}>{title}</h4>
        {checkboxs(items)}
      </>
    );
  }
  return (
    <>
    {skillMap("言語", skills.langage)}
    {skillMap("フレームワーク・ライブラリ", skills.framework)}
    {skillMap("データベース", skills.database)}
    {skillMap("クラウド", skills.cloud)}
    {skillMap("仮想化", skills.virtual)}
    {skillMap("開発ツール", skills.tool)}
    </>
  );
}

export default Search;