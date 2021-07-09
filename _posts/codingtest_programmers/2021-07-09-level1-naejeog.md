---
title: 내적
categories: 
  - codingtest-level1
tags:
  - codingtest-level1
  
toc: true
---

[![문제](/assets/imgs/codetest/14.naejeog/1-1.question.png)](/assets/imgs/imgs/codetest/14.naejeog/1-1.question.png)


## 1차 시도 - 성공

```java
class Solution {
    public int solution(int[] a, int[] b) {
        int answer = 0;
        
        for(int i = 0; i < a.length; i++){
            answer += a[i] * b[i];
        }
        
        return answer;
    }
}
```

### 결과
 
[![결과](/assets/imgs/codetest/14.naejeog/2-1-1.success.png)](/assets/imgs/imgs/codetest/14.naejeog/2-1-1.success.png)

### 제출결과

[![결과](/assets/imgs/codetest/14.naejeog/2-1-2.fail.png)](/assets/imgs/imgs/codetest/14.naejeog/2-1-2.fail.png)

### 생각

- 내용무. 
 
## 첨삭

- 생략, 내용과동일.
