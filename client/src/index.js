import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { AuthContextProvider } from './components/context/authContext';
import { BrowserRouter } from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import {SearchContextProvider} from './components/context/searchContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<AuthContextProvider>
<SearchContextProvider>
<BrowserRouter>
<App />
</BrowserRouter>
</SearchContextProvider>
</AuthContextProvider>


);


