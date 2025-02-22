import { motion } from "framer-motion";

const WritingAssistantContent = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
    className="text-left"
  >
    <h3 className="text-2xl font-bold text-yellow-400 mb-4">
      AI Writing Assistant
    </h3>
    <div className="grid md:grid-cols-2 gap-6 text-gray-300">
      <div>
        <h4 className="text-white text-xl mb-2">Unleash Your Creativity</h4>
        <p>Let our AI help you craft compelling stories, develop unique characters, and overcome writer's block with intelligent suggestions.</p>
      </div>
      <div>
        <h4 className="text-white text-xl mb-2">Key Features</h4>
        <ul className="space-y-2">
          <li>• Story development tools</li>
          <li>• Character generation</li>
          <li>• Plot assistance</li>
          <li>• Writing style adaptation</li>
        </ul>
      </div>
    </div>
  </motion.div>
);

export default WritingAssistantContent;