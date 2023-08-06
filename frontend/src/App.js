import './App.css';
import { Route, Routes} from 'react-router-dom'
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/AdminDashboard/Dashboard';
import PrivateRoute from './components/Routes/Private';
import ForgotPassword from './pages/ForgotPassword';
import Categories from './pages/Categories';

function App() {
  return (
    <>
      
        <Routes>
          <Route path='/' element={<HomePage/>} />

          <Route path='/dashboard' element={<PrivateRoute/>} >
            
          <Route path='' element={<Dashboard/>} />
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
