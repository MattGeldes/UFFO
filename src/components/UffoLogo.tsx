interface UffoLogoProps {
  className?: string;
  fill?: string;
}

export default function UffoLogo({ className = "", fill = "var(--c-accent)" }: UffoLogoProps) {
  return (
    <svg
      viewBox="0 0 719.9 337.1"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="UFFO studios isotipo"
    >
      <path
        fill={fill}
        d="M384.75,296.14C186.43,349.28,14.57,350.93.87,299.82c-10.22-38.14,70.52-94.86,194.56-143.28-2.88-68.79,42.07-132.82,111.35-151.38,69.28-18.56,140.22,14.41,172.12,75.42,131.63-20.09,229.91-11.33,240.13,26.81,13.7,51.11-135.97,135.62-334.28,188.75Z"
      />
    </svg>
  );
}
