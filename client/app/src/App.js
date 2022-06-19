import logo from "./logo.svg";
import "./App.css";
import Axios from "axios";
import CreateMatch from "./Components/CreateMatch";
import Register from "./Components/Register/Register";

function App() {
  const click = () => {
    Axios.post("http://localhost:3001/create", {
      rno: 2,
    });
    console.log("click");
  };
  return (
    <div className="App">
      <CreateMatch />
      <Register />
      <button onClick={click}>click</button>
    </div>
  );
}

export default App;
