import Header from './components/Header.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Login from './components/auth/login.jsx';
import Register from './components/auth/Register.jsx';
import SearchResults from './pages/SearchResult.jsx';
import AddPlace from './pages/AddPlace.jsx';
import { Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth.js';

function PrivateRoute({ children }) {
  const user = useAuth();
  if (!user) {
    return <Navigate to="/" replace />;
  }
  return children;
}

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/add-place" element={<AddPlace />} />
      </Routes>
    </Router>
  );
}

export default App;
