import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import LoginForm from './Components/LoginPage/login';
import RegistrationForm from './Components/RegistrationPage/registration';
import FeedbackPage from './Components/FeedbackPage/feedback';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/register" element={<RegistrationForm />}/>
      <Route path="/" element={<LoginForm />}/>
      <Route path="/feedback" element={<FeedbackPage />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
