import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SingIn } from './pages/SingIn';
import {SingUp} from './pages/SingUp';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SingIn />} />
        <Route path="/singUp" element={<SingUp/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;