import { useEffect, useState } from "react";

/*
  Generic debounce hook.
  Used for instant search, filters, and input-driven queries.
*/

export default function useDebounce(value, delay = 300,comparator = (a, b) => a === b) {
  if (delay === 0) return value;
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    if (comparator(value, debounced)) return;

    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay, comparator]);

  return debounced;
}
