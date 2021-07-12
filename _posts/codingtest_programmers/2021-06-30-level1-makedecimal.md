---
title: 소수만들기
categories: 
  - codingtest-level1
tags:
  - codingtest-level1
  
toc: true
---



[![문제](/assets/imgs/codetest/4.makedecimal/1-1.question.png)](/assets/imgs/imgs/codetest/4.makedecimal/1-1.question.png)


## 1차 시도

```java
class Solution {
    public int solution(int[] nums) {
        int answer = 0;

        // [실행] 버튼을 누르면 출력 값을 볼 수 있습니다.
        System.out.println("Hello Java");
        
        int onenum = -1;
        int twonum = -1;
        int threenum = -1;
        
        for(int i = 0; i < nums.length; i++){
            int[] newnums = nums;
            onenum = nums[i];
            
            for(int j = i+1; j < nums.length; j++){
                twonum = nums[j];
                    
                for(int z = j+1; z < nums.length; z++){
                    
                    boolean flag = false;
                    threenum = nums[z];
                    
                    int sum = onenum + twonum + threenum;
                    for(int a = 2; a < sum; a++){
                        if(sum % a == 0) flag = true;
                    }
                    // System.out.println(onenum+"/"+twonum+"/"+threenum+"="+sum);
                    
                    //소수판별
                    if(!flag) answer++;
                }
            }
        }

        return answer;
    }
}
```

### 결과
 
[![결과](/assets/imgs/codetest/4.makedecimal/2-1-1.success.png)](/assets/imgs/imgs/codetest/4.makedecimal/2-1-1.success.png)

### 제출결과

[![결과](/assets/imgs/codetest/4.makedecimal/2-1-2.fail.png)](/assets/imgs/imgs/codetest/4.makedecimal/2-1-2.fail.png)

### 생각

- 소수 구하는 법을 한참 생각하다. 간단하게 코딩했다. 3중for문이 맘에 안들지만. 한번에 답이나왔다.

## 첨삭

like 가 가장많은 다른 사람의 코드

```java
import java.util.Arrays;

class Solution {



    public int solution(int[] nums) {
        int ans = 0;

        for(int i = 0; i < nums.length - 2; i ++){
            for(int j = i + 1; j < nums.length - 1; j ++){
                for(int k = j + 1; k < nums.length; k ++ ){
                    if(isPrime(nums[i] + nums[j] + nums[k])){
                        ans += 1;  
                    } 
                }
            }
        }
        return ans;
    }
    public Boolean isPrime(int num){
        int cnt = 0;
        for(int i = 1; i <= (int)Math.sqrt(num); i ++){
            if(num % i == 0) cnt += 1; 
        }
        return cnt == 1;
    }
}
```

### 검토
- for문의 길이를 미리 뺌으로 loop의 경우를 제거. 좀 더 효율적인 코드.

```java
for(int i = 1; i <= (int)Math.sqrt(num); i ++){
    if(num % i == 0) cnt += 1; 
}
```
- 소수를 구하는 또다른 방법! sqrt(n) 이하의 수만 나누면 알 수 있다. sqrt 는 루트다.
  - 자연수 n 이 합성수(1과 n 을 제외한 다른 수를 인수로 가짐)
  - p와 q가 1과 n 이 아닌 나머지 인수
  - ```p < q``` : n 이 8이라면 1, 2(p), 4(q), 8
  - 결국 p 는 sqrt(8) 보다 무조건 작고, q 는 sqrt(8) 보다 무조건 크다.

### 생각

없음.