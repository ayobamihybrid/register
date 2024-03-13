import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import Register from './pages/Register';

function App() {
  return (
    <div>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Register />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
