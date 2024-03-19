"use client";

import { useState } from "react";

export default function Home() {
  // 상태 관리를 위한 Hooks 설정

  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBmi] = useState("");

  // BMI 계산 함수
  const calculateBMI = () => {
    if (weight && height) {
      const weightNum = parseFloat(weight);
      const heightNum = parseFloat(height) / 100; // cm를 m로 변환
      const bmi = weightNum / (heightNum * heightNum); // BMI 계산
      setBmi(bmi.toFixed(2)); // 계산된 BMI를 소수점 두 자리까지 설정
    }
  };
  return (
    <div>
      <h1>BMI 계산기</h1>
      <input
        type="number"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
        placeholder="몸무게(kg)"
      />
      <input
        type="number"
        value={height}
        onChange={(e) => setHeight(e.target.value)}
        placeholder="키(cm)"
      />
      <button onClick={calculateBMI}>계산하기</button>
      {bmi && <p>당신의 BMI는 {bmi} 입니다.</p>}
    </div>
  );
}
