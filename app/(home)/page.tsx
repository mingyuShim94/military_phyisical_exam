"use client";

import Head from "next/head";
import styles from "../../styles/home2.module.css";
import { useState } from "react";

export default function Home() {
  const [height, setHeight] = useState<number | undefined>(undefined);
  const [weightRange, setWeightRange] = useState("");
  const calculateWeightRange = () => {
    console.log(height);
    const heightInMeters = height / 100; // 키를 미터 단위로 변환
    let ranges = [];

    // 등급별 BMI 범위에 따른 몸무게 계산
    const grades = [
      { grade: "1급", bmi: [20.0, 24.9] },
      { grade: "2급", bmi: [18.5, 19.9, 25.0, 29.9] },
      { grade: "3급", bmi: [15.0, 18.4, 30.0, 39.9] },
      { grade: "4급", bmi: [0, 14.9, 40.0, Infinity] },
    ];

    grades.forEach(({ grade, bmi }) => {
      const weightMin = bmi[0] * heightInMeters * heightInMeters;
      const weightMax = bmi[1] * heightInMeters * heightInMeters;
      const weightMin2 =
        bmi.length > 2 ? bmi[2] * heightInMeters * heightInMeters : null;
      const weightMax2 =
        bmi.length > 2 ? bmi[3] * heightInMeters * heightInMeters : null;

      // let rangeText = `${grade}: ${weightMin.toFixed(
      //   1
      // )}kg ~ ${weightMax.toFixed(1)}kg`;
      // if (weightMin2 && weightMax2) {
      //   rangeText += ` 또는 ${weightMin2.toFixed(1)}kg ~ ${weightMax2.toFixed(
      //     1
      //   )}kg`;
      // }
      // ranges.push(rangeText);
      if (grade == "1급")
        ranges.push(
          `1급: ${weightMin.toFixed(1)}kg ~ ${weightMax.toFixed(1)}kg`
        );
      if (grade == "2급")
        ranges.push(
          `2급: ${weightMin.toFixed(1)}kg ~ ${weightMax.toFixed(
            1
          )}kg 또는 ${weightMin2.toFixed(1)}kg ~ ${weightMax2.toFixed(1)}kg`
        );
      if (grade == "3급")
        ranges.push(
          `3급: ${weightMin.toFixed(1)}kg ~ ${weightMax.toFixed(
            1
          )}kg 또는 ${weightMin2.toFixed(1)}kg ~ ${weightMax2.toFixed(1)}kg`
        );
      if (grade == "4급")
        ranges.push(
          `4급: ${weightMax.toFixed(1)}kg 미만 또는 ${weightMin2.toFixed(
            1
          )}kg 이상`
        );
    });

    setWeightRange(ranges.join("\n"));
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>병역 신체 검사 등급 확인</title>
        <meta
          name="description"
          content="대한민국 병무청 기준에 따른 병역 신체 등급을 알려드립니다."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>간편 병역 신체 검사</h1>
          <p className={styles.subtitle}>
            대한민국 병무청 기준에 따른
            <br /> 병역 신체 등급을 알려드립니다.
          </p>
        </div>

        <div className={styles.inputContainer}>
          <input
            type="number"
            placeholder="키를 입력하세요 (cm)"
            className={styles.input}
            onChange={(e) => setHeight(parseFloat(e.target.value))}
          />
          <button className={styles.button} onClick={calculateWeightRange}>
            지금 바로 확인하기
          </button>
          <div className={styles.result}>
            {weightRange.split("\n").map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
