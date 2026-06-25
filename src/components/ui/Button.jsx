export default function Button({ children, className }) {
  return (
    <button
      className={`px-3 py-2 rounded-lg bg-primary text-md cursor-pointer transition ease-in-out duration-300 ${className}`}
      type="submit">
      {children}
    </button>
  );
}
