---
title: 1.jekyll 블로그 준비하기
  - jekyll
categories: 
  - jekyll
tags:
  - jekyll
toc: true
---

# 시작하기
github에서 제공하는 page 기능을 이용하여 블로그를 만들고, 검색엔진에 노출하는 기술 블로그를 만들어보자.

# 설치하기
- ```MacOS``` 기준으로 작성

## xcode 설치
Native 확장기능을 컴파일할 수 있게 해주는 명령행 도구를 설치해야 하므로, 터미널을 열어 다음 명령을 실행합니다.
```
xcode-select --install
```

## ruby 설치
homebrew를 사용하여 루비를 설치합니다.
```Jekyll``` 은 루비 > 2.4.0 버전을 필요로 합니다. 
맥OS 카탈리나 10.15 는 루비 2.6.3 이 기본 포함되어있어 설치 할 필요가 없으나, 이전 버전의 맥OS를 사용중이라면 설치해야합니다.

- Homebrew 설치 & 루비 설치

 ```
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

brew install ruby
```
- 환경설정에 추가

```
echo 'export PATH="/usr/local/opt/ruby/bin:$PATH"' >> ~/.bash_profile
```

- 설치 확인

```
which ruby
// /usr/local/opt/ruby/bin/ruby

ruby -v
ruby 4.2.0 
```

## rbenv 설치
ruby 의 버전을 관리하기 위해 설치합니다.
각 프로그램간에는 상호호환이 되는 버전을 설치해야하기 때문에 변경시, 또는 각각의 프로젝트마다 다른 버전의 루비를 실행할 때 아주 유용합니다.
- rbenv 와 ruby-build 설치
```
brew install rbenv
rbenv init
```
- 설치 확인
```
curl -fsSL https://github.com/rbenv/rbenv-installer/raw/master/bin/rbenv-doctor | bash
```

## Jekyll 설치하기
이제 본격적으로 ```Jekyll```를 설치해봅시다.
```
gem install --user-install bundler jekyll
```

## VS code 설치하기
- link : https://code.visualstudio.com/

JS 작성을 위해 가장 대중적으로 알려진 VScode를 설치하여 작성하기로 하자.

# Github
## Github 이란?
- Github 이란? : [Github 나무위키]('https://namu.wiki/w/GitHub')

대표적인 무료 저장소인 ```Github```이다. 다양한 개발자들의 자신들의 소스를 관리하는 공간이기도하고, 공유하기도 한다. Readmd.md 파일에서 해당 소스의 설명을 적기도하고, 설명, 이력서, 메모장 등으로 많이 사용하기도 한다.

자신의 소스를 올려놓으면 ```이슈트래킹```, ```보안 취약점``` 확인을 해주고, 누군가 자신의 소스를 ```fork```, ```clone``` 하여 돌려보고 버그를 찾아서 ```issue``` 를 등록해 주는등 다양한 소통이 가능하다.

이렇게 사용하다보면, ```Feed```의 개념을 알게 되는데, 개발 이력을 위해서 무자비하게 커밋푸쉬 를 날려 나 열심히하고있어요 등의 녹색으로 꽉채우려는 잔디밭관리가 되지 않게 조심하자.

## 가입하기
- link : [Github 가입하기]('https://github.com/join?ref_cta=Sign+up&ref_loc=header+logged+out&ref_page=%2F%3Cuser-name%3E&source=header')


## Repository 만들기
- link : [Repository 만들기]('https://github.com/new')

[![Repository 만들기](/assets/jekyll/images/github-new-repository.png)](/assets/jekyll/images/github-new-repository.png)

Repository name 부분에 ```username.github.io``` 형식으로 이름을 작성하고
아래에 보이는 부분은 체크없이 ```Create repository``` 버튼을 누르자.

# Jekyll Template 복사하기
이제 Jekyll 을 복사하여 나만의 블로그를 만들어보자.
가장 유명한 ```minimal-mistakes``` 을 사용하자.

우리가 만든 Repository에 Template 을 다운받아 복사하여 커밋을 하는 방식으로 진행 할 것이다.

## 다운로드
- link : https://github.com/mmistakes/minimal-mistakes

워크스페이스로 이동하여 아래 명령어를 쳐서 다운로드받자.
```
git clone https://github.com/mmistakes/minimal-mistakes
```

- 참고사이트
  - http://jekyllthemes.org/
  - http://themes.jekyllrc.org/
  - https://jekyllthemes.io/

## 로컬 실행하기(localhost:4000)
해당 폴더로 이동하여 아래 명령어를 실행해보자.
```
bundle update
bundle exec jekyll serve
```

아래와 같은 로그가 뜬다면 정상적으로 실행이 되는 것이다.
기본 ip와 port는 ```localhost:4000``` 으로 실행되게 됩니다.
[![Repository 만들기](/assets/imgs/jekyll/JekyllFirstStartLocalhost4000.png)](/assets/imgs/jekyll/JekyllFirstStartLocalhost4000.png)

## 커밋하기
아까 만든 Github 저장소도 다운로드하고, 다운로드 받은 Template을 복붙하자.
```
git clone http://github.com/username/username.github.io 
```

다운받은 템플릿 내용 내 저장소로 복사하자
복사 한 후에는 내 저장소를 push 하여 내 블로그가 제대로 띄워지는지 확인하자.
```
git add .
git commit -m "jekyll template 추가"
git push
```
깃푸쉬를 마무리하면, 몇분 후에 github pages 의 주소로 블로그개 생성되었음을 확인할 수 있다.
> 오류가 발생하지않아야, 블로그개 생성된다. 빌드가 제대로되어야 반영되는 것과 비슷하다. 또, 오류발생시 github 에 연결된 mail 로 리포팅이 날라갈 것이다.

