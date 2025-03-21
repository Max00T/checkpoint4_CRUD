import "./App.css";
import NavBar from ".components/NavBar/Navbar";

function App() {
  return (
    <>
      <main>
        <Outlet />
      </main>
      <NavBar />
    </>
  );
}

export default App;
