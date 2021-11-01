import { ReactNode } from 'react';
import Button from '../../atoms/Button';
import styles from './Search.module.css';
import Checkbox from '../../atoms/Checkbox';
import Dropdown from '../../atoms/Dropdown';
import {Conditions, SkillConditions} from '../../../repositories/searchCondition';
import { Condition as SearchParams } from '../../../repositories/schoolList';

const checkboxs = (items: [string, string][], checkedIds?: string[]): JSX.Element => {
  return (
    <div className={styles.flexContainer}>
      {items.map(item => {
        const [skill, id] = item;
        let checked = false;
        if (checkedIds) {
          checked = checkedIds.indexOf(skill) !== -1;
        }
        return (
          <div className={styles.flexItem}>
          <Checkbox id={id}
            name={id}
            text={skill}
            checked={checked}
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

const Search = ({conditions, params}: {conditions: Conditions, params: SearchParams}) => {
  const skills = createSkillsElement(conditions.skills, params.skills);
  let selectedPrice = null;
  if (params.price) {
    const [minPrice, maxPrice] = params.price;
    selectedPrice = `${minPrice}_${maxPrice}`;
  }
  const prices = <Dropdown name="price" options={conditions.prices} empty={true} selectedItem={selectedPrice}/>;
  let selectedPeriod = null;
  if (params.period) {
    const [minPeriod, maxPeriod] = params.period;
    selectedPeriod = `${minPeriod}_${maxPeriod}`;
  }
  const periods = <Dropdown name="period" options={conditions.periods} empty={true} selectedItem={selectedPeriod}/>;

  const checkedLearnStyles = [];
  if (params.learnStyles.online) {
    checkedLearnStyles.push("オンライン");
  }
  if (params.learnStyles.attendant) {
    checkedLearnStyles.push("通学");
  }
  const learnStyles = checkboxs(conditions.learnStyles.map(l => [l, `learn_${l}`]), checkedLearnStyles);
  let selectedTarget = null;
  if (params.target) {
    selectedTarget = params.target;
  }
  const targets = <Dropdown name="target" options={conditions.targets} empty={true} selectedItem={selectedTarget}/>;
  let selectedArea = null;
  if (params.area) {
    selectedArea = params.area;
  }
  const areas = <Dropdown name="area" options={conditions.areas} empty={true} selectedItem={selectedArea}/>;
  return (
    <div className={styles.root}>
      <div className={styles.h2}>
        <h2>プログラミングスクール検索</h2>
      </div>
      <form action="/" method="GET">
        <Condition header="学べるスキル" children={skills} />
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

function createSkillsElement(skills: SkillConditions, checkedSkills: string[]) {
  const skillMap = (title: string, childs: string[]): JSX.Element => {
    const items: [string, string][] = childs.map(c => [c, `skill_${c}`]);
    return (
      <>
        <h4 className={styles.h4}>{title}</h4>
        {checkboxs(items, checkedSkills)}
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