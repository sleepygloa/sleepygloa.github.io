---
title: jekyll 블로그 만들기
  - jekyll
tags:
  - jekyll
toc: true
---


# jekyll 블로그 만들기
github 에서 제공하는 page 기능을 이용하여 개발블로그를 만들고, 남과 공유할 수 있도록 검색까지 가능하게 해보자.


## 1. Ruby 설치하기
아래의 명령어를 이용하여 루비를 설치하고,
```
sudo apt install ruby ruby-dev build-essential
```

환경설정을 변경해준다.
```
echo '# Install Ruby Gems to ~/gems' >> ~/.bashrc
echo 'export GEM_HOME=$HOME/gems' >> ~/.bashrc
echo 'export PATH=$HOME/gems/bin:$PATH' >> ~/.bashrc
source ~/.bashrc
```


## 2. Jekyll 설치하기
- Github 은 Ruby 언어로 만들어 졌고, Jekyll 역시 Ruby 환경에서 구동된다.
- 젬(gem)은 분산 패키지 시스템으로 라이브러리의 작성이나 공개, 설치를 도와주는 시스템이다.

```
gem install jekyll bundler
```

## 3. Jekyll Template 이용하여 저장소 만들기
내 github 에 블로그로 이용하기위한 repository 를 만들어보자
이미 많은 사용자들이 사용하기 좋은  ```Jekyll Template```들을 만들어놨다. 
그 중에서 가장 유명한 ```minimal-mistakes``` 을 이용하여 블로그를 만들어보자.

1. 홈페이지에서 다운로드.
- minimal-mistakes : https://github.com/mmistakes/minimal-mistakes

2. 명령어를 이용한 다운로드
```
git clone https://github.com/mmistakes/minimal-mistakes
```

참고 사이트
- http://jekyllthemes.org/
- http://themes.jekyllrc.org/
- https://jekyllthemes.io/


### 실행
해당 폴더로 이동하여 아래 명령어를 실행해보자.
```
bundle exec jekyll serve
```

### 저장소 만들기
내 github 아이디를 이용하여 블로그를 만든다면, 
GitHub Pages가 https://username.github.io 주소로 블로그 주소로 사용하게 된다.

저장소를 만들었다면 내 저장소를 다운로드하고 jekyll template 을 복사하자
username 은 사용자의 아이디로 변경하고 아래 명령어를 실행하여 내 repository 를 다운받자.
```
git clone http://github.com/username/username.github.io 
```

복사하자
```
git add .
git commit -m "jekyll template 추가"
git push
```
깃푸쉬를 마무리하면, 몇분 후에 github pages 의 주소로 블로그개 생성되었음을 확인할 수 있다.
> 오류가 발생하지않아야, 블로그개 생성된다. 빌드가 제대로되어야 반영되는 것과 비슷하다. 또, 오류발생시 github 에 연결된 mail 로 리포팅이 날라갈 것이다.


# 환경설정 바꾸기
