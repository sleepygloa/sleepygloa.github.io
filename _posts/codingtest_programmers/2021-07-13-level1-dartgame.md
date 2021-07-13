---
title: 카카오_다트게임
categories: 
  - codingtest-level1
tags:
  - codingtest-level1
  
toc: true
---

## 📝 문제
카카오톡 게임별의 하반기 신규 서비스로 다트 게임을 출시하기로 했다. 다트 게임은 다트판에 다트를 세 차례 던져 그 점수의 합계로 실력을 겨루는 게임으로, 모두가 간단히 즐길 수 있다.
갓 입사한 무지는 코딩 실력을 인정받아 게임의 핵심 부분인 점수 계산 로직을 맡게 되었다. 다트 게임의 점수 계산 로직은 아래와 같다.

- 다트 게임은 총 3번의 기회로 구성된다.
- 각 기회마다 얻을 수 있는 점수는 0점에서 10점까지이다.
- 점수와 함께 Single(S), Double(D), Triple(T) 영역이 존재하고 각 영역 당첨 시 점수에서 1제곱, 2제곱, 3제곱 (점수1 , 점수2 , 점수3 )으로 계산된다.
- 옵션으로 스타상(*) , 아차상(#)이 존재하며 스타상(*) 당첨 시 해당 점수와 바로 전에 얻은 점수를 각 2배로 만든다. 아차상(#) 당첨 시 해당 점수는 마이너스된다.
- 스타상(*)은 첫 번째 기회에서도 나올 수 있다. 이 경우 첫 번째 스타상(*)의 점수만 2배가 된다. (예제 4번 참고)
- 스타상(*)의 효과는 다른 스타상(*)의 효과와 중첩될 수 있다. 이 경우 중첩된 스타상(*) 점수는 4배가 된다. (예제 4번 참고)
- 스타상(*)의 효과는 아차상(#)의 효과와 중첩될 수 있다. 이 경우 중첩된 아차상(#)의 점수는 -2배가 된다. (예제 5번 참고)
- Single(S), Double(D), Triple(T)은 점수마다 하나씩 존재한다.
- 스타상(*), 아차상(#)은 점수마다 둘 중 하나만 존재할 수 있으며, 존재하지 않을 수도 있다.
- 0~10의 정수와 문자 S, D, T, *, #로 구성된 문자열이 입력될 시 총점수를 반환하는 함수를 작성하라.

입력형식
"점수|보너스|[옵션]"으로 이루어진 문자열 3세트.
예) 1S2D*3T

- 점수는 0에서 10 사이의 정수이다.
- 보너스는 S, D, T 중 하나이다.
- 옵선은 *이나 # 중 하나이며, 없을 수도 있다.


출력형식
- 3번의 기회에서 얻은 점수 합계에 해당하는 정수값을 출력한다. 예) 37


입출력 예시

|예제|dartResult|answer|설명|
|---|---|---|---|
|1|1S2D*3T|37|1^1 * 2 + 2^2 * 2 + 3^3|
|2|1D2S#10S|9|1^2 + 2^1 * (-1) + 10^1|
|3|1D2S0T|3|1^2 + 2^1 + 0^3|
|4|1S*2T*3S|23|1^1 * 2 * 2 + 2^3 * 2 + 3^1|
|5|1D#2S*3S|5|1^2 * (-1) * 2 + 2^1 * 2 + 3^1|
|6|1T2D3D#|-4|1^3 + 2^2 + 3^2 * (-1)|
|7|1D2S3T*|59|1^2 + 2^1 * 2 + 3^3 * 2|


## 🏆 1차 시도 - 성공

```java
import java.util.*;

class Solution {
    public String[] solution(int n, int[] arr1, int[] arr2) {
        String[] answer = new String[n];
        
        //변수선언
        String[] arr11 = new String[n];
        String[] arr21 = new String[n];
        
        //10진법 TO 2진법
        for(int i = 0; i < n; i++){
            //첫번째 배열            
            String str = Integer.toBinaryString(arr1[i]);
            while(n != str.length()) {
                str = "0" + str;
            }
            arr11[i] = str;
            
            //두번째 배열
            str = Integer.toBinaryString(arr2[i]);
            while(n != str.length()) {
                str = "0" + str;
            }
            arr21[i] = str;
            
            //판단
            String[] strarr1 = arr11[i].split("");
            String[] strarr2 = arr21[i].split("");
            answer[i] = "";
            for(int j = 0; j < n; j++){
                if(strarr1[j].equals("1") || strarr2[j].equals("1")){
                    answer[i] += "#";
                }else{
                    answer[i] += " ";
                }
            }
        }
        return answer;
    }
}
```

### 생각

- 카카오에 가까워졌다. 0.00001
- 저번에 Integer 에 진법 전환하는 함수를 보고 사용했다.
- 나름 어떻게 처리하는지 명시적으로 보여준거 같다.
<!-- 
## 📊 첨삭

like 가 많고, 요구사항과 코딩이 가시적으로 한번에 구분되는 코드.

```java
class Solution {
  public String[] solution(int n, int[] arr1, int[] arr2) {
        String[] result = new String[n];
        for (int i = 0; i < n; i++) {
            result[i] = Integer.toBinaryString(arr1[i] | arr2[i]);
            result[i] = String.format("%" + n + "s", result[i]);
            result[i] = result[i].replaceAll("1", "#");
            result[i] = result[i].replaceAll("0", " ");
        }

        return result;
    }
}
```

### 검토
- ```result[i] = Integer.toBinaryString(arr1[i] | arr2[i]);```, ```result[i] = String.format("%" + n + "s", result[i]);``` 가 이해가 안된다.
- 너무 간단하게 끝나버렸다.
- 속도는 내 코드가 더 빠르다(풀이에 피드백이있음)

만약 내가 저 코드를 알았다면. 아래처럼 코드를 짜지 않았을 까 싶다.

```java
import java.util.*;

class Solution {
    public String[] solution(int n, int[] arr1, int[] arr2) {
        String[] answer = new String[n];
        
        //변수선언
        String[] arr = new String[n];
        
        //10진법 TO 2진법
        for(int i = 0; i < n; i++){
            arr[i] = Integer.toBinaryString(arr1[i] | arr2[i]);
            while(n != arr[i].length()) {
                arr[i] = "0" + arr[i];
            }
            
            //판단
            answer[i] = arr[i].replaceAll("1", "#");
            answer[i] = answer[i].replaceAll("0", " ");
        }
        return answer;
    }
}
```

- 이 부분은 검토 결과 ```result[i] = String.format("%" + n + "s", result[i]);``` 3배 느리게 만드는 결과를 만들었다는 걸 알았다. -->