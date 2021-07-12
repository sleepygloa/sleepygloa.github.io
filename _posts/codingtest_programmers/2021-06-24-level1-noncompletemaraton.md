---
title: 완주하지 못한 선수
categories: 
  - codingtest-level1
tags:
  - codingtest-level1
  
toc: true
---

어이없다 1레벨
난 이것도 못하는 것인가

[![문제](/assets/imgs/codetest/1.noncompletemarathon/1.noncompletemarathon.png)](/assets/imgs/imgs/codetest/1.noncompletemarathon/1.noncompletemarathon.png)


## 1차 시도

```java
class Solution {
    public String solution(String[] participant, String[] completion) {
        String answer = "";
        
        //변수 설정
        int cnt = 1;
        int comfirm = 0;

        //이름이 같은 사람 수, 완수한 사람에 포함된 이름수 를 비교.
        for(int i = 0; i < participant.length; i++){
            cnt = 1; comfirm = 0;
            
            for(int j = i; j < participant.length; j++){
                if(i == j) continue; //나 자신일 경우 패스
                
                if(participant[i].equals(participant[j])) cnt++; //명단에 나랑 같은 이름이 있다면 수 증가.
            }
            for(int z = 0; z < completion.length; z++){
                if(participant[i].equals(completion[z])) comfirm++; //내 이름이 완주자 수에 있다면 수 증가
            }
            
            //동명2인이 없다는 뜻.
            if(cnt == 1 && comfirm == 0){
                answer = participant[i];
                break;
            }

            //동명2인이 있다. // 
            if(cnt > 1 && comfirm < cnt){
                answer = participant[i];
                break;
            }
        }
        
        
        return answer;
    }
}

```

### 결과
 
[![결과](/assets/imgs/codetest/1.noncompletemarathon/2-1-1.success.png)](/assets/imgs/imgs/codetest/1.noncompletemarathon/2-1-1.success.png)

### 효율성테스트

[![결과](/assets/imgs/codetest/1.noncompletemarathon/2-1-2.fail.png)](/assets/imgs/imgs/codetest/1.noncompletemarathon/2-1-2.fail.png)

### 생각

- 맨날 기본적으로하는 for문, 2중 for문, 답은찾는데 효율성이 좋지 않은가보다.




## 2차 시도

- 참석자, 완주자의 배열을 정렬 (바로 다음 동명2인 발견 가능성 증가, 타인일경우 loop 중지 기대) 추가
- 참석자 및 동명2인의 수와 완주자명단 이름 비교

```java
import java.util.Arrays;

class Solution {
    public String solution(String[] participant, String[] completion) {
        String answer = "";
        
        
        //변수 설정
        int cnt = 1;
        int comfirm = 0;
        Arrays.sort(participant);
        Arrays.sort(completion);
        

        //이름이 같은 사람 수, 완수한 사람에 포함된 이름수 를 비교.
        for(int i = 0; i < participant.length; i++){
            cnt = 1; comfirm = 0;
            
            for(int j = i; j < participant.length; j++){
                if(i == j) continue; //나 자신일 경우 패스
                
                if(participant[i].equals(participant[j])) {
                    cnt++; //명단에 나랑 같은 이름이 있다면 수 증가.
                }else{
                    continue; //다른이름이 나올경우 바로 다음 사람 확인
                }
            }
            for(int z = 0; z < completion.length; z++){
                if(participant[i].equals(completion[z])) {
                    comfirm++; //내 이름이 완주자 수에 있다면 수 증가
                }else{
                    continue; //다른이름이 나올경우 바로 다음 사람 확인
                }
            }

            if(comfirm < cnt){
                answer = participant[i];
                break;
            }
        }

        
        return answer;
    }
}

```

### 결과
 
[![결과](/assets/imgs/codetest/1.noncompletemarathon/2-2-1.success.png)](/assets/imgs/imgs/codetest/1.noncompletemarathon/2-2-1.success.png)

### 효율성테스트

