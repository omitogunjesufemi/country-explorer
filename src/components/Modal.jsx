export default function Modal({ isOpen, closeModal, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center items-center">
      <div
        className="fixed inset-0 z-50  bg-black opacity-90"
        onClick={closeModal}
      ></div>
      <div className="relative z-60 w-full max-w-md p-6 mx-4 bg-white rounded-lg shadow-xl">
        <button
          onClick={closeModal}
          className="absolute top-3 right-3 text-gray-400 hover:text-red-600 hover:scale-110 transition-transform"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}
