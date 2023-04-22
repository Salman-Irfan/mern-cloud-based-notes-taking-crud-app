import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";

function App() {
    return (
        <>
            <Navbar />
            <Alert message="this is amazing react course"/>
            <div className="container">
                <NoteState>
                    <Routes>
                        <Route exact path="/" element={<Home />} />
                        <Route exact path="/about" element={<About />} />
                    </Routes>
                </NoteState>
            </div>
        </>
    );
}

export default App;
