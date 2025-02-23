import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

// Feature Card Component with hover animation
const FeatureCard = ({ title, description, image }) => (
  <motion.div 
    className="bg-[#161730] p-6 rounded-lg border border-gray-700 flex flex-col items-center text-center"
    whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(255,255,255,0.1)" }}
    transition={{ duration: 0.3 }}
  >
    <h4 className="text-white text-xl mb-3 font-semibold">{title}</h4>
    <p className="text-gray-300 leading-relaxed mb-4">{description}</p>
    <div className="w-full h-48 overflow-hidden rounded-lg">
      <img src={image} alt={title} className="w-full h-full object-cover" />
    </div>
  </motion.div>
);

// Lore Card Component with gradient overlay
const LoreCard = ({ image, title, description, tags }) => (
  <motion.div 
    className="relative rounded-lg overflow-hidden min-w-[300px] flex-shrink-0 h-64"
    whileHover={{ scale: 1.02 }}
    transition={{ duration: 0.2 }}
  >
    <img src={image} alt={title} className="w-full h-full object-cover" />
    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/70 to-black/90" />
    <div className="absolute bottom-0 left-0 right-0 p-4">
      <h4 className="text-white font-semibold mb-1">{title}</h4>
      <p className="text-gray-300 text-sm mb-2">{description}</p>
      <div className="flex gap-2">
        {tags.map((tag, index) => (
          <span key={index} className="text-xs text-gray-400">#{tag}</span>
        ))}
      </div>
    </div>
  </motion.div>
);

// Review Card Component
const ReviewCard = ({ author, role, content, rating }) => (
  <motion.div 
    className="bg-[#161730] p-6 rounded-lg border border-gray-700"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
  >
    <div className="flex items-center mb-4">
      <div className="flex-1">
        <h4 className="text-white font-semibold">{author}</h4>
        <p className="text-gray-400 text-sm">{role}</p>
      </div>
      <div className="flex text-yellow-400">
        {[...Array(rating)].map((_, i) => (
          <span key={i}>★</span>
        ))}
      </div>
    </div>
    <p className="text-gray-300">{content}</p>
  </motion.div>
);

// Pricing Card Component
const PricingCard = ({ title, price, features, isPopular, period }) => (
  <motion.div 
    className={`bg-[#161730] p-8 rounded-lg border ${isPopular ? 'border-yellow-400' : 'border-gray-700'} relative`}
    whileHover={{ scale: 1.05 }}
    transition={{ duration: 0.3 }}
  >
    {isPopular && (
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-black px-4 py-1 rounded-full text-sm font-semibold">
        Most Popular
      </div>
    )}
    <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
    <div className="mb-6">
      <span className="text-4xl font-bold text-white">${price}</span>
      <span className="text-gray-400">/{period}</span>
    </div>
    <ul className="space-y-3 mb-8">
      {features.map((feature, index) => (
        <li key={index} className="text-gray-300 flex items-center">
          <span className="text-green-400 mr-2">✓</span>
          {feature}
        </li>
      ))}
    </ul>
    <button 
      onClick={() => window.location.href = '/login'}
      className={`w-full py-3 rounded-lg font-semibold transition-colors
        ${isPopular 
          ? 'bg-yellow-400 text-black hover:bg-yellow-500' 
          : 'bg-gray-700 text-white hover:bg-gray-600'}`}
    >
      Get Started
    </button>
  </motion.div>
);

