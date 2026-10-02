/** Avenzio Seven brand mark (shield + bolt). */
export default function Mark({ white = false, className = 'amark' }) {
  const main = white ? '#FFFFFF' : '#3D0B37';
  return (
    <svg className={className} viewBox="0 0 32 32" aria-hidden="true">
      <path
        d="M16 3.5c1.2 0 2.2.7 2.7 1.7l9.4 20c.8 1.6-.4 3.3-2.1 3.3h-2.6c-.9 0-1.7-.5-2.1-1.4L16 12.6l-5.3 14.5c-.4.9-1.2 1.4-2.1 1.4H6c-1.7 0-2.9-1.7-2.1-3.3l9.4-20c.5-1 1.5-1.7 2.7-1.7z"
        fill={main}
        stroke={main}
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path
        d="M10.2 14.2h13.6c.9 0 1.5 1 1.1 1.8l-6 11.6c-.3.6-.9.9-1.5.9h-2.2c-.8 0-1.3-.8-.9-1.5l4.6-9h-8.7c-.9 0-1.6-.7-1.6-1.6v-.6c0-.9.7-1.6 1.6-1.6z"
        fill="#FFD000"
        stroke="#FFD000"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}
