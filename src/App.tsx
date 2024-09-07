import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CountriesList from "./Components/CountriesList/CountriesList";
import CountryDetails from "./Components/CountryDetails/CountryDetails";

function App () {
    return (
        <>
            <Router>
                <Routes>
                  <Route path="/alfa-test-task" element={<CountriesList />} />
                  <Route path="/alfa-test-task/:name" element={<CountryDetails />} />
                </Routes>
            </Router>
        </>
    );
}

export default App;
