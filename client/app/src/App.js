import logo from "./logo.svg";
import "./App.css";
import Axios from "axios";

function App() {
  const click = () => {
    Axios.post("http://localhost:3001/create", {
      rno: 2,
    });
    console.log("click");
  };
  return (
    <div className="App">
      <button onClick={click}>click</button>
    </div>
  );
}

export default App;
