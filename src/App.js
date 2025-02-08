import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Provider, useSelector, useDispatch } from 'react-redux';
import store from './redux/store';
import { logout } from './redux/authSlice';

import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import UsersPage from './components/UsersPage';
import HomePage from './components/HomePage';

// NavBar Component
const NavBar = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        {/* Left Side: User Management */}
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          User Management
        </Typography>

        {/* Right Side: Show Home button only on Login & Signup pages */}
        {location.pathname === '/login' || location.pathname === '/signup' ? (
          <Button color="inherit" onClick={() => navigate('/')}>
            Home
          </Button>
        ) : isLoggedIn ? (
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        ) : (
          <>
            <Button color="inherit" onClick={() => navigate('/login')}>
              Login
            </Button>
            <Button color="inherit" onClick={() => navigate('/signup')}>
              Signup
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

// Protected Route Component.
const ProtectedRoute = ({ element }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return isLoggedIn ? element : <Navigate to="/login" />;
};

// App Component
function App() {
  return (
    <Provider store={store}>
      <Router>
        <Box>
          <NavBar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/users" element={<ProtectedRoute element={<UsersPage />} />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Box>
      </Router>
    </Provider>
  );
}

export default App;