const WritingAssistantContent = () => {
    const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
    const [scrollX, setScrollX] = useState(0);
  
    const features = [
      { title: "Customizable Workspace", description: "Customize colors and fonts with accessibility features.", image: "https://img.freepik.com/premium-vector/vibrant-workspace-featuring-computer-charts-documents-office-supplies-online-documentation-online-document-customizable-isometric-illustration_538213-148602.jpg" },
      { title: "Stay Organized", description: "Organize stories into shelves for quick access.", image: "https://www.trios.com/uploads/2021/10/How-to-Stay-Organized-in-Online-Classes-3.jpg" },
      { title: "AI Generation Presets", description: "Choose AI presets that fit your needs.", image: "https://appleteacher.apple.com/aws/mopac/public/250032751020/content/7f4b9442-3a0f-465e-81c2-efaab1842029/243a39ed-3664-4d98-ba68-586caeddef32.PNG" },
      { title: "AI Memory", description: "Save details so AI remembers important elements.", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOONKEtScAm_PKbCBbncJ6Y7b0GoHSVr_KCg&s" }
    ];
  
    const loreCards = [
      { image: "https://cdn.prod.website-files.com/6600e1eab90de089c2d9c9cd/662c0927dc614ac9adfac1f6_661a4a55b670e337e03eac96_Monster%25205.webp", title: "The Assassin", description: "Blonde hair, broad shoulders, cold and calculating demeanor...", tags: ["assassin", "contractor"] },
      { image: "https://as1.ftcdn.net/jpg/05/43/16/84/1000_F_543168438_GbIlWCil7YDtAUsTr4UNcpTXQ9FKdyLA.jpg", title: "Jurassic", description: "A dimly lit Dino in disarray. The Wings are partially torn, with blood splattered across the Arms...", tags: ["Huge", "Dinosaur", "ai"] },
      { image: "https://img.freepik.com/premium-photo/ai-generated-concept-human_776674-65169.jpg", title: "Wonder Girl", description: "Blond Sweeping fast Wonder girl who never misser her shot on her enemies.", tags: ["Smart", "Super", "Blonde", "Girl"] },
      { image: "https://thumbs.dreamstime.com/b/illuminated-futuristic-autonomous-car-science-fiction-scene-selective-focus-ai-generated-vehicle-concept-267955611.jpg", title: "Futuristic Car", description: "This hyperactive, optimistic, yet ditsy biological car relies heavily on her pilot to navigate.", tags: ["car", "pecaid", "ai", "navigation"] }

    ];

  const reviews = [
    { author: "Sarah Johnson", role: "Professional Writer", content: "This AI writing assistant has transformed my workflow. The customization options are incredible!", rating: 5 },
    { author: "Mark Thompson", role: "Content Creator", content: "The AI memory feature is a game-changer. It remembers context perfectly.", rating: 5 },
    { author: "Lisa Chen", role: "Novelist", content: "Finally, an AI that understands creative writing. Worth every penny.", rating: 4 },
  ];

  const pricingPlans = [
    {
      title: "Free",
      price: "0",
      period: "month",
      features: [
        "Basic AI assistance",
        "2 projects",
        "Standard templates",
        "Community support"
      ]
    },
    {
      title: "Pro",
      price: "29",
      period: "month",
      isPopular: true,
      features: [
        "Advanced AI features",
        "Unlimited projects",
        "Custom templates",
        "Priority support",
        "AI memory system"
      ]
    },
    {
      title: "Enterprise",
      price: "299",
      period: "year",
      features: [
        "Everything in Pro",
        "Team collaboration",
        "API access",
        "Custom integrations",
        "Dedicated support"
      ]
    }
  ];

  // Auto-scroll for lore cards
  useEffect(() => {
    const interval = setInterval(() => {
      setScrollX((prev) => (prev <= -300 * 6 ? 0 : prev - 2));
    }, 15);
    return () => clearInterval(interval);
  }, []);

  // Auto-rotate reviews
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentReviewIndex((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [reviews.length]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center">
      <h2 className="text-4xl font-bold text-yellow-400 mb-16">AI Writing Assistant</h2>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 gap-6 mb-24 max-w-6xl mx-auto px-4">
        {features.map((feature, index) => (
          <FeatureCard key={index} {...feature} />
        ))}
      </div>
      <br></br><br></br><br></br>

      {/* Video Section */}
      <div className="mb-24">
        <h2 className="text-3xl md:text-4xl text-white font-semibold mb-12 max-w-3xl mx-auto">
          A text editor built to let AI write <span className="text-yellow-400">with</span> you, not <span className="text-yellow-400">for</span> you.
        </h2>
        <div style={{ perspective: "2000px" }} className="max-w-4xl mx-auto">
          <div style={{ transform: "rotate3d(1, 0, 0, 30deg)" }}>
            <video autoPlay playsInline loop muted className="w-full rounded-lg border border-gray-700">
              <source src="/start.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>

      {/* Lorebook Section */}
      <div className="mb-24 ">
      <div style={{ transform: "rotate3d(1, 0, 0, 30deg)"}} className="text-center space-y-4">
  <h2 className="text-4xl md:text-5xl font-serif bg-gradient-to-b from-[#FFD700] via-[#DAA520] to-[#8B6508] bg-clip-text text-transparent">
    You already know your world,
  </h2>
  <p className="text-4xl md:text-5xl font-serif bg-gradient-to-b from-[#FFD700] via-[#DAA520] to-[#8B6508] bg-clip-text text-transparent">
    make sure the AI knows it too.
  </p>
</div>

            <br></br>
        <div className="relative w-full overflow-hidden">
          <motion.div
            className="flex gap-6"
            style={{ transform: `translateX(${scrollX}px)` }}
          >
            {[...Array(2)].flatMap((_, i) => loreCards.map((card, index) => (
              <LoreCard
                key={`${i}-${index}`}
                image={card.image}
                title={card.title}
                description={card.description}
                tags={card.tags}
              />
            )))}
          </motion.div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mb-24">
        <h2 className="text-3xl md:text-4xl text-white font-semibold mb-12">What Our Users Say</h2>
        <div className="max-w-2xl mx-auto px-4">
          <motion.div 
            key={currentReviewIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <ReviewCard {...reviews[currentReviewIndex]} />
          </motion.div>
          <div className="flex justify-center mt-6 gap-2">
            {reviews.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentReviewIndex ? 'bg-yellow-400' : 'bg-gray-600'
                }`}
                onClick={() => setCurrentReviewIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="mb-24">
        <h2 className="text-3xl md:text-4xl text-white font-semibold mb-12">Choose Your Plan</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
          {pricingPlans.map((plan, index) => (
            <PricingCard key={index} {...plan} />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default WritingAssistantContent;