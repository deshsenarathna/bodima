import Header from './components/Header.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import Login from './components/auth/login.jsx';
import Register from './components/auth/Register.jsx';
import SearchResults from './pages/SearchResult.jsx';
import AddPlace from './pages/AddPlace.jsx';
import { Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth.js';
import PlaceDetails from './pages/PlaceDetails.jsx';

function PrivateRoute({ children }) {
  const user = useAuth();
  if (!user) {
    return <Navigate to="/" replace />;
  }
  return children;
}

function App() {
  console.log("API URL:", import.meta.env.VITE_API_BASE_URL);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Listings */}
        <Route path="/search" element={<SearchResults />} />
        <Route path="/listing/:id" element={<PlaceDetails />} />

        {/* Add place (you can protect this if needed) */}
        <Route
          path="/add-place"
          element={
            <PrivateRoute>
              <AddPlace />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;