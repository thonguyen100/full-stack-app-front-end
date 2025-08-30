import React, { useState } from 'react'
import api from '../client' // Import your configured axios instance
import {Link, useNavigate} from 'react-router-dom'

function Create() {
    const [values, setValues] = useState({
        name: '',
        email: '',
        age: '',
        gender: ''
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const navigate = useNavigate()

    async function handleSubmit(e){
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            const response = await api.post('/add_user', values)
            console.log('Student added successfully:', response.data)
            navigate('/')
        } catch (err) {
            console.error('Error adding student:', err)
            setError(err.response?.data?.message || 'Failed to add student')
        } finally {
            setLoading(false)
        }
    }

    function handleInputChange(field, value) {
        setValues({...values, [field]: value})
        // Clear error when user starts typing
        if (error) setError('')
    }

    return (
        <div className='container vh-100 vw-100 bg-primary'>
            <div className='row'>
                <h3>Add Student</h3>
                <div className='d-flex justify-content-end'>
                    <Link to='/' className='btn btn-success'>Home</Link>
                </div>
                
                {error && (
                    <div className='alert alert-danger' role='alert'>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className='form-group my-3'>
                        <label htmlFor='name'>Name</label>
                        <input 
                            type='text' 
                            id='name'
                            name='name' 
                            className='form-control'
                            value={values.name}
                            required 
                            disabled={loading}
                            onChange={(e) => handleInputChange('name', e.target.value)} 
                        />
                    </div>
                    <div className='form-group my-3'>
                        <label htmlFor='email'>Email</label>
                        <input 
                            type='email' 
                            id='email'
                            name='email' 
                            className='form-control'
                            value={values.email}
                            required 
                            disabled={loading}
                            onChange={(e) => handleInputChange('email', e.target.value)} 
                        />
                    </div>
                    <div className='form-group my-3'>
                        <label htmlFor='gender'>Gender</label>
                        <select 
                            id='gender'
                            name='gender' 
                            className='form-control'
                            value={values.gender}
                            required 
                            disabled={loading}
                            onChange={(e) => handleInputChange('gender', e.target.value)}
                        >
                            <option value=''>Select Gender</option>
                            <option value='Male'>Male</option>
                            <option value='Female'>Female</option>
                            <option value='Other'>Other</option>
                        </select>
                    </div>
                    <div className='form-group my-3'>
                        <label htmlFor='age'>Age</label>
                        <input 
                            type='number' 
                            id='age'
                            name='age' 
                            className='form-control'
                            value={values.age}
                            min='1'
                            max='150'
                            required 
                            disabled={loading}
                            onChange={(e) => handleInputChange('age', e.target.value)} 
                        />
                    </div>
                    <div className='form-group my-3'>
                        <button 
                            type='submit' 
                            className='btn btn-success'
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                    Saving...
                                </>
                            ) : (
                                'Save'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Create