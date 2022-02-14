import styles from "./styles/App.module.css";
import { Route, Routes } from "react-router-dom";
import Homepage from "./Homepage";
import Navbar from "./Navbar";
import CreateSection from "./CreateSection";
import ViewSection from "./ViewSection";
import GenerateSection from "./GenerateSection";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route
        path="create"
        element={
          <>
            <Navbar />
            <CreateSection />
          </>
        }
      >
        <Route
          path=":id"
          element={
            <>
              <Navbar />
              <CreateSection />
            </>
          }
        ></Route>
      </Route>
      <Route
        path="generate"
        element={
          <>
            <Navbar />
            <GenerateSection />
          </>
        }
      />
      <Route
        path="view"
        element={
          <>
            <Navbar />
            <ViewSection />
          </>
        }
      />
    </Routes>
  );
}

export default App;
