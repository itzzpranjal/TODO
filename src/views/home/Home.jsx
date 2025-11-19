import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css';
import delImg from '../../assets/delete.png';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../config';

const Home = () => {
  const [todos, setTodos] = useState([]);
  const navigate = useNavigate();
  const [warning, setWarning] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleSubmit = () => {
    navigate('/create');
  }

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}todos`);
      setTodos(response.data.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const deleteTodo = async (id) => {
    if (window.confirm('Are you sure you want to delete this todo?')) {
      try {
        const response = await axios.delete(`${API_BASE_URL}todos/${id}`);
        if (response) {
          fetchTodos();
        }
      } catch (error) {
        console.error('Error deleting todo:', error);
        alert('Failed to delete todo. Please try again.');
      }
    }
  };

  const toggleComplete = async (id, currentStatus) => {
    try {
      await axios.patch(`${API_BASE_URL}todos/${id}`, {
        completed: !currentStatus
      });
      fetchTodos();
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  return (
    <div className='main-container'>
      {warning && (
        <div className="warning">
          <p>⚠️ Backend server may take a few seconds to start up</p>
          <span className="close" onClick={() => setWarning(false)}>✕</span>
        </div>
      )}

      <div className='container'>
        <h1 className='title'>✨ My Tasks</h1>
        
        {loading ? (
          <div className="empty-state">
            <div className="empty-state-icon">⏳</div>
            <div className="empty-state-text">Loading your tasks...</div>
          </div>
        ) : todos.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">📝</div>
            <div className="empty-state-text">No tasks yet. Create your first todo!</div>
          </div>
        ) : (
          todos.map((todo) => {
            const { id, title, completed, priority } = todo;
            return (
              <div key={id} className='todo-item'>
                <div className='todo-title'>
                  <button
                    onClick={() => toggleComplete(id, completed)}
                    style={{
                      background: completed ? 'var(--success)' : 'transparent',
                      border: '2px solid ' + (completed ? 'var(--success)' : 'var(--border-color)'),
                      borderRadius: '8px',
                      width: '24px',
                      height: '24px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.2s ease',
                      flexShrink: 0
                    }}
                  >
                    {completed && <span style={{ color: '#fff', fontSize: '14px' }}>✓</span>}
                  </button>
                  <h2 className={completed ? 'todo-done' : ''}>
                    <span>{todo.emoji}</span>
                    <span>{title}</span>
                  </h2>
                </div>

                <div className='take-action'>
                  <div className='todo-info'>
                    <span className={`priority ${priority}`}>{priority}</span>
                    <span className='created-at'>{new Date().toLocaleDateString()}</span>
                  </div>
                  <button className='del-btn' onClick={() => deleteTodo(id)} title="Delete todo">
                    <img src={delImg} alt="Delete" />
                  </button>
                </div>
              </div>
            );
          })
        )}

        <div className="add-todo-button">
          <button onClick={handleSubmit} className="btn">
            ➕ Add New Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
