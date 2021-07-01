---
title: 카카오-신규아이디추천
categories: 
  - codingtest-level1
tags:
  - codingtest-level1
  
toc: true
---

아. 오늘 개발환경 추가한다고 삽질하다가 못 할 뻔했다.

[![문제](/assets/imgs/codetest/5.newkakaoid/1-1.question.png)](/assets/imgs/imgs/codetest/5.newkakaoid/1-1.question.png)
[![문제](/assets/imgs/codetest/5.newkakaoid/1-2.question.png)](/assets/imgs/imgs/codetest/5.newkakaoid/1-2.question.png)
[![문제](/assets/imgs/codetest/5.newkakaoid/1-3.question.png)](/assets/imgs/imgs/codetest/5.newkakaoid/1-3.question.png)
[![문제](/assets/imgs/codetest/5.newkakaoid/1-4.question.png)](/assets/imgs/imgs/codetest/5.newkakaoid/1-4.question.png)


## 1차 시도

```java
import java.util.regex.Pattern;

class Solution {
    public String solution(String new_id) {
        String answer = "";
        
        //1
        new_id = new_id.toLowerCase();
        //2
        int twocnt = 0;
        String virtualid = "";
        while(true){
            if(twocnt == new_id.length()) break;
            
            boolean check = false;
            String str = new_id.substring(twocnt, twocnt+1);
            if(Pattern.matches("^[a-z]$", str)
              ||Pattern.matches("^[0-9]$", str)
              ||Pattern.matches("^[\\-]$", str)
              ||Pattern.matches("^[\\_]$", str)
              ||Pattern.matches("^[\\.]$", str)
              ) {
                virtualid += str;
            }
            twocnt++;
        }
        new_id = virtualid;
        //3
        while(true){
            if(new_id.indexOf("..") == -1) break; 
            new_id = new_id.replace("..", ".");
        }
        //4
        
        while(true){
            if(new_id.length() <= 1) {
                if(".".equals(new_id)) new_id = "";
                break;
            }
            
            if('.' == new_id.charAt(0)){
                new_id = new_id.substring(1, new_id.length());
            }else if('.' == new_id.charAt(new_id.length()-1)){
                new_id = new_id.substring(0, new_id.length()-1);
            }else{
                break;
            }
        }
        //5
        if(new_id.trim().equals("")) {
            new_id = "a";
        }    
        
        new_id = new_id.replaceAll(" ", "a");
        //6
        if(new_id.length() >= 15) new_id = new_id.substring(0, 15);
        if('.' == new_id.charAt(new_id.length()-1)){
            new_id = new_id.substring(0, new_id.length()-1);
        }
        //7
        while(true){
            if(new_id.length() <= 2){
                new_id += new_id.charAt(new_id.length()-1);
            }else{
                break;
            }
        }
                                
        answer = new_id;
        return answer;
    }
}
```

### 결과
 
[![결과](/assets/imgs/codetest/5.newkakaoid/2-1-1.success.png)](/assets/imgs/imgs/codetest/5.newkakaoid/2-1-1.success.png)

### 제출결과

[![결과](/assets/imgs/codetest/5.newkakaoid/2-1-2.fail.png)](/assets/imgs/imgs/codetest/5.newkakaoid/2-1-2.fail.png)

### 생각

- 순서대로 차근차근 분기처리 했더니, 까먹었던 코딩을 제외하고는, 오래걸렸지만 통과됬다.
- toLowerCase
- 정규식
- replace
- 처음, 끝 문자열 제거
- 빈문자열 찾기
- 글자수 n 이상일 때 제거 및 추가 조건
- 자리수 확인 및 문자열추가

## 첨삭

like 가 많고, 요구사항과 코딩이 가시적으로 한번에 구분되는 코드.

```java
class Solution {
    public String solution(String new_id) {

        String s = new KAKAOID(new_id)
                .replaceToLowerCase()
                .filter()
                .toSingleDot()
                .noStartEndDot()
                .noBlank()
                .noGreaterThan16()
                .noLessThan2()
                .getResult();


        return s;
    }

    private static class KAKAOID {
        private String s;

        KAKAOID(String s) {
            this.s = s;
        }

        private KAKAOID replaceToLowerCase() {
            s = s.toLowerCase();
            return this;
        }

        private KAKAOID filter() {
            s = s.replaceAll("[^a-z0-9._-]", "");
            return this;
        }

        private KAKAOID toSingleDot() {
            s = s.replaceAll("[.]{2,}", ".");
            return this;
        }

        private KAKAOID noStartEndDot() {
            s = s.replaceAll("^[.]|[.]$", "");
            return this;
        }

        private KAKAOID noBlank() {
            s = s.isEmpty() ? "a" : s;
            return this;
        }

        private KAKAOID noGreaterThan16() {
            if (s.length() >= 16) {
                s = s.substring(0, 15);
            }
            s = s.replaceAll("[.]$", "");
            return this;
        }

        private KAKAOID noLessThan2() {
            StringBuilder sBuilder = new StringBuilder(s);
            while (sBuilder.length() <= 2) {
                sBuilder.append(sBuilder.charAt(sBuilder.length() - 1));
            }
            s = sBuilder.toString();
            return this;
        }

        private String getResult() {
            return s;
        }
    }
}
```

[![결과](/assets/imgs/codetest/5.newkakaoid/3.othersuccess.png)](/assets/imgs/codetest/5.newkakaoid/3.othersuccess.png)


### 검토
- 정규식으로 모든 처리가 끝났다. 나는 자르고 붙이고 지지고볶고.
  


### 생각

- 큰일났다. 나는 너무 개무식하게 코딩하고있다는걸 다시한번 깨달았다.
- 회원가입 폼을 안한지 오래됬더니, 정규식하는걸 다 까먺었다. 첨삭 코드만 보면 시작문자열 ```^[.]```, ```[.]$``` 은 아는 거였는데, 다시한번 기억하게 됬다.
- 회원가입 같은 형태에 대한 아이디 정규화 코드를 정리해두는 것도 자산이 될 것 같다.
