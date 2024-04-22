"use client";
import { TypeAnimation } from "react-type-animation";

      
const TypeAnimationSequence = () => {
  return (
    <TypeAnimation
      sequence={[
        "Empower your Content with Innovation",
        2000,
        "Fueling Creativity and Collaboration",
        2000,
        "Unlocking Text from Images with OCR",
        2000,
        "Elevate Teamwork with Real-Time Editing",
        2000,
      ]}
      speed={200}
      style={{
        // display: "inline-block",
        // color: "#14b8a6",
        // fontSize: "16px",
        
      }}
      repeat={Infinity}
    />
  );
};

export default TypeAnimationSequence;
