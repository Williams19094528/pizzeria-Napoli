import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useContext } from "react";
import { AppProvider, AppContext } from "./context/AppContext"; // Importa AppProvider
import NavigationBar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import MenuPage from "./pages/MenuPage";
import LocalDespachoPage from "./pages/LocalDespachoPage";
import AboutUsPage from "./pages/AboutUsPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UserProfile from "./pages/UserProfile";
import EditProfile from "./pages/EditProfile";
import AdminPage from "./pages/AdminPage"; // Nueva página para administración

// Ruta protegida que verifica autenticación y rol de administrador
const PrivateRoute = ({ children }) => {
  const { isAuthenticated, user } = useContext(AppContext);
  return isAuthenticated && user?.role === "admin" ? (
    children
  ) : (
    <Navigate to="/login" />
  );
};

function App() {
  return (
    <AppProvider>
      {" "}
      {/* Cambiado de AppContext.Provider a AppProvider */}
      <Router>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/local-despacho" element={<LocalDespachoPage />} />
          <Route path="/quienes-somos" element={<AboutUsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/edit-profile" element={<EditProfile />} />

          {/* Ruta protegida para admin */}
          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <AdminPage />
              </PrivateRoute>
            }
          />
        </Routes>
        <Footer /> {/* Mostrar el pie de página al final */}
      </Router>
    </AppProvider>
  );
}

export default App;
