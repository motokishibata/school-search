import { ReactNode, useState } from 'react';
import LabelCheckbox from '../../molecules/LabelCheckbox';
import Button from '../../atoms/Button';
import styles from './Search.module.css';

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

const Search = () => {
  return (
    <div className={styles.root}>
      <div className={styles.h2}>
        <h2>プログラミングスクール検索</h2>
      </div>
      <form action="/" method="GET">
        <Condition header="学べる言語・スキル" children={createSkillsElement()} />
        <Condition header="価格" children={createPriceElement()} />
        <Condition header="期間" children={createPeriodElement()} />
        <div className={styles.buttonContainer}>
          <Button text="検索" />
        </div>
      </form>
    </div>
  );
}

function createSkillsElement() {
  const skills = [
    "HTML/CSS", "JavaScript", "Ruby", "Python", "PHP"
  ];
  return skills.map(skill => (
    <div className={styles.flexItem}>
      <LabelCheckbox name={`skill_${skill}`} labelText={skill} />
    </div>
  ));
}

function createPriceElement() {
  const options = [
    ["", "指定しない"],
    ["0", "無料"],
    ["_50000", "5万円以下"],
    ["50000_100000", "5万円~10万円"],
    ["100000_200000", "10万円~20万円"],
    ["200000_400000", "20万円~40万円"],
    ["400000_700000", "40万円~70万円"],
    ["700000_", "70万円以上"],
  ];
  return (
    <select name="price">
      {options.map(option => (
        <option value={option[0]}>{option[1]}</option>
      ))}
    </select>
  );
}

function createPeriodElement() {
  const options = [
    ["", "指定しない"],
    ["short", "~1週間"],
    ["middle", "1ヶ月~3ヶ月"],
    ["long", "4ヶ月~6ヶ月"],
    ["longlong", "6ヶ月~12ヶ月"],
    ["verylong", "1年~"],
  ];
  return (
    <select name="period">
      <option value="">指定しない</option>
      <option value="short">~1週間</option>
      <option value="middle">1ヶ月~3ヶ月</option>
      <option value="long">4ヶ月~6ヶ月</option>
      <option value="longlong">6ヶ月~12ヶ月</option>
      <option value="verylong">1年~</option>
    </select>
  );
}

export default Search;