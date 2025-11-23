import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import TabelSiswa from './components/TabelSiswa';
import EditSiswa from './components/EditSiswa';

export default function App() {
    return (
        <BrowserRouter>
        <Routes>
            <Route path='/' element={<TabelSiswa />} />
            <Route path='/edit-siswa/:id' element={<EditSiswa />} />
        </Routes>
        </BrowserRouter>
    )
}