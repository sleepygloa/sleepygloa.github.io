---
title: 체육복
categories: 
  - codingtest-level1
tags:
  - codingtest-level1
  
toc: true
---



[![문제](/assets/imgs/codetest/6.atheletecloth/1-1.question.png)](/assets/imgs/imgs/codetest/6.atheletecloth/1-1.question.png)
[![문제](/assets/imgs/codetest/6.atheletecloth/1-2.question.png)](/assets/imgs/imgs/codetest/6.atheletecloth/1-2.question.png)


## 1차 시도

```java
import java.util.ArrayList;
import java.util.List;

class Solution {
    public int solution(int n, int[] lost, int[] reserve) {
        int answer = 0;
        answer = n - lost.length;
        
        ArrayList<Integer> arr = new ArrayList<Integer>();
        for(int i = 0; i < reserve.length; i++){
            arr.add(reserve[i]);
        }
        
        for(int i = 0; i < lost.length; i++){
            for(int j = 0; j < arr.size(); j++){
                if(arr.get(j) == (lost[i]-1)){
                    arr.remove(j);
                    answer++;
                }else if(arr.get(j) == (lost[i]-+1)){
                    arr.remove(j);
                    answer++;
                }
            }
        }
        return answer;
    }
}
```

### 결과
 
[![결과](/assets/imgs/codetest/6.atheletecloth/2-1-1.success.png)](/assets/imgs/imgs/codetest/6.atheletecloth/2-1-1.success.png)

### 제출결과

[![결과](/assets/imgs/codetest/6.atheletecloth/2-1-2.fail.png)](/assets/imgs/imgs/codetest/6.atheletecloth/2-1-2.fail.png)

### 생각

- 수강을 들을 수 있는 사람 수 (```answer = n - lost.length;```) 를 확인하고, 안가져온 사람의 앞뒤번호를 체크하여 가져오되 수강인원 증가 및 배열에서 해당 인원을 빼, 빌려준 체육복은 제거, 하는 형식으로 코딩했다.

## 2차 시도

코드를 분석하고, 테스트케이스를 추가하다보니
예를 들면 4번 체육복일때, 4번체육복 여분을 빌리는 케이스가 없었다.
해당 경우를 추가했다.

```java
import java.util.ArrayList;
import java.util.List;

class Solution {
    public int solution(int n, int[] lost, int[] reserve) {
        int answer = 0;
        answer = n - lost.length;
        
        ArrayList<Integer> arr = new ArrayList<Integer>();
        for(int i = 0; i < reserve.length; i++){
            arr.add(reserve[i]);
        }
        
        for(int i = 0; i < lost.length; i++){
                System.out.println(arr.size());
            for(int j = 0; j < arr.size(); j++){
                if(lost[i] == (arr.get(j)-1)){
                    arr.remove(j);
                    answer++;
                }else if(lost[i] == (arr.get(j))){
                    arr.remove(j);
                    answer++;
                }else if(lost[i] == (arr.get(j)+1)){
                    arr.remove(j);
                    answer++;
                }
            }
        }
        return answer;
    }
}
```

### 결과
 
[![결과](/assets/imgs/codetest/6.atheletecloth/2-2-1.success.png)](/assets/imgs/imgs/codetest/6.atheletecloth/2-2-1.success.png)

### 제출결과

[![결과](/assets/imgs/codetest/6.atheletecloth/2-2-2.fail.png)](/assets/imgs/imgs/codetest/6.atheletecloth/2-2-2.fail.png)

### 생각

- 정답률이 올랐다.
- 제한사항 5번의 (여벌체육복을 가진 도난당한 학생) 의 케이스가 빠진것 같다. 문제를 끝까지 읽어야했다.

## 3차 시도 - 성공

도난당한학생이 여부의 옷을 가지고 있을때의 경우를 추가했다.
그경우는 두 배열에서 모두 값이 빠지되, 수강인원수가 증가한다.


```java
import java.util.ArrayList;
import java.util.List;

class Solution {
    public int solution(int n, int[] lost, int[] reserve) {
        int answer = 0;
        answer = n - lost.length;
        //배열저장.
        ArrayList<Integer> arr1 = new ArrayList<Integer>();
        ArrayList<Integer> arr2 = new ArrayList<Integer>();
        for(int i = 0; i < lost.length; i++){
            arr1.add(lost[i]);
        }
        for(int i = 0; i < reserve.length; i++){
            arr2.add(reserve[i]);
        }
        
        //도난당한 학생의 경우 제거
        for(int i = 0; i < arr1.size(); i++){
            boolean check = false;  
            for(int j = 0; j < arr2.size(); j++){
                if(arr1.get(i) == arr2.get(j)){
                    check = true;
                    arr2.remove(j);
                    answer++;
                    break;
                }
            }
            if(check) {
                arr1.remove(i);
                i--;
            }
        }
        
        for(int i = 0; i < arr1.size(); i++){
            for(int j = 0; j < arr2.size(); j++){
                System.out.println(arr1.get(i)+"/"+arr2.get(j));
                if(arr1.get(i) == (arr2.get(j)-1)){
                    arr2.remove(j);
                    answer++;
                    break;
                }else if(arr1.get(i) == (arr2.get(j)+1)){
                    arr2.remove(j);
                    answer++;
                    break;
                }
            }
        }
        return answer;
    }
}
```

### 결과
 
[![결과](/assets/imgs/codetest/6.atheletecloth/2-3-1.success.png)](/assets/imgs/imgs/codetest/6.atheletecloth/2-3-1.success.png)

### 제출결과

[![결과](/assets/imgs/codetest/6.atheletecloth/2-3-2.fail.png)](/assets/imgs/imgs/codetest/6.atheletecloth/2-3-2.fail.png)

### 생각

- 정답률이 올랐다.
- 제한사항 5번의 (여벌체육복을 가진 도난당한 학생) 의 케이스가 빠진것 같다. 문제를 끝까지 읽어야했다.


## 첨삭

like 가 많고, 요구사항과 코딩이 가시적으로 한번에 구분되는 코드.

```java
class Solution {
    public int solution(int n, int[] lost, int[] reserve) {
        int[] people = new int[n];
        int answer = n;

        for (int l : lost) 
            people[l-1]--;
        for (int r : reserve) 
            people[r-1]++;

        for (int i = 0; i < people.length; i++) {
            if(people[i] == -1) {
                if(i-1>=0 && people[i-1] == 1) {
                    people[i]++;
                    people[i-1]--;
                }else if(i+1< people.length && people[i+1] == 1) {
                    people[i]++;
                    people[i+1]--;
                }else 
                    answer--;
            }
        }
        return answer;
    }
}
```


### 검토
- 총인원 배열에 -1 과 1 로 상태 체크를 하고, -1 경우에만 체육복을 빌리는 행위를 하였다. 


### 생각

- 코드가 길지 않아 좋고, 개념만 안다면 훨씬 좋은 코드이다.
- 초딩처럼 코딩하는 스타일이지만, 저런식으로 생각한다면 훨 좋은 코드를 만들 수 있을 것 같다.
- 오래걸리면 할 수 는 있을 것같은데 한번에 생각안나는 코드이다.
- 내 코드를 생각해 본다면, int[], string[]의 활용을 잘 못해 ArrayList 를 선언하게 되는 경우가 종종 있는 것 같다.