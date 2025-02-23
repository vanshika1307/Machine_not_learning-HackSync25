import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { collection, query, orderBy, getDocs, addDoc, serverTimestamp, updateDoc, doc, where, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/config';
import { Sparkles, Clock, Heart, MessageCircle, Search, X, Share2 } from 'lucide-react';

// Modal Component for Full Blog Post
const BlogModal = ({ post, onClose }) => {
  if (!post) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-gray-900 rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
          onClick={e => e.stopPropagation()}
        >
          {/* Modal Header */}
          <div className="sticky top-0 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 p-4 flex justify-between items-center">
            <h2 className="text-xl font-bold text-white">{post.title}</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-800 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-gray-400" />
            </button>
          </div>

          {/* Modal Content */}
          <div className="p-6">
            {post.imageUrl && (
              <div className="aspect-video w-full overflow-hidden rounded-lg mb-6">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Author Info */}
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                <span className="text-white font-bold">
                  {post.author?.[0]?.toUpperCase() || 'A'}
                </span>
              </div>
              <div>
                <p className="text-white font-medium">{post.author}</p>
                <p className="text-sm text-gray-400">
                  {post.createdAt?.toDate().toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* Content */}
            <div className="prose prose-invert max-w-none">
              <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                {post.content}
              </p>
            </div>

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-gray-800 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-2 text-gray-400 hover:text-red-500 transition-colors">
                  <Heart className={`w-5 h-5 ${post.isLiked ? 'fill-current text-red-500' : ''}`} />
                  <span>{post.likes || 0}</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-400 hover:text-yellow-400 transition-colors">
                  <MessageCircle className="w-5 h-5" />
                  <span>{post.comments?.length || 0}</span>
                </button>
              </div>
              <button className="flex items-center space-x-2 text-gray-400 hover:text-blue-400 transition-colors">
                <Share2 className="w-5 h-5" />
                <span>Share</span>
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: '', content: '', image: null });
  const [loading, setLoading] = useState(true);
  const [user] = useAuthState(auth);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [sortBy, setSortBy] = useState('newest');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const maxPreviewLength = 150;
  // Cloudinary credentials
  const CLOUDINARY_UPLOAD_PRESET = 'KahaniAI';
  const CLOUDINARY_CLOUD_NAME = 'dqsixqhky';

  useEffect(() => {
    if (user) {
      fetchPosts();
    } else {
      fetchPostsWithoutUser();
    }
  }, [sortBy, user]);

  useEffect(() => {
    const filtered = posts.filter(post => 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPosts(filtered);
  }, [searchQuery, posts]);

  const fetchPostsWithoutUser = async () => {
    try {
      let q;
      if (sortBy === 'newest') {
        q = query(collection(db, 'blog_posts'), orderBy('createdAt', 'desc'));
      } else {
        q = query(collection(db, 'blog_posts'), orderBy('likes', 'desc'));
      }
      
      const querySnapshot = await getDocs(q);
      const fetchedPosts = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        isLiked: false
      }));
      setPosts(fetchedPosts);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setLoading(false);
    }
  };

  const fetchPosts = async () => {
    try {
      let q;
      if (sortBy === 'newest') {
        q = query(collection(db, 'blog_posts'), orderBy('createdAt', 'desc'));
      } else {
        q = query(collection(db, 'blog_posts'), orderBy('likes', 'desc'));
      }
      
      const querySnapshot = await getDocs(q);
      const fetchedPosts = await Promise.all(querySnapshot.docs.map(async doc => {
        const postData = doc.data();
        let isLiked = false;
        
        if (user) {
          const likesQuery = query(
            collection(db, 'blog_posts', doc.id, 'likes'),
            where('userId', '==', user.uid)
          );
          const likeSnapshot = await getDocs(likesQuery);
          isLiked = !likeSnapshot.empty;
        }

        return {
          id: doc.id,
          ...postData,
          isLiked,
          likes: postData.likes || 0
        };
      }));
      
      setPosts(fetchedPosts);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setLoading(false);
    }
  };

  const handleLike = async (postId) => {
    if (!user) {
      alert('Please login to like posts');
      return;
    }

    try {
      const postRef = doc(db, 'blog_posts', postId);
      const post = posts.find(p => p.id === postId);
      const likesCollectionRef = collection(postRef, 'likes');
      
      if (post.isLiked) {
        // Unlike the post
        const likeQuery = query(likesCollectionRef, where('userId', '==', user.uid));
        const likeSnapshot = await getDocs(likeQuery);
        
        if (!likeSnapshot.empty) {
          await deleteDoc(likeSnapshot.docs[0].ref);
        }
        
        await updateDoc(postRef, {
          likes: Math.max((post.likes || 0) - 1, 0) // Ensure likes don't go below 0
        });

        setPosts(posts.map(p => 
          p.id === postId 
            ? { ...p, likes: Math.max((p.likes || 0) - 1, 0), isLiked: false }
            : p
        ));
      } else {
        // Like the post
        await addDoc(likesCollectionRef, {
          userId: user.uid,
          createdAt: serverTimestamp()
        });

        await updateDoc(postRef, {
          likes: (post.likes || 0) + 1
        });

        setPosts(posts.map(p => 
          p.id === postId 
            ? { ...p, likes: (p.likes || 0) + 1, isLiked: true }
            : p
        ));
      }
    } catch (error) {
      console.error('Error updating like:', error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewPost({ ...newPost, image: file });
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData
        }
      );
      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    try {
      setLoading(true);
      let imageUrl = '';

      if (newPost.image) {
        imageUrl = await uploadImageToCloudinary(newPost.image);
      }

      await addDoc(collection(db, 'blog_posts'), {
        title: newPost.title,
        content: newPost.content,
        imageUrl,
        author: user.displayName || user.email,
        authorId: user.uid,
        createdAt: serverTimestamp(),
        likes: 0,
        comments: []
      });

      setNewPost({ title: '', content: '', image: null });
      setPreviewUrl(null);
      fetchPosts();
    } catch (error) {
      console.error('Error creating post:', error);
    } finally {
      setLoading(false);
    }
  };
  const truncateContent = (content) => {
    if (content.length <= maxPreviewLength) return content;
    return content.substring(0, maxPreviewLength) + '...';
  };

  return (
    <div className="min-h-screen bg-[#0a0b1d] py-20 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
          Stories that <span className="text-yellow-400">Inspire</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Share your creative journey, inspire others, and be part of our growing storytelling community.
        </p>
      </motion.div>

{/* Search and Sort Controls */}
<div className="max-w-7xl mx-auto mb-8 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search stories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
        >
          <option value="newest">Newest First</option>
          <option value="mostLiked">Most Liked</option>
        </select>
      </div>


      {/* Create Post Section (Only for logged-in users) */}
      {user && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="max-w-2xl mx-auto mb-16 bg-gray-900/50 p-6 rounded-xl border border-gray-800"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="text"
                value={newPost.title}
                onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                placeholder="Your story title..."
                className="w-full bg-gray-800 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                required
              />
            </div>
            <div>
              <textarea
                value={newPost.content}
                onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                placeholder="Share your story..."
                className="w-full bg-gray-800 text-white rounded-lg px-4 py-3 h-32 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                required
              />
            </div>
            <div className="space-y-4">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                className="block w-full text-center py-3 px-4 rounded-lg border-2 border-dashed border-gray-600 hover:border-yellow-400 cursor-pointer transition duration-300"
              >
                <Sparkles className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                <span className="text-gray-400">Add an image to your story</span>
              </label>
              {previewUrl && (
                <div className="relative">
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setPreviewUrl(null);
                      setNewPost({ ...newPost, image: null });
                    }}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                  >
                    ×
                  </button>
                </div>
              )}
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-900 to-blue-700 text-white py-3 rounded-lg hover:from-blue-800 hover:to-blue-600 transition duration-300"
            >
              {loading ? 'Publishing...' : 'Share Your Story'}
            </button>
          </form>
        </motion.div>
      )}

      {/* Posts Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {(searchQuery ? filteredPosts : posts).map((post) => (
          <motion.article
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-900/30 rounded-xl overflow-hidden border border-gray-800 hover:border-yellow-400/50 transition duration-300"
          >
            {post.imageUrl && (
              <div 
                className="aspect-video w-full overflow-hidden cursor-pointer"
                onClick={() => setSelectedPost(post)}
              >
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-full object-cover transition duration-300 hover:scale-105"
                />
              </div>
            )}
            <div className="p-6">
              <h2 
                className="text-xl font-bold text-white mb-3 cursor-pointer hover:text-yellow-400 transition-colors"
                onClick={() => setSelectedPost(post)}
              >
                {post.title}
              </h2>
              <div className="text-gray-400 mb-4">
                <p>{truncateContent(post.content)}</p>
                {post.content.length > maxPreviewLength && (
                  <button
                    onClick={() => setSelectedPost(post)}
                    className="text-yellow-400 hover:text-yellow-300 mt-2 font-medium transition-colors"
                  >
                    Read More
                  </button>
                )}
              </div>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>
                    {post.createdAt?.toDate().toLocaleDateString() || 'Just now'}
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  <button 
                    onClick={() => handleLike(post.id)}
                    className={`flex items-center space-x-1 ${
                      post.isLiked ? 'text-red-500' : 'text-gray-400'
                    } hover:text-red-500 transition-colors duration-200`}
                  >
                    <Heart className={`w-4 h-4 ${post.isLiked ? 'fill-current' : ''}`} />
                    <span>{post.likes || 0}</span>
                  </button>
                  <button className="flex items-center space-x-1 text-gray-400 hover:text-yellow-400">
                    <MessageCircle className="w-4 h-4" />
                    <span>{post.comments?.length || 0}</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      {/* Blog Post Modal */}
      {selectedPost && (
        <BlogModal
          post={selectedPost}
          onClose={() => setSelectedPost(null)}
        />
      )}
    </div>
  );
};

export default Blog;