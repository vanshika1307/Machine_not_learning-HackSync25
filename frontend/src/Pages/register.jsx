import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase/config";
import PhoneVerification from "../components/PhoneVerification"; // Ensure this component exists

export const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [phoneVerified, setPhoneVerified] = useState(false);

  // Step 1: Validate and move to phone verification
  const handleInitialSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setError(""); // Clear previous errors
    setStep(2); // Move to phone verification
  };

  // Step 2: Handle phone verification and register the user
  const handlePhoneVerificationComplete = async () => {
    setPhoneVerified(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  // Google Sign-Up
  const handleGoogleRegister = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/");
    } catch (error) {
      setError("Google sign-up failed");
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-gray-900 to-black">
      {/* Left Section */}
      <div className="flex-[0.4] hidden md:block">
        <img
          src="https://plus.unsplash.com/premium_photo-1695322790437-d27413ea61da?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZGFyayUyMGxpYnJhcnl8ZW58MHx8MHx8fDA%3D"
          alt="Register background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Section */}
      <div className="flex-[0.6] p-10 flex flex-col justify-center">
        <div className="flex justify-between mb-5">
          <Link to="/" className="text-gray-400 hover:text-yellow-400 transition duration-300">
            ← Back to Home
          </Link>
          <Link to="/login" className="text-gray-400 hover:text-yellow-400 transition duration-300">
            Login Now
          </Link>
        </div>

        <div className="max-w-lg w-full mx-auto">
          <h2 className="text-2xl font-semibold mb-2 text-center text-white">
            Bring Your Stories to Life
          </h2>
          <p className="text-gray-400 mb-7 text-center">Register Today</p>

          {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

          {step === 1 ? (
            // Step 1: Registration Form
            <form onSubmit={handleInitialSubmit} className="space-y-5">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-yellow-400 focus:outline-none"
                required
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@email.com"
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-yellow-400 focus:outline-none"
                required
              />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone Number"
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-yellow-400 focus:outline-none"
                required
              />

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-yellow-400 focus:outline-none"
                  required
                />
                <span
                  className="absolute right-3 top-3 text-sm text-gray-400 cursor-pointer hover:text-yellow-400"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "HIDE" : "SHOW"}
                </span>
              </div>

              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm Password"
                  className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-yellow-400 focus:outline-none"
                  required
                />
                <span
                  className="absolute right-3 top-3 text-sm text-gray-400 cursor-pointer hover:text-yellow-400"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? "HIDE" : "SHOW"}
                </span>
              </div>

              <button
                type="submit"
                className="w-full p-3 bg-gradient-to-r from-blue-900 to-blue-700 text-white rounded-lg transition duration-300 hover:from-blue-800 hover:to-blue-600"
              >
                Continue to Phone Verification
              </button>

              <button
                type="button"
                onClick={handleGoogleRegister}
                className="w-full p-3 bg-white text-gray-800 rounded-lg transition duration-300 hover:bg-gray-100 flex items-center justify-center gap-2"
              >
                <img src="/google-icon.png" alt="Google" className="w-5 h-5" />
                Sign up with Google
              </button>
            </form>
          ) : (
            // Step 2: Phone Verification
            <PhoneVerification
              phoneNumber={phone}
              userData={{ name, email, phone }}
              onComplete={handlePhoneVerificationComplete}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
