// import React, { useState, useEffect } from 'react';

// const TypewriterApp = ({ lines }) => {
//   const [currentLineIndex, setCurrentLineIndex] = useState(0);
//   const [currentText, setCurrentText] = useState('');
//   const [isTyping, setIsTyping] = useState(true);

//   useEffect(() => {
//     const typeNextChar = () => {
//       const line = lines[currentLineIndex];
//       const char = line[currentText.length];

//       if (char === undefined) {
//         // Finished typing the current line
//         setIsTyping(false);

//         // Wait for a moment and move to the next line
//         setTimeout(() => {
//           setCurrentText('');
//           setIsTyping(true);
//           setCurrentLineIndex((prev) => (prev + 1) % lines.length);
//         }, 1500);
//       } else {
//         // Type the next character
//         setCurrentText((prev) => prev + char);
//         setTimeout(typeNextChar, 100);
//       }
//     };

//     if (isTyping) {
//       // Start typing when component mounts
//       typeNextChar();
//     }
//   }, [currentLineIndex, currentText, isTyping, lines]);

//   return (
//     <div className="Typewriter" data-testid="typewriter-wrapper">
//       <span className="Typewriter__wrapper">{currentText}</span>
//       <span className="Typewriter__cursor">|</span>
//     </div>
//   );
// };

// export default TypewriterApp;
