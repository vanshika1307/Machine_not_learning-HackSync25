import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Volume2, VolumeX } from "lucide-react";
import PropTypes from "prop-types";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const location = useLocation();
  const audioRef = useRef(null);
  const [user] = useAuthState(auth);

  useEffect(() => {
    audioRef.current = new Audio("/music.mp3");
    audioRef.current.volume = volume;

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((error) => console.log("Playback error:", error));
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-black/50 backdrop-blur-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="text-white text-2xl font-bold">
            <Link to="/" className="hover:text-yellow-400 transition duration-300">
              Kahani.AI
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
  <NavLink to="/text-editor" isActive={location.pathname === "/text-editor"}>Text Editor</NavLink>
  <NavLink to="/blog" isActive={location.pathname === "/blog"}>Blog</NavLink>
  <NavLink to="/discord" isActive={location.pathname === "/discord"}>Discord</NavLink>
  {user ? (
    <button
      onClick={() => auth.signOut()}
      className="text-white hover:text-yellow-400 transition duration-300"
    >
      Logout
    </button>
  ) : (
    <NavLink to="/login" isActive={location.pathname === "/login"}>Login</NavLink>
  )}
            <div className="flex items-center gap-3">
              {!isPlaying && (
                <span className="text-gray-400 text-sm font-medium italic">wanna hear some music?</span>
              )}
              <div className="flex items-center gap-4">
                <button onClick={toggleMusic} className="relative group">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-gray-800 to-gray-900 flex items-center justify-center shadow-lg overflow-hidden border border-gray-700 group-hover:border-yellow-400 transition-all duration-300">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${
                        isPlaying ? "animate-[spin_6s_linear_infinite]" : ""
                      }`}
                      style={{
                        background: "radial-gradient(circle at center, #1a1a1a 40%, #2a2a2a 60%, #333 100%)",
                        boxShadow: "inset 0 0 10px rgba(0,0,0,0.5)",
                      }}
                    >
                      <div className="w-1 h-8 bg-yellow-400/80 rounded-full absolute transform rotate-45"></div>
                      <div className="w-8 h-1 bg-yellow-400/80 rounded-full absolute"></div>
                      <div className="w-3 h-3 bg-gray-900 rounded-full border-2 border-yellow-400"></div>
                    </div>
                  </div>
                </button>
                {isPlaying && (
                  <div className="flex items-center gap-2 bg-gray-800/50 rounded-full px-3 py-1.5 border border-gray-700">
                    {volume === 0 ? (
                      <VolumeX className="w-4 h-4 text-gray-400" />
                    ) : (
                      <Volume2 className="w-4 h-4 text-yellow-400" />
                    )}
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={volume}
                      onChange={(e) => setVolume(parseFloat(e.target.value))}
                      className="w-20 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-yellow-400"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ to, children, isActive }) => {
  return (
    <Link
      to={to}
      className={`text-white hover:text-yellow-400 transition duration-300 pb-1 border-b-2 ${
        isActive ? "border-yellow-400" : "border-transparent"
      }`}
    >
      {children}
    </Link>
  );
};

NavLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  isActive: PropTypes.bool.isRequired,
};

export default Header;
