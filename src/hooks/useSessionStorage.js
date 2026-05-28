import { useState } from "react";

export function useSessionStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const items = window.sessionStorage.getItem(key);
      return items ? JSON.parse(items) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  function setValue(value) {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.sessionStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  }

  return [storedValue, setValue];
}
