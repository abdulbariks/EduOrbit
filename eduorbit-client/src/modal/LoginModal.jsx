const LoginModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-xl p-6 w-96 relative">
        <h2 className="text-2xl text-center font-bold mb-4">Login</h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-3 px-3 py-2 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-3 px-3 py-2 border rounded"
        />
        <button className="w-full bg-blue-600 text-white py-2 rounded cursor-pointer hover:bg-blue-700">
          Login
        </button>
        <button
          className="absolute top-2 right-2 text-gray-500 cursor-pointer hover:text-black"
          onClick={onClose}
        >
          ✖
        </button>
      </div>
    </div>
  );
};

export default LoginModal;
