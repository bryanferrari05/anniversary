import { motion, useReducedMotion } from "framer-motion";

export function Heart({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M24 41S4 29 4 15a10 10 0 0 1 20-1 10 10 0 0 1 20 1c0 14-20 26-20 26Z" />
    </svg>
  );
}
export function Rose({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 190"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M53 178C42 145 67 108 51 66"
        stroke="#64735b"
        strokeWidth="2.3"
      />
      <path
        d="M50 138C19 140 19 114 18 110c20 1 33 11 32 28ZM54 111c28 0 33-24 33-24-24-3-32 13-33 24Z"
        fill="#96a184"
      />
      <path
        d="M51 71C11 65 18 35 28 32c-1-26 35-29 42-13 27 0 30 36 9 46-7 12-19 15-28 6Z"
        fill="#b8757e"
      />
      <path
        d="M51 65C30 51 32 29 49 25c18-10 37 15 15 27-20 12-35-20-10-21 17 2 7 19-2 12M28 32c6 1 16 6 19 17M71 20c-1 9-5 15-13 19M79 64c-15 2-30-3-35-11"
        stroke="#874252"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path d="m41 72 10 9 15-8" fill="#768465" />
    </svg>
  );
}
function Rabbit({ pink = false }: { pink?: boolean }) {
  return (
    <g
      stroke="#735b50"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <ellipse
        cx="0"
        cy="45"
        rx="30"
        ry="39"
        fill={pink ? "#ead8c8" : "#f4eadb"}
      />
      <ellipse
        cx="-15"
        cy="76"
        rx="15"
        ry="8"
        fill={pink ? "#ead8c8" : "#f4eadb"}
      />
      <ellipse
        cx="17"
        cy="76"
        rx="15"
        ry="8"
        fill={pink ? "#ead8c8" : "#f4eadb"}
      />
      <g className="rabbit-ears">
        <ellipse
          cx="-17"
          cy="-47"
          rx="11"
          ry="35"
          transform="rotate(-12 -17 -47)"
          fill={pink ? "#ead8c8" : "#f4eadb"}
        />
        <ellipse
          cx="9"
          cy="-49"
          rx="10"
          ry="36"
          transform="rotate(7 9 -49)"
          fill={pink ? "#ead8c8" : "#f4eadb"}
        />
        <path
          d="M-20-67q-4 20 3 36M10-71q-5 22-2 37"
          stroke="#dba8a3"
          strokeWidth="7"
        />
      </g>
      <path
        d="M-33-9C-33-44 34-43 34-9 40 23 15 30 0 29-20 29-39 18-33-9Z"
        fill={pink ? "#ead8c8" : "#f4eadb"}
      />
      <g className="rabbit-eyes" fill="#4e403a" stroke="none">
        <ellipse cx="-13" cy="-4" rx="2.7" ry="3.3" />
        <ellipse cx="13" cy="-4" rx="2.7" ry="3.3" />
      </g>
      <ellipse
        cx="-23"
        cy="7"
        rx="7"
        ry="4"
        fill="#dc9c99"
        stroke="none"
        opacity=".65"
      />
      <ellipse
        cx="24"
        cy="7"
        rx="7"
        ry="4"
        fill="#dc9c99"
        stroke="none"
        opacity=".65"
      />
      <path d="m-3 5 3 3 3-3M0 8v4m0 0q-4 4-7 0m7 0q4 4 7 0" />
      {pink ? (
        <path d="m-9 30 9 6 10-6-1 14-9-6-10 6Z" fill="#aa6575" />
      ) : (
        <path d="M-18 30q18 11 36 0l-3 9q-15 8-30 0Z" fill="#9aa385" />
      )}
      <path
        d="M-25 39q-13 21 4 22M24 39q13 21-4 22"
        fill={pink ? "#ead8c8" : "#f4eadb"}
      />
    </g>
  );
}
export function AnimalCouple({
  pose = "together",
  className = "",
}: {
  pose?: "together" | "rose" | "night" | "hug";
  className?: string;
}) {
  const reduce = useReducedMotion();
  const close = pose === "hug" || pose === "night";
  return (
    <motion.svg
      className={`animal-couple ${className}`}
      viewBox="0 0 360 245"
      role="img"
      aria-label={
        pose === "night"
          ? "I nostri due coniglietti vicini sotto le stelle"
          : "Due coniglietti innamorati"
      }
    >
      <ellipse cx="180" cy="218" rx="109" ry="9" fill="#85755f" opacity=".12" />
      <g transform={`translate(${close ? 149 : 129} 136)`}>
        <motion.g
          initial={
            reduce ? false : { x: pose === "rose" || pose === "hug" ? -65 : 0 }
          }
          whileInView={{ x: 0 }}
          transition={{ duration: 2, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Rabbit />
        </motion.g>
      </g>
      <g
        transform={`translate(${close ? 210 : 225} 136) rotate(${close ? -9 : 0})`}
      >
        <motion.g
          initial={reduce ? false : { x: pose === "hug" ? 70 : 0 }}
          whileInView={{ x: 0 }}
          transition={{ duration: 2, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <Rabbit pink />
        </motion.g>
      </g>
      {pose === "hug" && (
        <motion.g
          initial={reduce ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.8 }}
          viewport={{ once: true }}
          stroke="#735b50"
          strokeWidth="1.8"
          fill="#f4eadb"
        >
          <path d="M167 174q22 18 44 0l-3 10q-20 18-43 0" />
          <ellipse cx="207" cy="180" rx="8" ry="5" fill="#ead8c8" />
        </motion.g>
      )}
      {pose === "together" && (
        <path
          d="M152 181q25 17 50 0"
          fill="none"
          stroke="#735b50"
          strokeWidth="2"
          strokeLinecap="round"
        />
      )}
      {pose !== "night" && (
        <motion.g
          initial={reduce ? false : { opacity: 0, x: -18 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.4, duration: 1 }}
          viewport={{ once: true }}
        >
          <path
            d="M176 195q13-32 5-58"
            fill="none"
            stroke="#6d805a"
            strokeWidth="2"
          />
          <path
            d="M181 174q-18 0-16-12 12 0 16 12m1-15q16 0 16-13-15 1-16 13"
            fill="#8e9b7b"
          />
          <path
            d="M180 145c-19-4-20-20-9-23 0-12 22-12 24 0 15 4 6 22-15 23"
            fill="#9d4b60"
          />
          <path
            d="M180 139c-13-8-6-18 3-15 9 3 1 13-4 5"
            fill="none"
            stroke="#d5969e"
            strokeWidth="2"
          />
        </motion.g>
      )}
      <motion.path
        d="M180 69c-20-13-13-24-5-22l5 5 5-5c10-3 16 9-5 22"
        fill="#ae6b7b"
        initial={reduce ? false : { opacity: 0 }}
        whileInView={{ opacity: 0.8 }}
        transition={{ delay: 2 }}
        viewport={{ once: true }}
      />
    </motion.svg>
  );
}
export function PetalParticles({ burst = false }: { burst?: boolean }) {
  const reduced = useReducedMotion();
  if (reduced) return null;
  return (
    <div className={`petals ${burst ? "petals-burst" : ""}`} aria-hidden="true">
      {Array.from({ length: burst ? 14 : 9 }, (_, i) => (
        <span
          key={i}
          style={{
            left: `${7 + ((i * 23) % 88)}%`,
            animationDelay: `${burst ? i * 0.12 : -i * 2.7}s`,
            animationDuration: `${burst ? 5 + (i % 3) : 14 + (i % 5)}s`,
            opacity: 0.22 + (i % 3) * 0.1,
          }}
        />
      ))}
    </div>
  );
}
