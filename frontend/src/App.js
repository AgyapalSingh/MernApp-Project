import './App.css';
import { Route, Routes} from 'react-router-dom'
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';
import PrivateRoute from './components/Routes/Private';
import ForgotPassword from './pages/ForgotPassword';
import Categories from './pages/Categories';
import AdminRoute from './components/Routes/AdminRoute';
import Dashboard from './pages/User/Dashboard';

function App() {
  return (
    <>
      
        <Routes>
          <Route path='/' element={<HomePage/>} />

          <Route path='/dashboard' element={<PrivateRoute/>} >
              <Route path='user' element={<Dashboard/>} />
          </Route>

          <Route path='/dashboard' element={<AdminRoute/>} >
              <Route path='admin' element={<AdminDashboard/>} />
          </Route>
          
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} />
          <Route path='/forgot-password' element={<ForgotPassword/>} />

          <Route path='/categories' element={<Categories/>} />
        </Routes>
     
    </>
  );
}

export default App;
