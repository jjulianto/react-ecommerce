import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, Cart } from "./pages";
import { NavbarComponent } from "./components";
import ReactNotification from "react-notifications-component";

const App = () => {
  return (
    <BrowserRouter>
      <NavbarComponent />
      <ReactNotification />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
