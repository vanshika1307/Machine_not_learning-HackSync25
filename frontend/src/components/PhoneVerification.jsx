// src/components/PhoneVerification.jsx
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { 
  RecaptchaVerifier, 
  signInWithPhoneNumber,
  updateProfile 
} from "firebase/auth";
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';

export const PhoneVerification = ({ phoneNumber, userData, onComplete }) => {
  const [verificationCode, setVerificationCode] = useState('');
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Initialize reCAPTCHA when component mounts
    initializeRecaptcha();
    
    // Cleanup on unmount
    return () => {
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        window.recaptchaVerifier = null;
      }
    };
  }, []);

  const initializeRecaptcha = () => {
    try {
      // Clear existing reCAPTCHA if any
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
      }

      // Create new reCAPTCHA verifier
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible', // Change to invisible for better UX
        callback: () => {
          console.log('reCAPTCHA solved');
        },
        'expired-callback': () => {
          setError('reCAPTCHA expired. Please try again.');
          window.recaptchaVerifier.clear();
          initializeRecaptcha();
        }
      });

      // Render the reCAPTCHA
      window.recaptchaVerifier.render();
    } catch (error) {
      console.error('Error initializing reCAPTCHA:', error);
      setError('Failed to initialize verification system. Please refresh the page.');
    }
  };

  const sendVerificationCode = async () => {
    try {
      setLoading(true);
      setError('');

      // Format phone number
      const formattedPhone = phoneNumber.startsWith('+') ? phoneNumber : `+${phoneNumber}`;

      // Send verification code
      const confirmation = await signInWithPhoneNumber(
        auth,
        formattedPhone,
        window.recaptchaVerifier
      );
      
      setConfirmationResult(confirmation);
      setLoading(false);
    } catch (error) {
      console.error('Error sending verification code:', error);
      setError(error.message || 'Failed to send verification code. Please try again.');
      setLoading(false);
      
      // Reinitialize reCAPTCHA on error
      initializeRecaptcha();
    }
  };

  const verifyCode = async () => {
    if (!verificationCode || verificationCode.length !== 6) {
      setError('Please enter a valid 6-digit code');
      return;
    }

    try {
      setLoading(true);
      setError('');

      const result = await confirmationResult.confirm(verificationCode);
      
      // Update user profile
      await updateProfile(result.user, {
        displayName: userData.name
      });

      // Save user data to Firestore
      await setDoc(doc(db, 'users', result.user.uid), {
        name: userData.name,
        email: userData.email,
        phone: phoneNumber,
        createdAt: new Date().toISOString()
      });

      onComplete(result.user);
    } catch (error) {
      console.error('Verification error:', error);
      setError('Invalid verification code. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Hidden reCAPTCHA container */}
      <div id="recaptcha-container" className="hidden"></div>
      
      {!confirmationResult ? (
        <div className="space-y-4">
          <p className="text-gray-300 text-sm text-center">
            Click below to receive a verification code on {phoneNumber}
          </p>
          <button
            onClick={sendVerificationCode}
            disabled={loading}
            className="w-full p-3 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 disabled:opacity-50 transition-all duration-300"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending...
              </span>
            ) : (
              'Send Verification Code'
            )}
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <input
            type="text"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
            placeholder="Enter 6-digit code"
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-yellow-400 focus:outline-none"
            maxLength={6}
          />
          <button
            onClick={verifyCode}
            disabled={loading || verificationCode.length !== 6}
            className="w-full p-3 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 disabled:opacity-50 transition-all duration-300"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Verifying...
              </span>
            ) : (
              'Verify Code'
            )}
          </button>
        </div>
      )}
      
      {error && (
        <p className="text-red-500 text-sm text-center">{error}</p>
      )}
    </div>
  );
};

PhoneVerification.propTypes = {
  phoneNumber: PropTypes.string.isRequired,
  userData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired
  }).isRequired,
  onComplete: PropTypes.func.isRequired
};

export default PhoneVerification;