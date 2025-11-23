import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function TabelSiswa() {
    const [siswa, setSiswa] = useState([]);
    const [loading, setLoading] = useState(true);
    const [namaSiswa, setNamaSiswa] = useState('');
    const [alamatSiswa, setAlamatSiswa] = useState('');
    const [tglSiswa, setTglSiswa] = useState('');
    const [jurusanSiswa, setJurusanSiswa] = useState('');
    const navigate = useNavigate();

    const fetchData = () => {
        axios.get('http://localhost:3000/api/siswa')
            .then(response => {
                setSiswa(response.data)
                console.log('response all data', response.data)
            })
            .catch(error => {
                console.error('tidak ada data', error)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    useEffect(() => {
        fetchData();
    }, [])

    const handleSubmit = (e) => {
        // mencegah aksi default dari form submit
        e.preventDefault();

        axios.post('http://localhost:3000/api/siswa',
            {
                nama_siswa: namaSiswa,
                alamat_siswa: alamatSiswa,
                tgl_siswa: tglSiswa,
                jurusan_siswa: jurusanSiswa
            }
        )
            .then(response => {
                setNamaSiswa("");
                setAlamatSiswa("");
                setTglSiswa("");
                setJurusanSiswa("");
                fetchData();
                console.log('response', response);
                // navigate('/')
            })
            .catch(error => {
                console.error('gagal tambah data', error);
            })
            .finally(() => {
                setLoading(false)
            })
    }

    const handleDelete = (id) => {
        const confirmDelete = window.confirm('Apakah yakin hapus?');
        if (!confirmDelete) return;

        axios.delete(`http://localhost:3000/api/siswa/${id}`)
            .then(response => {
                fetchData();
                console.log('Data berhasil dihapus', response)
            })
            .catch(error => {
                console.error('gagal hapus', error)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    if (loading) {
        return (
            <div className="text-center mt-5">
                <div className="spinner-border text-secondary " role="status">
                <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        )
    }

    const handleEdit = (id) => {
        navigate(`/edit-siswa/${id}`)
    }

    return (
        <>
            <div className="container">
                <div className="card mt-5 p5 border-0">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-9 mb-3">
                                <h2>Data Siswa</h2>
                            </div>
                            <div className="col">
                                <button
                                    type="button"
                                    className="btn btn-primary col-6"
                                    data-bs-toggle="modal"
                                    data-bs-target="#exampleModal"
                                >
                                    <i className="bi bi-plus-circle"></i> Tambah
                                </button>
                            </div>
                        </div>

                        <table className="table">
                            <thead className="table-primary border-0">
                                <tr>
                                    <th scope="col">No</th>
                                    <th scope="col">Nama Siswa</th>
                                    <th scope="col">Alamat Siswa</th>
                                    <th scope="col">Tanggal Siswa</th>
                                    <th scope="col">Jurusan Siswa</th>
                                    <th scope="col">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {siswa.map((siswa, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{siswa.nama_siswa}</td>
                                        <td>{siswa.alamat_siswa}</td>
                                        <td>{new Date(siswa.tgl_siswa).toLocaleDateString('id-ID')}</td>
                                        <td>{siswa.jurusan_siswa}</td>
                                        <td>
                                            <button
                                                onClick={() => handleEdit(siswa.kode_siswa)}
                                                className="btn btn-warning"
                                            >
                                            <i className="bi bi-pencil-square"></i> Edit
                                            </button>

                                            <button
                                                onClick={() => handleDelete(siswa.kode_siswa)}
                                                className="btn btn-danger"
                                                style={{ marginLeft: '10px' }}
                                            >
                                                <i className="bi bi-trash3"></i> Hapus
                                            </button>
                                        </td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Tambah siswa</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Nama Siswa</label>
                                    <input
                                        type="text"
                                        required
                                        className="form-control"
                                        placeholder="name example"
                                        value={namaSiswa}
                                        onChange={(e) => setNamaSiswa(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Alamat Siswa</label>
                                    <textarea
                                        type="text"
                                        required
                                        className="form-control"
                                        placeholder="JL. Alamat"
                                        value={alamatSiswa}
                                        onChange={(e) => setAlamatSiswa(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Tanggal Siswa</label>
                                    <input
                                        type="date"
                                        required
                                        className="form-control"
                                        placeholder="23/11/2025"
                                        value={tglSiswa}
                                        onChange={(e) => setTglSiswa(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Jurusan Siswa</label>
                                    <input
                                        type="text"
                                        required
                                        className="form-control"
                                        placeholder="Informatika"
                                        value={jurusanSiswa}
                                        onChange={(e) => setJurusanSiswa(e.target.value)}
                                    />
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="submit" className="btn btn-primary">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
