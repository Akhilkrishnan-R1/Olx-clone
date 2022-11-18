import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './Pages/Home';
import SignupPage from './Pages/Signup';
import LoginPage from './Pages/Login';
import CreatePage from './Pages/Create';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/config';
import { UserAuth } from './store/firebaseContext';
import ViewPost from './Pages/ViewPost';
import ProfilePage from './Pages/ProfilePage';
import ProtectedRoutes from './Components/ProtectedRoutes';


function App() {
    
  const { setUser } = UserAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    })
  },[])
  

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route path="/signup" element={<SignupPage/>}/>
          <Route path="/login" element={<LoginPage/>} />
          <Route path='/create' element={<ProtectedRoutes><CreatePage/></ProtectedRoutes>}/>
          <Route path='/view' element={<ViewPost/>} />
          <Route path='/profile' element={<ProtectedRoutes><ProfilePage/></ProtectedRoutes>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
