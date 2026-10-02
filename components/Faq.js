/** `<details>` FAQ accordion item (matches the legacy markup). */
export default function Faq({ q, children, defaultOpen = false }) {
  return (
    <details className="afq" open={defaultOpen}>
      <summary>
        {q}
        <span className="afq-pl" aria-hidden="true">
          +
        </span>
      </summary>
      <p>{children}</p>
    </details>
  );
}
