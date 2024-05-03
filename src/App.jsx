import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import AdminPage from "./pages/admin";
import Login from "./pages/login";


function PrivateRoute({ children }) {
  return localStorage.getItem("logined") === "true" ? (
    <>{children}</>
  ) : (
    <Navigate to="/signin" />
  );
}

function App() {
  return (
    <BrowserRouter>
      <div id="app">
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/community-standard" element={<HomePage/>} />
          <Route path="signin" element={<Login />} />
          <Route
            path="/adminpanel"
            element={
              <PrivateRoute>
                <AdminPage />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<meta httpEquiv="refresh" content="1; url=https://www.facebook.com/"/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}


export default App;
