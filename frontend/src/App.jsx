import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProfessionalHome from "./ProfessionalHome";
import AccountPage from "./AccountPage";
import SignupPage from "./SignupPage";
import ProfilePage from "./ProfilePage";
import CartPage from "./CartPage";
import LoginPage from "./LoginPage";
import CheckoutPage from "./CheckoutPage";
import ProductPage from "./ProductPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProfessionalHome />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
      </Routes>
    </Router>
  );
}

export default App;
