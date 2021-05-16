import { useState, useEffect } from 'react';

export default function TypeWriter({ text }) {
  const [phrase, setPhrase] = useState('');

  useEffect(() => {
    let currentText = '';
    text.split('').forEach((char, index) => {
      setTimeout(() => {
        currentText = currentText.slice(0, -1);
        currentText += char;

        if (text.length != index + 1) {
          currentText += '|';
        }

        setPhrase(currentText);
      }, 200 + index * 100);
    });
  }, []);

  return <>{phrase}</>;
}
