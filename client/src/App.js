import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Collection from './pages/Collection';
import Login from './pages/Login';
import SignUp from './pages/SignUp';

function App() {
  return (
    <div className="App">
     <Routes>
     <Route path='/' element={<Layout/>}>
     <Route index element={<Home/>}/>
     <Route path='/collection' element={<Collection/>}/>
     <Route path='/login' element={<Login/>}/>
     <Route path='/signup' element={<SignUp/>}/>
     </Route>
     </Routes>
    </div>
  );
}

export default App;
