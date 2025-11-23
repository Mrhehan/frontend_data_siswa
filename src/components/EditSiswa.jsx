import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function EditSiswa() {
    const {id} = useParams();
    const [loading, setLoading] = useState(true)
    const [namaSiswa, setNamaSiswa] = useState('');
    const [alamatSiswa, setAlamatSiswa] = useState('');
    const [tglSiswa, setTglSiswa] = useState('');
    const [jurusanSiswa, setJurusanSiswa] = useState('');
    const navigate = useNavigate();

    const fetchDataById = () => {
        axios.get(`http://localhost:3000/api/siswa/${id}`)
        .then(response => {
            console.log('respon byId', response.data)
            const myData = response.data
            setNamaSiswa(myData['nama_siswa'])
            setAlamatSiswa(myData['alamat_siswa'])
            setTglSiswa(myData['tgl_siswa'])
            setJurusanSiswa(myData['jurusan_siswa'])
        })
        .catch(error => {
            console.error(error)
        })
        .finally(() => {
            setLoading(false)
        })
    }

    useEffect(() => {
        fetchDataById();
    }, [])


    const handleUpdate = (e) => {
        // fungsi bawaan di JavaScript untuk mencegah perilaku default (bawaan) dari suatu event (submit)
        e.preventDefault(); 
        axios.put(`http://localhost:3000/api/siswa/${id}`,
            {
                nama_siswa: namaSiswa,
                alamat_siswa: alamatSiswa,
                tgl_siswa: tglSiswa,
                jurusan_siswa: jurusanSiswa
            }
        )
        .then(response => {
            console.log(response)
            var message = response.data
            if(message) {
                alert('data berhasil diupdate')
            }
            navigate('/')
        })
        .catch(error => {
            console.error(error)
        })
        .finally(() => {
            setLoading(false)
        })
    }

    if(loading) {
        return (
            <div className="text-center mt-5">
                <div className="spinner-border text-secondary " role="status">
                <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        )
    }

    return (
            <>
            <div className="container">
                <div className="card mt-5 p-3">
                <h2 className="text-center">Edit data siswa</h2>
                    <div className="card-body">
                            <form onSubmit={handleUpdate}>
                                <div className="mb-3">
                                    <label className="form-label">Nama Siswa</label>
                                    <input
                                        type="text"
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
                                        className="form-control"
                                        placeholder="Informatika"
                                        value={jurusanSiswa}
                                        onChange={(e) => setJurusanSiswa(e.target.value)}
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary col-12" >Update</button>
                            </form>
                    </div>
                </div>
            </div>
            </>
        )
}