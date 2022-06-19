const HeadsTails = (props) => {
  const randomNumber = async () => {
    const a = Math.floor(Math.random() * 10);
    //if even then heads or else tails;
    let result = 0;
    if (a % 2 === 0) {
      result = "Heads";
    } else {
      result = "Tails";
    }
    console.log(result);
    props.onJoin(result);
  };
  return (
    <div>
      <button onClick={randomNumber}>Join Game</button>
    </div>
  );
};
export default HeadsTails;
