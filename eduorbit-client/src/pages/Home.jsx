import React from "react";
import Marquee from "react-fast-marquee";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Link } from "react-router";

const Home = () => {
  const features = [
    {
      title: "Easy Scheduling",
      description: "Plan your study tasks efficiently.",
    },
    { title: "Priority Tracking", description: "Never miss important topics." },
    {
      title: "Notifications",
      description: "Get reminders on upcoming deadlines.",
    },
    { title: "Analytics", description: "Track your progress over time." },
  ];

  // Get current date
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Marquee */}
      <Marquee
        gradient={false}
        speed={50}
        className="bg-blue-600 text-white py-2 font-semibold"
      >
        🚀 Welcome to EduOrbit – Organize your tasks, track progress, and stay
        motivated! 📚
      </Marquee>

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center py-20 px-4"
      >
        <h1 className="text-5xl font-bold mb-4">📚EduOrbit StudyPlanner</h1>
        <p className="text-xl text-gray-600 mb-2">
          Your ultimate companion to organize and track your study tasks.
        </p>
        <p className="text-gray-500 mb-6">
          Today is: <span className="font-semibold">{currentDate}</span>
        </p>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700"
        >
          <Link to={"/class-schedule"}>Get Started</Link>
        </motion.button>
      </motion.div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-6 pb-20">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="bg-white p-6 rounded-xl shadow hover:shadow-lg cursor-pointer hover:scale-105 transition-transform duration-300"
          >
            <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Animated Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="bg-blue-600 text-white text-center py-6"
      >
        © 2025 EduOrbit. All rights reserved.
      </motion.div>
    </div>
  );
};

export default Home;
