import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'  
import Header from "./components/Header"
import Home from './pages/Home';
import Transaction from "./pages/Transaction";
import Wallet from "./pages/Wallet";
import Exchange from "./pages/Exchange";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Verification from "./pages/Verification";
import Transfer from "./pages/Transfer";

function App() {
  return (
    <>
      <Router>
        <div>
          <Header />
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/transaction" element={<Transaction />} />
              <Route path="/transfer" element={<Transfer /> }/>
              <Route path="/wallet" element={<Wallet />} />
              <Route path="/exchange" element={<Exchange /> }/>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/verification" element={<Verification />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
