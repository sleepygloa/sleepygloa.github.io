---
title: 포켓몬
categories: 
  - codingtest-level1
tags:
  - codingtest-level1
  
toc: true
---

[![문제](/assets/imgs/codetest/15.poketmon/1-1.question.png)](/assets/imgs/imgs/codetest/15.poketmon/1-1.question.png)

## 1차 시도

```java
import java.util.*;

class Solution {
    public int solution(int[] nums) {
        int max = nums.length / 2;
        
        //중복값 제거
        HashSet<Integer> numsSet = new HashSet<>();
        for (int num : nums) {
          numsSet.add(num);
        }

        //포켓몬을 넣을 수 있는 수와 종류수비교
        if (numsSet.size() > max) {
          return max;
        } else {
          return numsSet.size();
        }
    }
}
```

### 결과
 
[![결과](/assets/imgs/codetest/15.poketmon/2-1-1.success.png)](/assets/imgs/imgs/codetest/15.poketmon/2-1-1.success.png)

### 제출결과

[![결과](/assets/imgs/codetest/15.poketmon/2-1-2.fail.png)](/assets/imgs/imgs/codetest/15.poketmon/2-1-2.fail.png)

### 생각

- 문제의 이해가 너무 안됐다. 마지막 질문이 특히나 이해가 안되었었다. 그러나, 이해하니 쉽게 해결되는 문제 였다.
- 중복을 제거한 값과 가질 수 있는 수와 비교하는 문제, 중복제거 를 할 수 있는가 를 묻는 문제였다.

## 첨삭

like 가 많고, 요구사항과 코딩이 가시적으로 한번에 구분되는 코드.

```java
import java.util.Arrays;
import java.util.stream.Collectors;

class Solution {
    public int solution(int[] nums) {
        return Arrays.stream(nums)
                .boxed()
                .collect(Collectors.collectingAndThen(Collectors.toSet(),
                        phonekemons -> Integer.min(phonekemons.size(), nums.length / 2)));
    }
}
```

### 검토
- 배열 int 를 Arrays에 stream 하여 내용을 풀어가는 식.
- 한줄 코드


### 생각
- 어떻게 출력해볼수있는지 모르겠다.
- 나중에 이부분에 대해서 다시 찾아봐야겠다.
- 