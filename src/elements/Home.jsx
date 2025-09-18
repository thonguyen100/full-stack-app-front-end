import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../client';
// import './elements.css';
import 'client/src/styles/elements.css'; 

function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteLoading, setDeleteLoading] = useState({});

  const fetchStudents = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await api.get('/students');

      console.log('[Home] API response:', response.data);

      if (Array.isArray(response.data)) {
        setData(response.data);
      } else if (Array.isArray(response.data.students)) {
        setData(response.data.students);
      } else {
        setError('Unexpected response format from server.');
        setData([]);
      }

    } catch (err) {
      console.error('Error fetching students:', err);
      setError(err.response?.data?.message || 'Failed to fetch students');
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('⚠ Are you ABSOLUTELY sure you want to DELETE this student? This action cannot be undone!')) return;

    try {
      setDeleteLoading((prev) => ({ ...prev, [id]: true }));
      await api.delete(`/delete/${id}`);
      setData((prev) => prev.filter((student) => student.id !== id));
      console.log('Student deleted successfully');
    } catch (err) {
      console.error('Error deleting student:', err);
      alert(err.response?.data?.message || 'Failed to delete student');
    } finally {
      setDeleteLoading((prev) => ({ ...prev, [id]: false }));
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  if (loading) {
    return (
      <div className="brutal-loading">
        <div className="brutal-spinner"></div>
      </div>
    );
  }

  return (
    <div className="brutal-container">
      <div className="brutal-content">
        <div className="brutal-header">
          <h1 className="brutal-title brutal-glitch" data-text="Wiz Tech Finance">
            Wiz Tech Finance
          </h1>
          <Link className="brutal-btn brutal-btn-success" to="/create">
            ➕ Add Student
          </Link>
        </div>

        {error && (
          <div className="brutal-alert brutal-alert-danger">
            ⚠ {error}
            <button
              className="brutal-btn brutal-btn-light"
              onClick={fetchStudents}
              style={{ marginLeft: '16px', padding: '8px 16px', fontSize: '0.9rem' }}
            >
              🔄 Retry
            </button>
          </div>
        )}

        {Array.isArray(data) && data.length === 0 && !error ? (
          <div className="brutal-alert brutal-alert-info brutal-text-center">
            <h2>📝 NO STUDENTS FOUND</h2>
            <p style={{ fontSize: '1.2rem', margin: '16px 0' }}>
              The database is empty. Start by adding your first student!
            </p>
            <Link className="brutal-btn brutal-btn-success" to="/create">
              ➕ Add First Student
            </Link>
          </div>
        ) : (
          <div className="brutal-table-container">
            <table className="brutal-table">
              <thead className="brutal-table-header">
                <tr>
                  <th>ID</th>
                  <th>NAME</th>
                  <th>EMAIL</th>
                  <th>AGE</th>
                  <th>GENDER</th>
                  <th className="brutal-text-center">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(data) ? (
                  data.map((student) => (
                    <tr key={student.id}>
                      <td>#{student.id}</td>
                      <td>{student.name}</td>
                      <td>{student.email}</td>
                      <td>{student.age} yrs</td>
                      <td>
                        <span
                          className={`brutal-badge ${
                            student.gender === 'Male'
                              ? 'brutal-badge-male'
                              : student.gender === 'Female'
                              ? 'brutal-badge-female'
                              : 'brutal-badge-other'
                          }`}
                        >
                          {student.gender}
                        </span>
                      </td>
                      <td className="brutal-text-center">
                        <div className="brutal-btn-group">
                          <Link
                            className="brutal-btn brutal-btn-info"
                            to={`/read/${student.id}`}
                            title="View Details"
                          >
                            👁 View
                          </Link>
                          <Link
                            className="brutal-btn brutal-btn-warning"
                            to={`/edit/${student.id}`}
                            title="Edit Student"
                          >
                            ✏ Edit
                          </Link>
                          <button
                            onClick={() => handleDelete(student.id)}
                            className="brutal-btn brutal-btn-danger"
                            disabled={deleteLoading[student.id]}
                            title="Delete Student"
                          >
                            {deleteLoading[student.id] ? (
                              <div className="brutal-spinner" style={{ width: '16px', height: '16px' }}></div>
                            ) : (
                              '🗑 Delete'
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="brutal-text-center">
                      ⚠ INVALID DATA FORMAT FROM SERVER
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;