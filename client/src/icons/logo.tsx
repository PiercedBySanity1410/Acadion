const Logo = ({
  color = "currentColor",
  size = 50,
  ...props
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 50 43"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M25 0C15.9568 12.7642 13.416 19.8115 18.5606 31.9646L25 21.3097L31.4394 31.9646H18.5606C24.2957 40.2414 27.8272 41.9214 35.6061 42.6195L50 43L25 0Z"
      fill={color}
    />
    <path
      d="M6.43939 31.9646L0 43H12.5L18.5606 31.9646H6.43939Z"
      fill={color}
    />
  </svg>
);

export default Logo;
