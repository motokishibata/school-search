import SchoolCard from "../SchoolCard";

type Props = {
  names: string[]
};

const SchoolList = ({names}: Props) => {
  return (
    <div>
      {names.map(name => <SchoolCard name={name}/>)}
    </div>
  );
}

export default SchoolList;