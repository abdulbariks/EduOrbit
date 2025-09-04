import React, { useState } from "react";
import Lottie from "lottie-react";
import { TypeAnimation } from "react-type-animation";
import animation from "../animations/STUDENT.json";
import LoginModal from "../modal/LoginModal";
import SignupModal from "../modal/SignupModal";
const Main = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  return (
    <div className="bg-amber-600 min-h-screen flex flex-col">
      {/* Top Heading + Line */}
      <div className="fixed top-10 w-full">
        <div className="flex items-center">
          <h1 className="ml-10 text-4xl font-bold">EduOrbit</h1>
          <div className="flex-grow border-t-2 border-gray-400"></div>
        </div>
      </div>

      {/* Center Section */}
      <div className="flex-grow pt-16 pb-16 flex justify-center items-center">
        <div className="w-11/12 mx-auto bg-white rounded-2xl grid grid-cols-1 md:grid-cols-2">
          {/* Lottie Animation */}
          <div className="flex justify-center my-10 w-1/2 mx-auto">
            <Lottie animationData={animation} loop autoplay />
          </div>

          {/* Right Section */}
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="flex flex-col items-center gap-6">
              <h3 className="mt-10 text-2xl font-bold">
                Makes Your Student Life Easier
              </h3>
              <TypeAnimation
                sequence={[
                  "🚀 Launch your day with focus, like a rocket leaving Earth’s gravity.",
                  1000,
                  "🌌 Stay consistent, because even stars shine brightest through steady burning",
                  1000,
                  "🪐 End your day by orbiting back to gratitude, keeping your universe balanced",
                  1000,
                ]}
                wrapper="span"
                speed={1}
                style={{
                  fontSize: "1em",
                  font: "bold",
                  display: "inline-block",
                }}
                repeat={Infinity}
              />
            </div>

            {/* Login & Signup Buttons */}
            <div className="flex flex-col justify-center items-center gap-6 mt-10">
              {/* Login Section */}
              <div className="flex flex-col items-center gap-5">
                <p className="text-lg">Already have an account?</p>
                <button
                  onClick={() => setIsLoginOpen(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition cursor-pointer"
                >
                  Login Now
                </button>
              </div>

              {/* Signup Section */}
              <div className="flex flex-col items-center gap-5">
                <p className="text-lg">Don’t have an account?</p>
                <button
                  onClick={() => setIsSignupOpen(true)}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition cursor-pointer"
                >
                  Signup Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Heading + Line */}
      <div className="fixed bottom-10 w-full">
        <div className="flex items-center">
          <div className="flex-grow border-t-2 border-gray-400"></div>
          <h1 className="mr-10 text-4xl font-bold">EduOrbit</h1>
        </div>
      </div>

      {/* Modals */}
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      <SignupModal
        isOpen={isSignupOpen}
        onClose={() => setIsSignupOpen(false)}
      />
    </div>
  );
};

export default Main;
