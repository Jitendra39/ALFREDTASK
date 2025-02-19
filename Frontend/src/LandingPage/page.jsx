import React from "react";
import { motion } from "framer-motion";
import Navbar from "../Components/Navbar";
import { SignInButton } from "@clerk/clerk-react";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <Navbar/>
      {/* Hero Section */}
      <main className="container mx-auto px-4 flex flex-col items-center justify-center text-center pt-20">
        <motion.h2
          className="text-white text-4xl md:text-6xl font-extrabold mb-4"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Unlock Your Memory, Unlock Your Potential!
        </motion.h2>
        <motion.p
          className="text-white text-lg md:text-2xl mb-8 max-w-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Discover a revolutionary way to study with interactive flashcards
          that adapt to your unique learning style. Transform your learning
          journey and reach new heights.
        </motion.p>
        <SignInButton>
        <motion.button
      
          className="bg-white text-blue-600 px-8 py-3 rounded-full font-bold shadow-lg hover:bg-gray-100 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Get Started
        </motion.button>
        </SignInButton>
      </main>

    
      <section id="features" className="container mx-auto px-4 py-20">
        <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">
          Features
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            className="bg-white text-black p-6 rounded-lg shadow-lg"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h4 className="text-xl font-bold mb-2">Interactive Flashcards</h4>
            <p className="text-gray-700">
              Engage with flashcards that make studying dynamic and fun.
            </p>
        
          </motion.div>
          <motion.div
            className="bg-white text-black p-6 rounded-lg shadow-lg"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="text-xl font-bold mb-2">Personalized Learning</h4>
            <p className="text-gray-700">
              Tailor your study sessions with adaptive learning algorithms.
            </p>
            <span className="text-sm text-gray-500">Available soon</span>
          </motion.div>
          <motion.div
            className="bg-white p-6 rounded-lg text-black shadow-lg"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h4 className="text-xl font-bold mb-2">Progress Tracking</h4>
            <p className="text-gray-700">
              Monitor your improvement with detailed performance analytics.
            </p>
            <span className="text-sm text-gray-500">Available soon</span>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="container mx-auto px-4 py-20">
        <div className="text-center">
          <h3 className="text-3xl font-bold text-gray-800 mb-6">Get in Touch</h3>
          <p className="text-gray-700 mb-8">
            Have questions or need support? We're here to help!
          </p>
          <motion.a
            href="mailto:jeetendrachoudhari213@gmail.com"
            className="bg-blue-600 text-black px-8 py-3 rounded-full font-bold shadow-lg hover:bg-blue-700 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Contact Us
          </motion.a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} FlashLearn. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;








 