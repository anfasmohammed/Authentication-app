import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Collection from './pages/Collection';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import UserDashBoard from './pages/USER/UserDashBoard';
import Profile from './pages/USER/Profile';
import Orders from './pages/USER/Orders';
import UserRoute from './components/ROUTES/UserRoute';
import AdminDashboard from './pages/ADMIN/AdminDashboard';
import CreateCollection from './pages/ADMIN/CreateCollection';
import CreateProducts from './pages/ADMIN/CreateProducts';
import Users from './pages/ADMIN/Users';
import AdminRoute from './components/ROUTES/AdminRoute';
import Products from './pages/ADMIN/Products';
import ProdutsDetails from './pages/ProdutsDetails';

function App() {
  return (
    <div className="App relative">
      <div className='absolute inset-0 -z-10 h-full w-full  [background:radial-gradient(125%_125%_at_50%_10%,beige_40%,brown_100%)]'/>
     <Routes>
     <Route path='/' element={<Home/>}/>
     <Route path='login' element={<Login/>}/>
     <Route path='signup' element={<SignUp/>}/>
     <Route path='collection' element={<Collection/>}/>
     <Route path='/:slug' element={<ProdutsDetails/>}/>

     <Route path='/dashboard' element={<UserRoute/>}>
     <Route path="user" element={<UserDashBoard/>}/>
     <Route path='user/profile' element={<Profile/>}/>
     <Route path='user/orders' element={<Orders/>}/>
     </Route>

     <Route path='/dashboard' element={<AdminRoute/>}>
     <Route path="admin" element={<AdminDashboard/>}/>
     <Route path='admin/create-collection' element={<CreateCollection/>}/>
     <Route path='admin/create-products' element={<CreateProducts/>}/>
     <Route path='admin/users' element={<Users/>}/>
     <Route path='admin/products' element={<Products/>}/>


     </Route>
     </Routes>
    </div>
  );
}

export default App;
