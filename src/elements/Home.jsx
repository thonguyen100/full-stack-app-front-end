import api from '../client' // Import your configured axios instance
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Home() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [deleteLoading, setDeleteLoading] = useState({})

    // Fetch students data
    const fetchStudents = async () => {
        try {
            setLoading(true)
            setError('')
            const response = await api.get('/api/students')
            setData(response.data)
        } catch (err) {
            console.error('Error fetching students:', err)
            setError(err.response?.data?.message || 'Failed to fetch students')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchStudents()
    }, [])

    console.log('Fetched students:', data)

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this student?')) {
            return
        }

        try {
            setDeleteLoading(prev => ({ ...prev, [id]: true }))
            await api.delete(`/api/delete/${id}`)
            // Remove the deleted student from the state
            setData(prevData => prevData.filter(student => student.id !== id))
            console.log('Student deleted successfully')
        } catch (err) {
            console.error('Error deleting student:', err)
            alert(err.response?.data?.message || 'Failed to delete student')
        } finally {
            setDeleteLoading(prev => ({ ...prev, [id]: false }))
        }
    }

    if (loading) {
        return (
            <div className='container-fluid bg-primary vh-100 vw-100 d-flex justify-content-center align-items-center'>
                <div className="spinner-border text-light" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        )
    }

    return (
        <div className='container-fluid bg-primary vh-100 vw-100 p-4'>
            <div className='row'>
                <div className='col'>
                    <h3 className='text-white mb-4'>Students</h3>
                    
                    <div className='d-flex justify-content-end mb-3'>
                        <Link className='btn btn-success' to='/create'>
                            <i className='fas fa-plus me-2'></i>Add Student
                        </Link>
                    </div>

                    {error && (
                        <div className='alert alert-danger' role='alert'>
                            {error}
                            <button 
                                className='btn btn-sm btn-outline-danger ms-2'
                                onClick={fetchStudents}
                            >
                                Retry
                            </button>
                        </div>
                    )}

                    {data.length === 0 && !error ? (
                        <div className='alert alert-info text-center'>
                            <h5>No students found</h5>
                            <p>Start by adding your first student!</p>
                            <Link className='btn btn-success' to='/create'>Add Student</Link>
                        </div>
                    ) : (
                        <div className='table-responsive'>
                            <table className='table table-striped table-hover bg-white'>
                                <thead className='table-dark'>
                                    <tr>
                                        <th scope='col'>ID</th>
                                        <th scope='col'>Name</th>
                                        <th scope='col'>Email</th>
                                        <th scope='col'>Age</th>
                                        <th scope='col'>Gender</th>
                                        <th scope='col' className='text-center'>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((student) => (
                                        <tr key={student.id}>
                                            <td>{student.id}</td>
                                            <td>{student.name}</td>
                                            <td>{student.email}</td>
                                            <td>{student.age}</td>
                                            <td>
                                                <span className={`badge ${
                                                    student.gender === 'Male' ? 'bg-primary' : 
                                                    student.gender === 'Female' ? 'bg-success' : 
                                                    'bg-info'
                                                }`}>
                                                    {student.gender}
                                                </span>
                                            </td>
                                            <td className='text-center'>
                                                <div className='btn-group' role='group'>
                                                    <Link 
                                                        className='btn btn-sm btn-outline-info' 
                                                        to={`/read/${student.id}`}
                                                        title='View Details'
                                                    >
                                                        <i className='fas fa-eye'></i>
                                                    </Link>
                                                    <Link 
                                                        className='btn btn-sm btn-outline-warning' 
                                                        to={`/edit/${student.id}`}
                                                        title='Edit Student'
                                                    >
                                                        <i className='fas fa-edit'></i>
                                                    </Link>
                                                    <button 
                                                        onClick={() => handleDelete(student.id)} 
                                                        className='btn btn-sm btn-outline-danger'
                                                        disabled={deleteLoading[student.id]}
                                                        title='Delete Student'
                                                    >
                                                        {deleteLoading[student.id] ? (
                                                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                        ) : (
                                                            <i className='fas fa-trash'></i>
                                                        )}
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Home