import React, { useState } from 'react';
import './CreateTodo.css';
import EmojiPicker from 'emoji-picker-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../config';

const CreateTodo = () => {
  const [todoData, setTodoData] = useState({
    title: '',
    priority: 'low',
    emoji: '✨',
  });

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const navigate = useNavigate();

  const addTodo = async (e) => {
    e.preventDefault();
    
    if (!todoData.title.trim()) {
      setMessage({ type: 'error', text: 'Please enter a task title' });
      return;
    }

    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await axios.post(`${API_BASE_URL}todos`, todoData);
      
      if (response) {
        setMessage({ type: 'success', text: response.data.message });
        setTimeout(() => {
          navigate('/');
        }, 1500);
      }
    } catch (error) {
      console.error('Error creating todo:', error);
      setMessage({ type: 'error', text: 'Failed to create todo. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-container">
      <div className="container">
        <h2>Create New Task</h2>
        
        <form onSubmit={addTodo}>
          <div className="form-group">
            <label htmlFor="title">Task Title</label>
            <input
              id="title"
              type="text"
              placeholder="Enter your task..."
              value={todoData.title}
              onChange={(e) => setTodoData({ ...todoData, title: e.target.value })}
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="priority">Priority Level</label>
            <select
              id="priority"
              value={todoData.priority}
              onChange={(e) => setTodoData({ ...todoData, priority: e.target.value })}
              disabled={loading}
            >
              <option value="low">🟢 Low Priority</option>
              <option value="medium">🟡 Medium Priority</option>
              <option value="high">🔴 High Priority</option>
            </select>
          </div>

          <div className="form-group">
            <label>Task Emoji</label>
            <div className="emoji-section">
              <div className="emoji-preview">{todoData.emoji}</div>
              <button
                className="emoji-button"
                onClick={(e) => {
                  e.preventDefault();
                  setShowEmojiPicker(!showEmojiPicker);
                }}
                type="button"
                disabled={loading}
              >
                {showEmojiPicker ? 'Close Picker' : '🎨 Choose Emoji'}
              </button>
            </div>
            
            {showEmojiPicker && (
              <div className="emoji-picker-container">
                <EmojiPicker
                  onEmojiClick={(emojiObject) => {
                    setTodoData({ ...todoData, emoji: emojiObject.emoji });
                    setShowEmojiPicker(false);
                  }}
                  open={showEmojiPicker}
                  theme="dark"
                />
              </div>
            )}
          </div>

          {message.text && (
            <div className={message.type === 'success' ? 'success-message' : 'error-message'}>
              {message.text}
            </div>
          )}

          <button 
            className='add-todo-button' 
            type="submit"
            disabled={loading || !todoData.title.trim()}
          >
            {loading ? 'Creating...' : '✨ Create Task'}
          </button>
        </form>

        <button 
          className="back-button"
          onClick={() => navigate('/')}
          disabled={loading}
        >
          ← Back to Tasks
        </button>
      </div>
    </div>
  );
};

export default CreateTodo;
