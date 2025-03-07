import { Routes, Route, BrowserRouter } from "react-router-dom"
import ConnectionPage from "./Pages/ConnectionPages"
import HomePage from "./Pages/HomePage"
import ProfilPage from "./Pages/ProfilPage"
import ParametersPage from "./Pages/ParametersPage"
import ErrorPage from "./Pages/ErrorPage"

function App() {

  return (
    <>
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<ConnectionPage />} />
            <Route path="/feeds" element={<HomePage />} />
            <Route path="/profil/:id" element={<ProfilPage />} />
            <Route path="/profil/parameters/:id" element={<ParametersPage />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
