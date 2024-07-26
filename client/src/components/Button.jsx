const Button = ({
  type = "button",
  label,
  icon,
  title,
  onClick,
  width = "fit-content",
  color = "bg-[var(--color-accent)]",
  textColor = "text-[var(--color-background)]",
}) => {
  return (
    <button
      type={type}
      className={`font-semibold py-2 px-4 rounded-full hover:scale-105 shadow-md ${color} ${textColor} ${width}`}
      onClick={onClick}
      title={title}
    >
      {icon}
      {label}
    </button>
  );
};

export default Button;
