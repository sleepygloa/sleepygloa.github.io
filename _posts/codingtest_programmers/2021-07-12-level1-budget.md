---
title: μμ°
categories: 
  - codingtest-level1
tags:
  - codingtest-level1
  
toc: true
---

## π λ¬Έμ 
Sμ¬μμλ κ° λΆμμ νμν λ¬Όνμ μ§μν΄ μ£ΌκΈ° μν΄ λΆμλ³λ‘ λ¬Όνμ κ΅¬λ§€νλλ° νμν κΈμ‘μ μ‘°μ¬νμ΅λλ€. κ·Έλ¬λ, μ μ²΄ μμ°μ΄ μ ν΄μ Έ μκΈ° λλ¬Έμ λͺ¨λ  λΆμμ λ¬Όνμ κ΅¬λ§€ν΄ μ€ μλ μμ΅λλ€. κ·Έλμ μ΅λν λ§μ λΆμμ λ¬Όνμ κ΅¬λ§€ν΄ μ€ μ μλλ‘ νλ €κ³  ν©λλ€.

λ¬Όνμ κ΅¬λ§€ν΄ μ€ λλ κ° λΆμκ° μ μ²­ν κΈμ‘λ§νΌμ λͺ¨λ μ§μν΄ μ€μΌ ν©λλ€. μλ₯Ό λ€μ΄ 1,000μμ μ μ²­ν λΆμμλ μ νν 1,000μμ μ§μν΄μΌ νλ©°, 1,000μλ³΄λ€ μ μ κΈμ‘μ μ§μν΄ μ€ μλ μμ΅λλ€.

λΆμλ³λ‘ μ μ²­ν κΈμ‘μ΄ λ€μ΄μλ λ°°μ΄ dμ μμ° budgetμ΄ λ§€κ°λ³μλ‘ μ£Όμ΄μ§ λ, μ΅λ λͺ κ°μ λΆμμ λ¬Όνμ μ§μν  μ μλμ§ return νλλ‘ solution ν¨μλ₯Ό μμ±ν΄μ£ΌμΈμ.

- dλ λΆμλ³λ‘ μ μ²­ν κΈμ‘μ΄ λ€μ΄μλ λ°°μ΄μ΄λ©°, κΈΈμ΄(μ μ²΄ λΆμμ κ°μ)λ 1 μ΄μ 100 μ΄νμλλ€.
- dμ κ° μμλ λΆμλ³λ‘ μ μ²­ν κΈμ‘μ λνλ΄λ©°, λΆμλ³ μ μ²­ κΈμ‘μ 1 μ΄μ 100,000 μ΄νμ μμ°μμλλ€.
- budgetμ μμ°μ λνλ΄λ©°, 1 μ΄μ 10,000,000 μ΄νμ μμ°μμλλ€.

## π 1μ°¨ μλ - μ±κ³΅

```java
import java.util.*;

class Solution {
    public int solution(int[] d, int budget) {
        int answer = 0;
        
        //λ°°μ΄ν
        List<Integer> list = new ArrayList<>();
        for(int num : d){
            list.add(num);
        }
        //μ λ ¬
        Collections.sort(list);

        //μμ°μΈ‘μ 
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

### μκ°

- int[] μ List λ‘ λ΄κ³  μ λ ¬νμ¬ μμ°μ κ³μ°νμλ€. 
- ν¬κ² μ΄λ €μ΄ λ¬Έμ λ μλμλ€.

## π μ²¨μ­

like κ° λ§κ³ , μκ΅¬μ¬ν­κ³Ό μ½λ©μ΄ κ°μμ μΌλ‘ νλ²μ κ΅¬λΆλλ μ½λ.

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

### κ²ν 
- int λ°°μ΄μ Arrays.sort λ‘ μ λ ¬ ν΄μ μ½λκ° κ°κ²°νλ€. λͺ°λλ€.