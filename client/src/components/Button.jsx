const Button = ({ label, addStyles = "",type = "button", icon }) => {
  return (
    <button
      type={type}
      className={`bg-blue-500 text-white font-semibold py-2 px-4 rounded-full ${addStyles}`}
    >
      {icon}
      {label}
    </button>
  );
};

export default Button;
