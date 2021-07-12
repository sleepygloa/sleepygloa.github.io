---
title: 예산
categories: 
  - codingtest-level1
tags:
  - codingtest-level1
  
toc: true
---

## 📝 문제
S사에서는 각 부서에 필요한 물품을 지원해 주기 위해 부서별로 물품을 구매하는데 필요한 금액을 조사했습니다. 그러나, 전체 예산이 정해져 있기 때문에 모든 부서의 물품을 구매해 줄 수는 없습니다. 그래서 최대한 많은 부서의 물품을 구매해 줄 수 있도록 하려고 합니다.

물품을 구매해 줄 때는 각 부서가 신청한 금액만큼을 모두 지원해 줘야 합니다. 예를 들어 1,000원을 신청한 부서에는 정확히 1,000원을 지원해야 하며, 1,000원보다 적은 금액을 지원해 줄 수는 없습니다.

부서별로 신청한 금액이 들어있는 배열 d와 예산 budget이 매개변수로 주어질 때, 최대 몇 개의 부서에 물품을 지원할 수 있는지 return 하도록 solution 함수를 완성해주세요.

- d는 부서별로 신청한 금액이 들어있는 배열이며, 길이(전체 부서의 개수)는 1 이상 100 이하입니다.
- d의 각 원소는 부서별로 신청한 금액을 나타내며, 부서별 신청 금액은 1 이상 100,000 이하의 자연수입니다.
- budget은 예산을 나타내며, 1 이상 10,000,000 이하의 자연수입니다.

## 🏆 1차 시도 - 성공

```java
import java.util.*;

class Solution {
    public int solution(int[] d, int budget) {
        int answer = 0;
        
        //배열화
        List<Integer> list = new ArrayList<>();
        for(int num : d){
            list.add(num);
        }
        //정렬
        Collections.sort(list);

        //예산측정
        int team = 0;
        for(int num : list){
            if(budget >= (team+num)){
                team += num;
                answer++;
            }else{
                break;
            }
        }
        
        return answer;
    }
}
```

### 생각

- int[] 을 List 로 담고 정렬하여 예산을 계산하였다. 
- 크게 어려운 문제는 아니었다.

## 📊 첨삭

like 가 많고, 요구사항과 코딩이 가시적으로 한번에 구분되는 코드.

```java
import java.util.*;

class Solution {
  public int solution(int[] d, int budget) {
      int answer = 0;

        Arrays.sort(d);
        for (int i = 0; i < d.length; i++) {
            budget -= d[i];
            if (budget < 0) break;
            answer++;
        }
        return answer;
  }
}
```

### 검토
- int 배열을 Arrays.sort 로 정렬 해서 코드가 간결하다. 몰랐다.