// import logo from './logo.svg';
import './App.css';
import Dashboard from './components/dashboard';
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";
import CreateUpdateUser from './components/create_update_user';
import {BrowserRouter, Route, Routes,
} from "react-router-dom";

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path=":userId" element={<CreateUpdateUser />} />
      </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
