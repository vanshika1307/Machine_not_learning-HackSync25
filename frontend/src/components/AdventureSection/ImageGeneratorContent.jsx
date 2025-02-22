import { motion } from "framer-motion";

const ImageGeneratorContent = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
    className="text-left"
  >
    <h3 className="text-2xl font-bold text-yellow-400 mb-4">
      AI Image Generation
    </h3>
    <div className="grid md:grid-cols-2 gap-6 text-gray-300">
      <div>
        <h4 className="text-white text-xl mb-2">Create Stunning Artwork</h4>
        <p>Transform your ideas into beautiful anime-style illustrations with our advanced AI image generator. Perfect for artists, creators, and dreamers.</p>
      </div>
      <div>
        <h4 className="text-white text-xl mb-2">Key Features</h4>
        <ul className="space-y-2">
          <li>• High-resolution output</li>
          <li>• Style customization</li>
          <li>• Batch processing</li>
          <li>• Advanced editing tools</li>



          <li>• High-resolution output</li>
          <li>• Style customization</li>
          <li>• Batch processing</li>
          <li>• Advanced editing tools</li><li>• High-resolution output</li>
          <li>• Style customization</li>
          <li>• Batch processing</li>
          <li>• Advanced editing tools</li><li>• High-resolution output</li>
          <li>• Style customization</li>
          <li>• Batch processing</li>
          <li>• Advanced editing tools</li><li>• High-resolution output</li>
          <li>• Style customization</li>
          <li>• Batch processing</li>
          <li>• Advanced editing tools</li>
        </ul>
      </div>
    </div>
  </motion.div>
);

export default ImageGeneratorContent;