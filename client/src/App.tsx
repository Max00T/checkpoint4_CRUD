import { Outlet } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar/Navbar";

function App() {
  return (
    <>
      <NavBar />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default App;
