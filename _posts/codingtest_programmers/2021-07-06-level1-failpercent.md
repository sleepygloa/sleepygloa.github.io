---
title: 실패율
categories: 
  - codingtest-level1
tags:
  - codingtest-level1
  
toc: true
---

[![문제](/assets/imgs/codetest/10.failpercent/1-1.question.png)](/assets/imgs/imgs/codetest/10.failpercent/1-1.question.png)
[![문제](/assets/imgs/codetest/10.failpercent/1-2.question.png)](/assets/imgs/imgs/codetest/10.failpercent/1-2.question.png)
[![문제](/assets/imgs/codetest/10.failpercent/1-3.question.png)](/assets/imgs/imgs/codetest/10.failpercent/1-3.question.png)

## 1차 시도

```java
import java.util.Collections;
import java.util.Map;
import java.util.HashMap;
import java.util.ArrayList;
import java.util.List;
import java.util.Map.Entry;
import java.util.Comparator;

class Solution {
    
    public int[] solution(int N, int[] stages) {
        int[] answer = {};
        //int[] TO List
        List<Integer> arr = new ArrayList<Integer>();
        for(int stage : stages){
            arr.add(stage);
        }
        
        //값 비교, map에 데이터 넣기.
        Map<Integer, Float> map = new HashMap<Integer, Float>();
        for(int i = 1; i <= N; i++){
            float total = 0f;
            float fail = 0f;
            for(int j = 0; j < arr.size(); j++){
                if(i < arr.get(j)) {
                    total++;
                }else{
                    total++;
                    fail++;
                    arr.remove(j);
                    j--;
                }
            }
            map.put((i), fail/total);
        }

        //정렬, 내림차순
        List<Entry<Integer, Float>> list = new ArrayList<Entry<Integer, Float>>(map.entrySet());
        list.sort(Collections.reverseOrder(Entry.comparingByValue()));
        
        //답 넣기
        answer = new int[list.size()];
        for(int i = 0; i < list.size(); i++){
            answer[i] = list.get(i).getKey();
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

- int[] 을 List 핸들링하였고, 처리결과를 새 List 에 담아 정렬 기능을 사용했다.
- 정렬에 대한 기능은 알고있지만, 내림차순에 대한 기능을 찾아서 코딩했다.

## 2차 시도 - 성공

질문의 오답에 대한 유형이 있는지 찾아보았다. 많았다.
대부분 처리는 했으나 예외처리를 안한케이스라고 판단하여 케이스를 늘려 분석해보았다.
최종스테이지나 도달하지못한 스테이지에 분모가 0, 그것으로 나눌때 처리가 안되는 느낌이다.
분기처리하여 0으로 집어넣었다.

```java

import java.util.Collections;
import java.util.Map;
import java.util.HashMap;
import java.util.ArrayList;
import java.util.List;
import java.util.Map.Entry;
import java.util.Comparator;

class Solution {
    
    public int[] solution(int N, int[] stages) {
        int[] answer = {};
        //int[] TO List
        List<Integer> arr = new ArrayList<Integer>();
        for(int stage : stages){
            arr.add(stage);
        }
        
        //값 비교, map에 데이터 넣기.
        Map<Integer, Float> map = new HashMap<Integer, Float>();
        for(int i = 1; i <= N; i++){
            float total = 0f;
            float fail = 0f;
            for(int j = 0; j < arr.size(); j++){
                if(i < arr.get(j)) {
                    total++;
                }else{
                    total++;
                    fail++;
                    arr.remove(j);
                    j--;
                }
            }
            if(total != 0){
                map.put((i), fail/total);    
            }else{
                map.put((i), 0f);
            }
        }

        //정렬, 내림차순
        List<Entry<Integer, Float>> list = new ArrayList<Entry<Integer, Float>>(map.entrySet());
        list.sort(Collections.reverseOrder(Entry.comparingByValue()));
        
        //답 넣기
        answer = new int[list.size()];
        for(int i = 0; i < list.size(); i++){
            answer[i] = list.get(i).getKey();
        }

        return answer;
    }
}
```

### 생각
- 성공했다. 테스트케이스를 만드는 것도 중요하지만, 질문에 대한 원하는바를 정확히 알고 코딩이 되어야 할 것이다. 라는 생각을 했다. 그러면 0에 대한 처리가 눈에 보였을텐데, 성공하기 바빴다.
- 다른 문제는 크게 다를 것이 없어 첨삭하지 않았다.
