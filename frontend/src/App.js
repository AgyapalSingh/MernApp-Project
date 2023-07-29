import './App.css';
import { Route, Routes} from 'react-router-dom'
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/AdminDashboard/Dashboard';
import PrivateRoute from './components/Routes/Private';

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
        </Routes>
     
    </>
  );
}

export default App;
