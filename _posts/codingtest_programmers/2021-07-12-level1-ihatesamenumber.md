---
title: 같은 숫자는 싫어
categories: 
  - codingtest-level1
tags:
  - codingtest-level1
  
toc: true
---

## 📝 문제
배열 arr가 주어집니다. 배열 arr의 각 원소는 숫자 0부터 9까지로 이루어져 있습니다. 이때, 배열 arr에서 연속적으로 나타나는 숫자는 하나만 남기고 전부 제거하려고 합니다. 단, 제거된 후 남은 수들을 반환할 때는 배열 arr의 원소들의 순서를 유지해야 합니다. 예를 들면,

arr = [1, 1, 3, 3, 0, 1, 1] 이면 [1, 3, 0, 1] 을 return 합니다.
arr = [4, 4, 4, 3, 3] 이면 [4, 3] 을 return 합니다.
배열 arr에서 연속적으로 나타나는 숫자는 제거하고 남은 수들을 return 하는 solution 함수를 완성해 주세요.

- 배열 arr의 크기 : 1,000,000 이하의 자연수
- 배열 arr의 원소의 크기 : 0보다 크거나 같고 9보다 작거나 같은 정수

## 1차 시도

```java
import java.util.*;

public class Solution {
    public int[] solution(int []arr) {
        int[] answer = {};
        
        List<Integer> list = new ArrayList<>();
        for(int num : arr){
            list.add(num);
        }
        for(int i = 0; i < list.size()-1; i++){
            if(list.get(i) == list.get(i+1)){
                list.remove(i+1);
                i--;
            }
        }
        answer = new int[list.size()];
        for(int i = 0; i < list.size(); i++){
            answer[i] = list.get(i);
        }

        return answer;
    }
}
```

### 생각

- 가장 쉬운 방법으로 처리했다.
- int[] to list, 처리, list to int[] 성공은 했지만, 효율성에서 탈락했다. 더 간단히 처리할 필요가 있다.

## 🏆 2차 시도 - 성공

```java
import java.util.*;

public class Solution {
    public int[] solution(int []arr) {
        int[] answer = {};
        
        List<Integer> list = new ArrayList<>();
        for(int i = 0; i < arr.length; i++){
            if(i == 0){
                list.add(arr[i]);
            }else if(arr[i-1] != arr[i]){
                list.add(arr[i]);
            }
        }
        answer = new int[list.size()];
        for(int i = 0; i < list.size(); i++){
            answer[i] = list.get(i);
        }
        
        return answer;
    }
}
```

### 생각

- 위에 2문장의 체크와 담는 코드를 합쳤고, 뽑아냈다.
- 훨씬 간단해졌다. 

## 📊 첨삭

like 가 많고, 요구사항과 코딩이 가시적으로 한번에 구분되는 코드.

```java
import java.util.*;

public class Solution {
    public int[] solution(int []arr) {
        ArrayList<Integer> tempList = new ArrayList<Integer>();
        int preNum = 10;
        for(int num : arr) {
            if(preNum != num)
                tempList.add(num);
            preNum = num;
        }       
        int[] answer = new int[tempList.size()];
        for(int i=0; i<answer.length; i++) {
            answer[i] = tempList.get(i).intValue();
        }
        return answer;
    }
}
```

### 검토
- 크게 다른점이있다면, 나는 다를경우 for문 구문을 달리하여 i--; 하였고, 여기는 preNum 이전수를 담아 비교하였다.