---
title: 로또의 최고 순위와 최저 순위
categories: 
  - codingtest-level1
tags:
  - codingtest-level1
  
toc: true
---

오늘도 신나게 코딩테스트.
신나나

[![문제](/assets/imgs/codetest/2.lottomaxordrminordr/1-1.question.png)](/assets/imgs/imgs/codetest/2.lottomaxordrminordr/1-1.question.png)
[![문제](/assets/imgs/codetest/2.lottomaxordrminordr/1-2.question.png)](/assets/imgs/imgs/codetest/2.lottomaxordrminordr/1-2.question.png)
[![문제](/assets/imgs/codetest/2.lottomaxordrminordr/1-3.question.png)](/assets/imgs/imgs/codetest/2.lottomaxordrminordr/1-3.question.png)


## 1차 시도

```java
import java.util.HashMap;

class Solution {
    public int[] solution(int[] lottos, int[] win_nums) {
        int[] answer = new int[2];
        
        HashMap<Integer, Integer> hm = new HashMap<>();
        int zerocnt = 0;
        for(int lotto : lottos) { 
            if(lotto == 0) {
                zerocnt++;
            }else{
                hm.put(lotto, hm.getOrDefault(lotto, 0) + 1);
            }
        }
        
        int successcnt = 0;
        for (int key : hm.keySet()) {
            if (hm.get(key) != 0){
                successcnt++;
            }
        }
        
        answer[0] = (successcnt == 0 ? 1 : 7 - (successcnt == 1 ? 1 : successcnt));
        answer[1] = (zerocnt == 6 ? zerocnt : (zerocnt == 0 ? 1 : 7 - zerocnt));
        
        return answer;
    }
}
```

### 결과
 
[![결과](/assets/imgs/codetest/2.lottomaxordrminordr/2-1-1.success.png)](/assets/imgs/imgs/codetest/2.lottomaxordrminordr/2-1-1.success.png)

### 효율성테스트

[![결과](/assets/imgs/codetest/2.lottomaxordrminordr/2-1-2.fail.png)](/assets/imgs/imgs/codetest/2.lottomaxordrminordr/2-1-2.fail.png)

### 생각

- 맞는거 같긴한데 케이스에서 걸리나보다.




## 2차 시도

- Set을 봤다고 써봤는데, 안되서 2중 for문으로 다시 해봤다.

```java
class Solution {
    public int[] solution(int[] lottos, int[] win_nums) {
        int[] answer = new int[2];
        
        int zerocnt = 0;
        int successcnt = 0;
        
        for(int lotto : lottos) { 
            if(lotto == 0) {
                zerocnt++;
            }else{
                for(int win_num : win_nums){
                    if(lotto == win_num) successcnt++;
                }
            }
        }
        System.out.println(successcnt+ "/ "+ zerocnt);
        
        answer[0] = (successcnt == 0 ? 1 : 7 - (successcnt == 1 ? 1 : successcnt+zerocnt));
        answer[1] = (zerocnt == 6 ? zerocnt : (zerocnt == 0 ? 1 : 7 - zerocnt));
        
        return answer;
    }
}
```

### 결과
 
[![결과](/assets/imgs/codetest/2.lottomaxordrminordr/2-2-1.success.png)](/assets/imgs/imgs/codetest/2.lottomaxordrminordr/2-2-1.success.png)

### 효율성테스트

[![결과](/assets/imgs/codetest/2.lottomaxordrminordr/2-2-2.fail.png)](/assets/imgs/imgs/codetest/2.lottomaxordrminordr/2-2-2.fail.png)

### 생각

- 한 케이스 더 맞췄는데, 사실 코드가 별반 바뀐게 없으니, 통과못할건 뻔했다.
- 이번엔 효율성을 보는건 없이 답만 맞으면 되는건가?
- 코드를 다시 정리해봐야겟다. 답만 다맞출수 있도록.






## 3차 시도

- 아에 케이스 분석을 다시 했다. 케이스가 아에 잘 못 되어서 그 부분을 잡았더니, 결과가 좋아졌다.

```java
class Solution {
    public int[] solution(int[] lottos, int[] win_nums) {
        int[] answer = new int[2];
        
        int zerocnt = 0;
        int successcnt = 0;
        
        for(int lotto : lottos) { 
            if(lotto == 0) {
                zerocnt++;
            }else{
                for(int win_num : win_nums){
                    if(lotto == win_num) successcnt++;
                }
            }
        }
       
        //zerocnt 6 {1,6}
        //zerocnt 5 {1,6}
        //zerocnt 4 {1,6}
        //zerocnt 3 {1,6}
        //zerocnt 2 {1,6}
        //zerocnt 1 {1,6}
        //zerocnt 0 {1,6}
        
        //zerocnt 6 s 0 {1,6}
        //zerocnt 5 s 1 {1,6}
        //zerocnt 4 s 2 {1,5}
        //zerocnt 3 s 3 {1,4}
        //zerocnt 2 s 4 {1,3}
        //zerocnt 1 s 5 {1,2}
        //zerocnt 0 s 6 {1,1}
        
        //zerocnt 6 s 0 {1,6}
        //zerocnt 5 s 0 {2,6}
        //zerocnt 4 s 0 {3,6}
        //zerocnt 3 s 0 {4,6}
        //zerocnt 2 s 0 {5,6}
        //zerocnt 1 s 0 {6,6}
        //zerocnt 0 s 0 {6,6}
        
        answer[0] = (successcnt == 0 ? 1 : (7 - zerocnt - successcnt));
        answer[1] = (successcnt == 0 ? 6 : (7 - successcnt));
        
        return answer;
    }
}
```

