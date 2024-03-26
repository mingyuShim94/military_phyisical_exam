"use client";

import { useEffect, useState } from "react";
import styles from "../../styles/home.module.css";

export default function Home() {
  const [weight, setWeight] = useState<number | undefined>(undefined);
  const [height, setHeight] = useState<number | undefined>(undefined);
  const [bmi, setBmi] = useState<number | null>(null);
  const [grade, setGrade] = useState<number | null>(null); // 급수 상태 관리
  const [showImage, setShowImage] = useState<boolean>(false); // 이미지 표시 여부 상태 관리
  const [imageNumber, setImageNumber] = useState<number>(1); // 랜덤 이미지 번호 상태 추가
  const [imgSrc, setImgSrc] = useState<string>("/assets/grade1"); // 이미지 소스 상태 추가
  useEffect(() => {
    // 페이지 로드 시 실행될 로직
    resetTest(); // 모든 상태를 초기화하는 함수 호출
  }, []); // 빈 의존성 배열을 전달하여 컴포넌트 마운트 시 단 한 번만 실행되도록 함
  useEffect(() => {
    // imgSrc 상태가 변경될 때마다 실행될 부수 효과
    let randLength = 0;

    switch (imgSrc) {
      case "/assets/grade1":
        randLength = 9;
        break;
      case "/assets/grade4":
      case "/assets/grade5":
        randLength = 2;
        break;
      case "/assets/grade6":
        randLength = 3;
        break;
      case "/assets/grade4_1":
      case "/assets/grade4_2":
        randLength = 4;
        break;
      default:
        randLength = 1; // 기본값 설정, imgSrc가 위의 어떤 경우에도 해당하지 않을 때
    }

    const randomNumber = Math.floor(Math.random() * randLength) + 1;
    // 상태 업데이트 함수는 비동기적으로 동작하지만, 여기서는 상태의 의존성 없이 직접 값을 설정하므로 문제 없음

    setImageNumber(randomNumber); // 랜덤 이미지 번호 설정
  }, [imgSrc]); // imgSrc가 변경될 때마다 useEffect 훅 실행

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
    setShowImage(true); // 계산하기 버튼 클릭 시 이미지 표시
    // 계산하기 버튼을 클릭할 때마다 새로운 랜덤 이미지 번호를 설정

    // 키를 기준으로 한 급수 판정
    if (height >= 204.0) {
      setGrade(4);
      setBmi(null); // BMI 계산을 무시
      setImgSrc("/assets/grade4");
      return; // 함수 종료
    } else if (height >= 146.0 && height < 159.0) {
      setGrade(4);
      setBmi(null);
      setImgSrc("/assets/grade4");
      return;
    } else if (height >= 140.1 && height < 146.0) {
      setGrade(5);
      setBmi(null);
      setImgSrc("/assets/grade5");
      return;
    } else if (height <= 140.0) {
      setGrade(6);
      setBmi(null);
      setImgSrc("/assets/grade6");
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
        setImgSrc("/assets/grade1");
      } else if (
        (bmiRounded >= 18.5 && bmiRounded <= 19.9) ||
        (bmiRounded >= 25 && bmiRounded <= 29.9)
      ) {
        setGrade(2);
        setImgSrc("/assets/grade1");
      } else if (
        (bmiRounded >= 15 && bmiRounded <= 18.4) ||
        (bmiRounded >= 30 && bmiRounded <= 39.9)
      ) {
        setGrade(3);
        setImgSrc("/assets/grade1");
      } else if (bmiRounded < 15 || bmiRounded >= 40) {
        setGrade(4);
        if (bmiRounded < 15) {
          //멸공
          setImgSrc("/assets/grade4_1");
        } else {
          //돼공
          setImgSrc("/assets/grade4_2");
        }
      } else {
        setGrade(null); // 예외 상황 처리
      }
    }

    let randLength = 0;

    switch (imgSrc) {
      case "/assets/grade1":
        randLength = 9;
        break;
      case "/assets/grade4":
      case "/assets/grade5":
        randLength = 2;
        break;
      case "/assets/grade6":
        randLength = 3;
        break;
      case "/assets/grade4_1":
      case "/assets/grade4_2":
        randLength = 4;
        break;
      default:
        randLength = 1; // 기본값 설정, imgSrc가 위의 어떤 경우에도 해당하지 않을 때
    }

    const randomNumber = Math.floor(Math.random() * randLength) + 1;
  };

  // 모든 상태를 초기화하는 함수
  const resetTest = () => {
    setWeight(null);
    setHeight(null);
    setBmi(null);
    setGrade(null);
    setShowImage(false);
    setImageNumber(1);
    setImgSrc("/assets/grade1");

    console.log("showImage", showImage);
  };

  return (
    <div className={styles.home}>
      {showImage && (
        // 이미지 컴포넌트 또는 img 태그
        <img
          src={`${imgSrc}/${imageNumber}.jpg`}
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