[![결과](/assets/imgs/codetest/1.noncompletemarathon/2-2-2.fail.png)](/assets/imgs/imgs/codetest/1.noncompletemarathon/2-2-2.fail.png)

### 생각

- 배열의 수가 적어서 그런가?
- sort 를 추가하여 대상찾기를 더 빠르게하면 속도나 효율성이 올라갈 줄 알았는데, 더느리고, 효율성이 떨어졌다.





## 3차 시도

- 참석자, 완주자를 정렬 한 상태에서, loop 를 한번만 돌고, 동일한 순번에 값이 다르면 바로 출력
- 마지막 순번은 돌지않고, 바로 미완주자 처리.

```java

import java.util.Arrays;

class Solution {
    public String solution(String[] participant, String[] completion) {
        String answer = "";
        
        Arrays.sort(participant);
        Arrays.sort(completion);
        
        //이름이 같은 사람 수, 완수한 사람에 포함된 이름수 를 비교.
        for(int i = 0; i < participant.length; i++){
            if(participant.length - i == 1) {
                answer = participant[i];
                break;
            };
            
            if(
                completion[i] != null
             && (participant[i].indexOf(completion[i])) == -1
            ){
                answer = participant[i];
                break;
            }
        }
        
        return answer;
    }
}
```

### 결과
 
[![결과](/assets/imgs/codetest/1.noncompletemarathon/2-3-1.success.png)](/assets/imgs/imgs/codetest/1.noncompletemarathon/2-3-1.success.png)

### 효율성테스트

[![결과](/assets/imgs/codetest/1.noncompletemarathon/2-3-2.fail.png)](/assets/imgs/imgs/codetest/1.noncompletemarathon/2-3-2.fail.png)

### 생각

- 좀 더 생각해보니, 2중 포문을 돌 필요없는 문제였다. 이름순으로 잘 정렬이 되어있다면, 동일한 순번에 동일한 이름이 있어야하는데, 없다면 그것을 출력하면 될 것 같았다.
- 동명2인..을 체크하면 좋았지만, 사실 훼이크같다.
- 사실 내 결과는 통과했지만, 1차시도와 비교하면 효율성을 통과한점을 빼고는 성능이 10배 느려졌다. 효율성을 버리고 성능을 쫓기도 문제고, 효율성 따지려다 성능 느려진것도 문제다. 하여간 문제다


## 첨삭

like 가 가장많은 다른 사람의 코드

```java
import java.util.HashMap;

class Solution {
    public String solution(String[] participant, String[] completion) {
        String answer = "";
        HashMap<String, Integer> hm = new HashMap<>();
        for (String player : participant) hm.put(player, hm.getOrDefault(player, 0) + 1);
        for (String player : completion) hm.put(player, hm.get(player) - 1);

        for (String key : hm.keySet()) {
            if (hm.get(key) != 0){
                answer = key;
            }
        }
        return answer;
    }
}
```

[![결과](/assets/imgs/codetest/1.noncompletemarathon/3.othersuccess.png)](/assets/imgs/imgs/codetest/1.noncompletemarathon/3.othersuccess.png)


### 검토
- getOrDefault 부분의 결과 비교를 어떻게 할지 생각이 안나서 찍어봤다.

```java
        for (String player : participant) {
            System.out.println(player+"/"+(hm.getOrDefault(player, 0) + 1));
            hm.put(player, hm.getOrDefault(player, 0) + 1);
        }
```

- 프린트 결과를 보면, 값이 있다면 1, 없다면 0, 동명2인 있다면 +1 로 수가 증가했다. 결과를 찾자면 0 이 아닌 선수를 뽑았다.
- 내 코드보다 3-4배는 빠른것 같다.
- 아마 Array.sort 하는 부분에서 값을 찾긴 쉬워도(사람의 생각으로 답을 찾는다는 사고) 성능이 느려진것 같다.
- 결국 개발 처음 입문시 닥쳤던 map, set.. 순서 정한다는 (쉬운)개념에 익숙해진 느낌이다.