### 결과
 
[![결과](/assets/imgs/codetest/2.lottomaxordrminordr/2-3-1.success.png)](/assets/imgs/imgs/codetest/2.lottomaxordrminordr/2-3-1.success.png)

### 효율성테스트

[![결과](/assets/imgs/codetest/2.lottomaxordrminordr/2-3-2.fail.png)](/assets/imgs/imgs/codetest/2.lottomaxordrminordr/2-3-2.fail.png)

### 생각

- 케이스에 구멍이있는 것 같지는 않은데, 답변을 구하는 방식이 잘못된거같다.
- 15케이스중 1케이스만 빵꾸가 난다는건 확률적으로 0갯수와 성공개수로 핸들링하는 방법으로는 둘다 0 이거나 둘 다 모두 성공인 경우의 케이스이다.

## 4차 시도 - 성공

- 3차 시도의 케이스를 잡았다. 둘 다 0 인케이스에서 처리를 안했더니 7로 떨어져 실패했던 경우였다. 
- ```answer[0] = (successcnt + zerocnt == 6 ? 1 : (successcnt + zerocnt == 0 ? 6 : (7 - zerocnt - successcnt)));```



```java
class Solution {
    public int[] solution(int[] lottos, int[] win_nums) {
        int[] answer = new int[2];
        
        int zerocnt = 0;
        int successcnt = 0;
        
        for(int lotto : lottos) { 
            if(lotto == 0) {
                zerocnt++;
            }else{
                for(int win_num : win_nums){
                    if(lotto == win_num) successcnt++;
                }
            }
        }
       
        //zerocnt 6 {1,6}
        //zerocnt 5 {1,6}
        //zerocnt 4 {1,6}
        //zerocnt 3 {1,6}
        //zerocnt 2 {1,6}
        //zerocnt 1 {1,6}
        //zerocnt 0 {1,6}
        
        //zerocnt 6 s 0 {1,6}
        //zerocnt 5 s 1 {1,6}
        //zerocnt 4 s 2 {1,5}
        //zerocnt 3 s 3 {1,4}
        //zerocnt 2 s 4 {1,3}
        //zerocnt 1 s 5 {1,2}
        //zerocnt 0 s 6 {1,1}
        
        //zerocnt 6 s 0 {1,6}
        //zerocnt 5 s 0 {2,6}
        //zerocnt 4 s 0 {3,6}
        //zerocnt 3 s 0 {4,6}
        //zerocnt 2 s 0 {5,6}
        //zerocnt 1 s 0 {6,6}
        //zerocnt 0 s 0 {6,6}
        
        answer[0] = (successcnt + zerocnt == 6 ? 1 : (successcnt + zerocnt == 0 ? 6 : (7 - zerocnt - successcnt)));
        answer[1] = (successcnt == 0 ? 6 : (7 - successcnt));
        
        return answer;
    }
}
```

### 결과
 
[![결과](/assets/imgs/codetest/2.lottomaxordrminordr/2-4-1.success.png)](/assets/imgs/imgs/codetest/2.lottomaxordrminordr/2-4-1.success.png)

### 효율성테스트

[![결과](/assets/imgs/codetest/2.lottomaxordrminordr/2-4-2.fail.png)](/assets/imgs/imgs/codetest/2.lottomaxordrminordr/2-4-2.fail.png)

### 생각

- 처음부터 케이스를 확실하게 정리하면 쉬웠을 케이스이다.

<!-- 
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

[![결과](/assets/imgs/codetest/2.lottomaxordrminordr/3.othersuccess.png)](/assets/imgs/imgs/codetest/2.lottomaxordrminordr/3.othersuccess.png)


### 검토
getOrDefault 부분의 결과 비교를 어떻게 할지 생각이 안나서 찍어봤다.

```java
        for (String player : participant) {
            System.out.println(player+"/"+(hm.getOrDefault(player, 0) + 1));
            hm.put(player, hm.getOrDefault(player, 0) + 1);
        }
```

[![결과](/assets/imgs/codetest/2.lottomaxordrminordr/3-1.othersuccess.png)](/assets/imgs/imgs/codetest/2.lottomaxordrminordr/3-1.othersuccess.png)

프린트 결과를 보면, 값이 있다면 1, 없다면 0, 동명2인 있다면 +1 로 수가 증가했다.
결과를 찾자면 0 이 아닌 선수를 뽑았다.

### 생각

- 내 코드보다 3-4배는 빠른것 같다.
- 아마 Array.sort 하는 부분에서 값을 찾긴 쉬워도(사람의 생각으로 답을 찾는다는 사고) 성능이 느려진것 같다.
- 결국 개발 처음 입문시 닥쳤던 map, set.. 순서 정한다는 (쉬운)개념에 익숙해진 느낌이다. -->
