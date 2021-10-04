type Props = {
  name: string
};

const SchoolCard = ({name}: Props) => {
  return (
    <div>
      <p>{name}</p>
      <hr />
      <p>概要</p>
    </div>
  );
}

export default SchoolCard;