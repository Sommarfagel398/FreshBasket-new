import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/App.jsx';

// Bootstrap CSS + Icons
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

// Bootstrap JS bundle (includes Popper)
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// App styles
import '@/custom.css';

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
