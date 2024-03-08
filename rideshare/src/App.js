import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import LoginForm from './Components/LoginPage/login';
import RegistrationForm from './Components/RegistrationPage/registration';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/register" element={<RegistrationForm />}/>
      <Route path="/" element={<LoginForm />}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
