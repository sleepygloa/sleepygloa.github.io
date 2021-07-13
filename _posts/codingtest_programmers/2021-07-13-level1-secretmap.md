---
title: 카카오_비밀지도
categories: 
  - codingtest-level1
tags:
  - codingtest-level1
  
toc: true
---

## 📝 문제
네오는 평소 프로도가 비상금을 숨겨놓는 장소를 알려줄 비밀지도를 손에 넣었다. 그런데 이 비밀지도는 숫자로 암호화되어 있어 위치를 확인하기 위해서는 암호를 해독해야 한다. 다행히 지도 암호를 해독할 방법을 적어놓은 메모도 함께 발견했다.

- 지도는 한 변의 길이가 n인 정사각형 배열 형태로, 각 칸은 "공백"(" ") 또는 "벽"("#") 두 종류로 이루어져 있다.
- 전체 지도는 두 장의 지도를 겹쳐서 얻을 수 있다. 각각 "지도 1"과 "지도 2"라고 하자. 지도 1 또는 지도 2 중 어느 하나라도 벽인 부분은 전체 지도에서도 벽이다. 지도 1과 지도 2에서 모두 공백인 부분은 전체 지도에서도 공백이다.
- "지도 1"과 "지도 2"는 각각 정수 배열로 암호화되어 있다.
- 암호화된 배열은 지도의 각 가로줄에서 벽 부분을 1, 공백 부분을 0으로 부호화했을 때 얻어지는 이진수에 해당하는 값의 배열이다.

입력형식
입력으로 지도의 한 변 크기 n 과 2개의 정수 배열 arr1, arr2가 들어온다.

- 1 ≦ n ≦ 16
- arr1, arr2는 길이 n인 정수 배열로 주어진다.
- 정수 배열의 각 원소 x를 이진수로 변환했을 때의 길이는 n 이하이다. 즉, 0 ≦ x ≦ 2n - 1을 만족한다.

출력형식
- 원래의 비밀지도를 해독하여 '#', 공백으로 구성된 문자열 배열로 출력하라.




입출력 예시

|매개변수|값|
|---|---|
|n|5|
|arr1|[9, 20, 28, 18, 11]|
|arr2|[30, 1, 21, 17, 28]|
|출력|["#####","# # #", "### #", "# ##", "#####"]|

|매개변수|값|
|---|---|
|n|6|
|arr1|[46, 33, 33 ,22, 31, 50]|
|arr2|[27 ,56, 19, 14, 14, 10]|
|출력|["######", "### #", "## ##", " #### ", " #####", "### # "]|

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

- 이 부분은 검토 결과 ```result[i] = String.format("%" + n + "s", result[i]);``` 3배 느리게 만드는 결과를 만들었다는 걸 알았다.