"use client";

import { useState } from "react";
import styles from "../../styles/home.module.css";

export default function Home() {
  const [weight, setWeight] = useState<number | null>(null);
  const [height, setHeight] = useState<number | null>(null);
  const [bmi, setBmi] = useState<number | null>(null);
  const [grade, setGrade] = useState<number | null>(null); // 급수 상태 관리

  // 급수에 따른 추가 설명을 반환하는 함수
  const getGradeDescription = (grade) => {
    switch (grade) {
      case 1:
        return "현역병 입영대상";
      case 2:
        return "현역병 입영대상";
      case 3:
        return "현역병 입영대상";
      case 4:
        return "보충역";
      case 5:
        return "전시근로역";
      case 6:
        return "병역면제";
      default:
        return ""; // 해당 없음
    }
  };

  // BMI 계산 및 급수 판별 함수
  const calculateBMI = () => {
    // 키를 기준으로 한 급수 판정
    if (height >= 204.0) {
      setGrade(4);
      setBmi(null); // BMI 계산을 무시
      return; // 함수 종료
    } else if (height >= 146.0 && height < 159.0) {
      setGrade(4);
      setBmi(null);
      return;
    } else if (height >= 140.1 && height < 146.0) {
      setGrade(5);
      setBmi(null);
      return;
    } else if (height <= 140.0) {
      setGrade(6);
      setBmi(null);
      return;
    }

    // BMI 계산
    if (weight && height) {
      const bmiValue = weight / ((height / 100) * (height / 100)); // cm를 m로 변환 후 BMI 계산
      const bmiParse2 = parseFloat(bmiValue.toFixed(2));
      setBmi(bmiParse2); // 계산된 BMI를 소수점 두 자리까지 설정

      // BMI를 기준으로 한 급수 판별(소수 둘째자리에 버림)
      const bmiRounded = Math.floor(bmiValue);
      if (bmiRounded >= 20 && bmiRounded <= 24.9) {
        setGrade(1);
      } else if (
        (bmiRounded >= 18.5 && bmiRounded <= 19.9) ||
        (bmiRounded >= 25 && bmiRounded <= 29.9)
      ) {
        setGrade(2);
      } else if (
        (bmiRounded >= 15 && bmiRounded <= 18.4) ||
        (bmiRounded >= 30 && bmiRounded <= 39.9)
      ) {
        setGrade(3);
      } else if (bmiRounded < 15 || bmiRounded >= 40) {
        setGrade(4);
      } else {
        setGrade(null); // 예외 상황 처리
      }
    }
  };

  return (
    <div className={styles.home}>
      <h1>간편 병역 신체검사</h1>

      <input
        type="number"
        value={height}
        onChange={(e) => setHeight(parseFloat(e.target.value))}
        placeholder="키(cm)"
      />
      <input
        type="number"
        value={weight}
        onChange={(e) => setWeight(parseFloat(e.target.value))}
        placeholder="몸무게(kg)"
      />
      <button onClick={calculateBMI}>계산하기</button>
      {bmi && <p>당신의 BMI는 {bmi} 입니다.</p>}
      {grade && (
        <>
          <p className={styles.gradeText}>{grade}급</p>
          <p>{getGradeDescription(grade)}</p>
        </>
      )}
    </div>
  );
}
