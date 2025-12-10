import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { login } from '../api/private-api';
import { 
  Lock, User, Loader2, ArrowLeft, Command, ShieldAlert 
} from 'lucide-react';
import './LoginPage.css';

const LoginPage = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const data = await login(formData);
      localStorage.setItem('adminToken', data.token);
      
      // Fake "Boot sequence" delay for effect
      setTimeout(() => navigate('/admin'), 800);
    } catch (err) {
      setError('Credentials Rejected');
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      {/* Background Ambience */}
      <div className="ambient-glow"></div>
      <div className="scanline"></div>

      {/* Back Button */}
      <motion.button 
        className="back-nav-btn"
        onClick={() => navigate('/')}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ x: -5 }}
      >
        <ArrowLeft size={20} />
        <span>RETURN_HOME</span>
      </motion.button>

      <motion.div 
        className="login-card"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="card-header">
          <div className="icon-wrapper">
            <Command size={24} color="#FACC15" />
          </div>
          <div>
            <h2 className="sys-title">adminOS</h2>
            <p className="sys-sub">Restricted Environment</p>
          </div>
        </div>

        {error && (
          <motion.div 
            className="error-banner"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
          >
            <ShieldAlert size={16} />
            <span>{error}</span>
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <label>IDENTITY</label>
            <div className="input-wrapper">
              <User size={18} className="input-icon" />
              <input 
                type="text" 
                placeholder="usr_root"
                required
                value={formData.username}
                onChange={(e) => setFormData({...formData, username: e.target.value})}
                className="genz-input"
              />
            </div>
          </div>

          <div className="input-group">
            <label>PASSPHRASE</label>
            <div className="input-wrapper">
              <Lock size={18} className="input-icon" />
              <input 
                type="password" 
                placeholder="••••••••••••" 
                required
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="genz-input"
              />
            </div>
          </div>

          <motion.button 
            type="submit" 
            disabled={loading}
            className="login-btn"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                <span>AUTHENTICATING...</span>
              </>
            ) : (
              <span>INITIALIZE_SESSION</span>
            )}
          </motion.button>
        </form>

        <div className="card-footer">
          <span className="blink">_SYSTEM_READY</span>
          <span>v2.0.4</span>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;