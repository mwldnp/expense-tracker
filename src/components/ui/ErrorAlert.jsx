const ErrorAlert = ({ message, onClose }) => {
  return (
    <div className="flex gap-2 justify-between items-center text-center px-3 py-4 rounded-lg bg-red-200 border border-red-500 mb-3">
      <p className="text-red-800">{message}</p>
      <button
        onClick={onClose}
        className="group transition ease-in-out cursor-pointer border border-transparent hover:border-red-400 hover:bg-red-300 rounded-sm">
        <svg
          className="fill-current h-6 w-6 group-hover:text-red-700 text-red-600"
          role="button"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20">
          <path d="M14.348 5.652a1 1 0 00-1.414 0L10 8.586 7.066 5.652a1 1 0 10-1.414 1.414L8.586 10l-2.934 2.934a1 1 0 101.414 1.414L10 11.414l2.934 2.934a1 1 0 001.414-1.414L11.414 10l2.934-2.934a1 1 0 000-1.414z" />
        </svg>
      </button>
    </div>
  );
};

export default ErrorAlert;
