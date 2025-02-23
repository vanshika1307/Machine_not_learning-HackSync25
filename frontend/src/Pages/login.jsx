import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider, db } from '../firebase/config';
import { doc, getDoc } from "firebase/firestore";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (error) {
      setError('Invalid email or password');
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const userDoc = await getDoc(doc(db, 'users', result.user.uid));
      
      if (!userDoc.exists()) {
        await auth.signOut();
        setError('Please register first before using Google Sign-In');
        return;
      }
      
      navigate('/');
    } catch (error) {
      setError('Google sign-in failed');
    }
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-gray-900 to-black">
      <div className="flex-[0.3] p-10 flex flex-col justify-center">
        <div className="max-w-md mx-auto">
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-yellow-400 focus:outline-none"
              />
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-yellow-400 focus:outline-none"
              />
              <span
                className="absolute right-3 top-3 text-sm text-gray-400 cursor-pointer hover:text-yellow-400"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "HIDE" : "SHOW"}
              </span>
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full p-3 bg-gradient-to-r from-blue-900 to-blue-700 text-white rounded-lg transition duration-300 hover:from-blue-800 hover:to-blue-600"
            >
              Login
            </button>
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full p-3 bg-white text-gray-800 rounded-lg transition duration-300 hover:bg-gray-100 flex items-center justify-center gap-2"
            >
              <img src="/google-icon.png" alt="Google" className="w-5 h-5" />
              Sign in with Google
            </button>
          </form>
          <div className="mt-4 text-center">
            <Link to="/register" className="text-yellow-400 hover:text-yellow-300">
              Don't have an account? Register here
            </Link>
          </div>
        </div>
      </div>
      <div className="flex-[0.7] hidden md:block">
        <img
          src="https://images.unsplash.com/photo-1419640303358-44f0d27f48e7?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGFyayUyMGJvb2t8ZW58MHx8MHx8fDA%3D"
          alt="Login background"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}

export default Login;
