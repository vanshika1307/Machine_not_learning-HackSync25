import { useState } from "react";
import { motion } from "framer-motion";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";
import { Resend } from "resend";

const ContactUs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [user] = useAuthState(auth);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in to submit the form.");
      return;
    }

    if (!name.trim() || !email.trim() || !message.trim()) {
      setError("Please fill out all fields.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const resend = new Resend("re_9vj6MD6t_HPHe3NFZoM8Li9Q4NwVbnHjw"); // Replace with your Resend API key

      const { data, error: resendError } = await resend.emails.send({
        from: "onboarding@resend.dev", // Replace with your verified sender email
        to: "shaikhsalif50@gmail.com", // Replace with your email
        subject: "New Feedback from Kahani.AI",
        html: `
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong> ${message}</p>
        `,
      });

      if (resendError) {
        console.error("Error sending email:", resendError);
        setError(`Failed to send feedback: ${resendError.message}`);
      } else {
        console.log("Email sent successfully:", data);
        setSuccess(true);
        setName("");
        setEmail("");
        setMessage("");
      }
    } catch (error) {
      console.error("Error:", error);
      setError(`An unexpected error occurred: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0b1d] text-white">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold">Access Denied</h1>
          <p className="mt-4 text-lg">Please log in to submit feedback.</p>
        </motion.div>
      </div>
    );
  }

  return (
    
    <div className="min-h-screen bg-[#0a0b1d] text-white flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl bg-[#1a1b2e] rounded-lg shadow-2xl p-8 mt-12"
      >
        <h1 className="text-4xl font-bold text-center mb-8">Contact Us</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-lg font-medium mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 rounded-lg bg-[#2a2b3f] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-lg font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-lg bg-[#2a2b3f] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-lg font-medium mb-2">
              Message
            </label>
            <textarea
              id="message"
              placeholder="Enter your feedback or message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-3 rounded-lg bg-[#2a2b3f] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              rows="5"
              required
            />
          </div>
          {error && (
            <div className="text-red-500 text-center">
              {error}
            </div>
          )}
          {success && (
            <div className="text-green-500 text-center">
              Feedback submitted successfully!
            </div>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold py-3 rounded-lg hover:opacity-90 transition-opacity duration-300 flex items-center justify-center"
          >
            {loading ? (
              <div className="flex items-center">
                <div className="w-4 h-4 border-2 border-white border-t-2 border-t-transparent rounded-full animate-spin mr-2"></div>
                Submitting...
              </div>
            ) : (
              "Submit Feedback"
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default ContactUs;