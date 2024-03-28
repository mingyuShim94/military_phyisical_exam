"use client";

import { useEffect, useState } from "react";
import styles from "../../styles/home.module.css";
import { IMAGE_PATHS } from "./constant";

export default function Home() {
  const [weight, setWeight] = useState<number | undefined>(undefined);
  const [height, setHeight] = useState<number | undefined>(undefined);
  const [bmi, setBmi] = useState<number | null>(null);
  const [grade, setGrade] = useState<number | null>(null); // 급수 상태 관리
  const [showImage, setShowImage] = useState<boolean>(false); // 이미지 표시 여부 상태 관리
  const [imageNumber, setImageNumber] = useState<number>(1); // 랜덤 이미지 번호 상태 추가
  const [imgSrc, setImgSrc] = useState<string>("/assets/grade1"); // 이미지 소스 상태 추가
  // 초기 상태 설정 및 랜덤 이미지 번호 설정
  useEffect(() => resetTest(), []);

  // imgSrc 변경 시 랜덤 이미지 번호 업데이트
  useEffect(() => updateRandomImageNumber(), [showImage]);

  function updateRandomImageNumber() {
    const randLength = getRandLength();
    console.log(randLength);

    setImageNumber(Math.floor(Math.random() * randLength) + 1);
  }
  function getRandLength() {
    switch (imgSrc) {
      case "/assets/grade1":
        return 9;
      case "/assets/grade4":
      case "/assets/grade5":
        return 2;
      case "/assets/grade6":
        return 3;
      case "/assets/grade4_1":
        return 4;
      case "/assets/grade4_2":
        return 5;
      default:
        return 1; // Default case
    }
  }

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
        return "재검"; // 해당 없음
    }
  };

  // BMI 계산 및 급수 판별 함수
  const calculateBMI = () => {
    let tempGrade: number | null = null;
    let tempBMI: number | null = null;
    let tempImgSrc: string | null = null;
    // 키를 기준으로 한 급수 판정
    if (height >= 204.0) {
      tempGrade = 4;
      tempImgSrc = IMAGE_PATHS["GRADE4"];
      setValue(tempGrade, tempImgSrc);
      return; // 함수 종료
    } else if (height >= 146.0 && height < 159.0) {
      tempGrade = 4;
      tempImgSrc = IMAGE_PATHS["GRADE4"];
      setValue(tempGrade, tempImgSrc);
      return;
    } else if (height >= 140.1 && height < 146.0) {
      tempGrade = 5;

      tempImgSrc = IMAGE_PATHS["GRADE5"];
      setValue(tempGrade, tempImgSrc);
      return;
    } else if (height <= 140.0) {
      tempGrade = 6;

      tempImgSrc = IMAGE_PATHS["GRADE6"];
      setValue(tempGrade, tempImgSrc);
      return;
    } else {
      // BMI 계산
      if (weight && height) {
        const bmiValue = weight / ((height / 100) * (height / 100)); // cm를 m로 변환 후 BMI 계산
        const bmiParse2 = parseFloat(bmiValue.toFixed(2));

        // BMI를 기준으로 한 급수 판별(소수 둘째자리에 버림)

        if (bmiParse2 >= 20 && bmiParse2 <= 24.9) {
          tempGrade = 1;
          tempImgSrc = IMAGE_PATHS["GRADE1"];
        } else if (
          (bmiParse2 >= 18.5 && bmiParse2 <= 19.9) ||
          (bmiParse2 >= 25 && bmiParse2 <= 29.9)
        ) {
          tempGrade = 2;
          tempImgSrc = IMAGE_PATHS["GRADE1"];
        } else if (
          (bmiParse2 >= 15 && bmiParse2 <= 18.4) ||
          (bmiParse2 >= 30 && bmiParse2 <= 39.9)
        ) {
          tempGrade = 3;
          tempImgSrc = IMAGE_PATHS["GRADE1"];
        } else if (bmiParse2 < 15 || bmiParse2 >= 40) {
          tempGrade = 4;
          if (bmiParse2 < 15) {
            //멸공
            tempImgSrc = IMAGE_PATHS["GRADE4_1"];
          } else {
            //돼공
            tempImgSrc = IMAGE_PATHS["GRADE4_2"];
          }
        } else {
          tempGrade = 7;
        }
      }
    }

    setValue(tempGrade, tempImgSrc);
  };

  function setValue(grade: number, imgSrc: string) {
    setShowImage(true); // 계산하기 버튼 클릭 시 이미지 표시
    setGrade(grade);
    setImgSrc(imgSrc);
  }

  // 모든 상태를 초기화하는 함수
  const resetTest = () => {
    setWeight(undefined);
    setHeight(undefined);
    setBmi(null);
    setGrade(null);
    setShowImage(false);
    // setImageNumber(1);
    setImgSrc("/assets/grade1");
  };

  return (
    <div className={styles.home}>
      {showImage && (
        // 이미지 컴포넌트 또는 img 태그
        <img
          src={`${imgSrc}/${imageNumber}.webp`}
          alt="결과 이미지"
          style={{ maxWidth: "100%", height: "auto" }}
        />
      )}

      {!grade && (
        <>
          <h1>간편 병역 신체검사</h1>
          <input
            type="number"
            value={height ?? ""} // `null`이면 빈 문자열을 사용
            onChange={(e) => setHeight(parseFloat(e.target.value))}
            placeholder="키(cm)"
          />
          <input
            type="number"
            value={weight ?? ""} // `null`이면 빈 문자열을 사용
            onChange={(e) => setWeight(parseFloat(e.target.value))}
            placeholder="몸무게(kg)"
          />
          <button onClick={calculateBMI}>계산하기</button>
        </>
      )}

      {/* {bmi && <p>당신의 BMI는 {bmi} 입니다.</p>} */}
      {grade && (
        <>
          <p className={styles.gradeText}>{grade}급</p>
          <p>{getGradeDescription(grade)}</p>
          <button onClick={resetTest}>다시 검사하기</button>
        </>
      )}
    </div>
  );
}
