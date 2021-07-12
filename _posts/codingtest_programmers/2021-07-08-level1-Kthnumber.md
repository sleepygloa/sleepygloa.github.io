---
title: K번째수
categories: 
  - codingtest-level1
tags:
  - codingtest-level1
  
toc: true
---

[![문제](/assets/imgs/codetest/10.failpercent/1-1.question.png)](/assets/imgs/imgs/codetest/10.failpercent/1-1.question.png)


## 1차 시도 - 성공

```java
import java.util.*;
class Solution {
    public int[] solution(int[] array, int[][] commands) {
        int[] answer = new int[commands.length];
        
        for(int i = 0; i < commands.length; i++){
            String str = "";
            int start = commands[i][0];
            int end = commands[i][1];
            int location = commands[i][2];
            
            int array2[] = Arrays.copyOfRange(array, start-1, end);
            Arrays.sort(array2);
            answer[i] = array2[location-1];
        }
        
        return answer;
    }
}
```

### 결과
 
[![결과](/assets/imgs/codetest/10.failpercent/2-1-1.success.png)](/assets/imgs/imgs/codetest/10.failpercent/2-1-1.success.png)

### 제출결과

[![결과](/assets/imgs/codetest/10.failpercent/2-1-2.fail.png)](/assets/imgs/imgs/codetest/10.failpercent/2-1-2.fail.png)

### 생각

- Arrays 함수를 이용한 처리로 거의다 끝났다. ```copyOfRange```, ```sort```
 
## 첨삭

```java
import java.util.Arrays;
class Solution {
    public int[] solution(int[] array, int[][] commands) {
        int[] answer = new int[commands.length];

        for(int i=0; i<commands.length; i++){
            int[] temp = Arrays.copyOfRange(array, commands[i][0]-1, commands[i][1]);
            Arrays.sort(temp);
            answer[i] = temp[commands[i][2]-1];
        }

        return answer;
    }
}
```

### 생각

- 아.. 내코드와 거의 비슷하다. 변수선언하지않고 직접 쓴내용만 달랐다.


