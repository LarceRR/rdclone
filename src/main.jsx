import React from 'react';
import ReactDOM from 'react-dom/client';
import Router from './Router.jsx';
import { BrowserRouter } from 'react-router-dom';

//css
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/index.css';
import './styles/components/buttons.css';
import './styles/components/links.css';
import 'animate.css';
import { ToastContainer } from 'react-toastify';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <ToastContainer />
            <Router />
        </BrowserRouter>
    </React.StrictMode>,
);
