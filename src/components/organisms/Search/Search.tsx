import LabelCheckbox from '../../molecules/LabelCheckbox';
import Button from '../../atoms/Button';
import styles from './Search.module.css';

const Search = () => {
  const conditions = [];
  conditions.push(createSkillsElement());
  conditions.push(createPriceElement());
  conditions.push(createPeriodElement());
  // conditions.push(createAreaElement());
  // conditions.push(createTargetElement());
  // conditions.push(createFeatureisElement());

  return (
    <div className={styles.root}>
      <h2>プログラミングスクール検索</h2>
      <form action="/" method="GET">
        <div className={styles.flexContainer}>
          {conditions.map(condition => {
            return (
              <div className={styles.flexItem}>
                {condition}
              </div>
            );
          })}
        </div>
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

  const elements = skills.map(skill =>
    <LabelCheckbox name={`skill_${skill}`} labelText={skill} />
  );

  return (
    <>
      <h3>学べる言語・スキル</h3>
      {elements}
    </>
  );
}

function createPriceElement() {
  return (
    <>
      <h3>価格(総額)</h3>
      <select name="price">
        <option value="">指定しない</option>
        <option value="0">無料</option>
        <option value="_50000">5万円以下</option>
        <option value="50000_100000">5万円~10万円</option>
        <option value="100000_200000">10万円~20万円</option>
        <option value="200000_400000">20万円~40万円</option>
        <option value="400000_700000">40万円~70万円</option>
        <option value="700000_">70万円以上</option>
      </select>
    </>
  )
}

function createPeriodElement() {
  return (
    <>
      <h3>期間</h3>
      <select name="period">
        <option value="">指定しない</option>
        <option value="short">~1週間</option>
        <option value="middle">1ヶ月~3ヶ月</option>
        <option value="long">4ヶ月~6ヶ月</option>
        <option value="longlong">6ヶ月~12ヶ月</option>
        <option value="verylong">1年~</option>
      </select>
    </>
  );
}

function createAreaElement() {
  const pref = [
    "北海道","青森県","東京都","大阪府","京都府","沖縄県"
  ];
  return (
    <>
      <h3>地域</h3>
      <select name="area" multiple>
        <option value="">指定しない</option>
        {pref.map(p => 
          <option value={p}>{p}</option>
        )}
      </select>
    </>
  );
}

function createTargetElement() {
  return (
    <>
      <h3>対象</h3>
      <select name="target">
        <option value="">指定しない</option>
        <option value="socity">社会人</option>
        <option value="student">学生</option>
      </select>
    </>
  );
}

function createFeatureisElement() {
  const featureis = [
    ["free", "無料体験・説明会あり"],
    ["jobchange", "就職・転職に強い"],
    ["mantoman", "マンツーマンあり"],
    ["training", "企業研修に使える"],
    ["campaign", "キャンペーンあり"],
  ];

  const elements = featureis.map(feature =>
    <LabelCheckbox name={feature[0]} labelText={feature[1]} />
  );

  return (
    <>
      <h3>特徴</h3>
      {elements}
    </>
  );
}


export default Search;