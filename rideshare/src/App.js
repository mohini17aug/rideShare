import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import LoginForm from './Components/LoginPage/login';
import RegistrationForm from './Components/RegistrationPage/registration';
import FeedbackPage from './Components/FeedbackPage/feedback';
import RideBooking from './Components/RideBooking/RideBooking';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/register" element={<RegistrationForm />}/>
      <Route path="/" element={<LoginForm />}/>
      <Route path="/feedback" element={<FeedbackPage />} />
      <Route path="/booking" element={<RideBooking />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
