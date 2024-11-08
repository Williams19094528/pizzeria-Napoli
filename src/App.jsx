// App.jsx
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useContext } from "react";
import { AppProvider, AppContext } from "./context/AppContext";
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
import AdminPage from "./pages/AdminPage";
import ShoppingCartPage from "./pages/ShoppingCartPage";

// Ruta protegida para verificar autenticación y rol de administrador
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
      <Router>
        <NavigationBar />
        <Routes>
          {/* Rutas principales */}
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/local-despacho" element={<LocalDespachoPage />} />
          <Route path="/quienes-somos" element={<AboutUsPage />} />

          {/* Rutas de autenticación */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Perfil y gestión del usuario */}
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/edit-profile" element={<EditProfile />} />

          {/* Carro de compra (actúa también como checkout) */}
          <Route path="/cart" element={<ShoppingCartPage />} />
          <Route path="/checkout" element={<Navigate to="/cart" />} />

          {/* Redirigir /orders al perfil */}
          <Route path="/orders" element={<Navigate to="/profile" />} />

          {/* Ruta protegida para la administración */}
          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <AdminPage />
              </PrivateRoute>
            }
          />
        </Routes>
        <Footer />
      </Router>
    </AppProvider>
  );
}

export default App;
