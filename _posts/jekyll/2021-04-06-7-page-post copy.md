---
title: 8. (번외) 사이드 메뉴 만들기
  - jekyll
categories: 
  - jekyll
tags:
  - jekyll
toc: true
---

되게 다양하게 카테고리를 이용하여 메뉴를 만들지만.
나만의 메뉴를 만들어보았습니다.

# 1. 카테고리를 이용한 사이드 메뉴 만들기

- ```_layouts/categories.html``` : 카테고리 리스트 코드 부분 복사
- ```_include/sidebar.html``` : 카테고리 리스트 생성할 영역
- ```_sass/minimal-mistakes/_page.scss``` : css 변경

```_include/sidebar.html``` 의 파일은 왼쪽의 메뉴부분이 작성되어있는 ```html``` 문서입니다.
이부분을 수정하여 카테고리를 추가해보도록 하겠습니다.

```
{% if page.author_profile or layout.author_profile or page.sidebar %}
  <div class="sidebar sticky">
  {% if page.author_profile or layout.author_profile %}{% include author-profile.html %}{% endif %}
  {% if page.sidebar %}
    {% for s in page.sidebar %}
      {% if s.image %}
        <img src="{{ s.image | relative_url }}"
             alt="{% if s.image_alt %}{{ s.image_alt }}{% endif %}">
      {% endif %}
      {% if s.title %}<h3>{{ s.title }}</h3>{% endif %}
      {% if s.text %}{{ s.text | markdownify }}{% endif %}
      {% if s.nav %}{% include nav_list nav=s.nav %}{% endif %}
    {% endfor %}
    {% if page.sidebar.nav %}
      {% include nav_list nav=page.sidebar.nav %}
    {% endif %}
  {% endif %}
  <!-- 추가 할 부분 -->
  </div>
{% endif %}
```
처음 파일을 열면 위와 같이 되어있습니다. 잘보면 ```<div>``` 태그로 감싸져있는것을 볼수 있는데
이 태그안에다가 카테고리리스트를 추가하겠습니다.

이전에 생성한 ```categories/category-archive.md``` 파일의 ```yml``` 설정을 보면, 아래와 같이 되어있을텐데, 
여기서 ```layout: categories``` 을 이용해봅시다.
```
---
title: "Posts by Category"
layout: categories
permalink: /categories/
author_profile: true
---
```
```layout: categories``` 은 경로 ```_layouts/categories.html``` 을 가리키게 되는데, 이 문서를 보면.
아래와 같은 코드로 구성되어있는데, 이 화면은 ```page```를 처음 만들었을때 화면 상단의 ```category``` 를 눌렀을 때 표현되는 화면입니다.
크게 4부분으로 나눠지는데,
- 1 : 컨텐츠 include
- 2 : 카테고리 변수설정
- 3 : 카테고리 태그리스트
- 4 : 선택된 카테고리리스트 및 게시글
정도로 이해하면 되겠습니다.
```
---
layout: archive
---
<!-- 1 -->
{{ content }}
<!-- 2 -->
{% assign categories_max = 0 %}
{% for category in site.categories %}
  {% if category[1].size > categories_max %}
    {% assign categories_max = category[1].size %}
  {% endif %}
{% endfor %}
<!-- 3 -->
<ul class="taxonomy__index">
  {% for i in (1..categories_max) reversed %}
    {% for category in site.categories %}
      {% if category[1].size == i %}
        <li>
          <a href="#{{ category[0] | slugify }}">
            <strong>{{ category[0] }}</strong> <span class="taxonomy__count">{{ i }}</span>
          </a>
        </li>
      {% endif %}
    {% endfor %}
  {% endfor %}
</ul>
<!-- 4 -->
{% assign entries_layout = page.entries_layout | default: 'list' %}
{% for i in (1..categories_max) reversed %}
  {% for category in site.categories %}
    {% if category[1].size == i %}
      <section id="{{ category[0] | slugify | downcase }}" class="taxonomy__section">
        <h2 class="archive__subtitle">{{ category[0] }}</h2>
        <div class="entries-{{ entries_layout }}">
          {% for post in category.last %}
            {% include archive-single.html type=entries_layout %}
          {% endfor %}
        </div>
        <a href="#page-title" class="back-to-top">{{ site.data.ui-text[site.locale].back_to_top | default: 'Back to Top' }} &uarr;</a>
      </section>
    {% endif %}
  {% endfor %}
{% endfor %}
```
저는 2번, 3번 코드를 이용하여 ```sidebar.html``` 에 붙여넣겠습니다.
아래 소스를 바로 ```sidebar.html``` 에 붙여넣어도됩니다.
```
{% if page.author_profile or layout.author_profile or page.sidebar %}
  <div class="sidebar sticky">
  {% if page.author_profile or layout.author_profile %}{% include author-profile.html %}{% endif %}
  {% if page.sidebar %}
    {% for s in page.sidebar %}
      {% if s.image %}
        <img src="{{ s.image | relative_url }}"
             alt="{% if s.image_alt %}{{ s.image_alt }}{% endif %}">
      {% endif %}
      {% if s.title %}<h3>{{ s.title }}</h3>{% endif %}
      {% if s.text %}{{ s.text | markdownify }}{% endif %}
      {% if s.nav %}{% include nav_list nav=s.nav %}{% endif %}
    {% endfor %}
    {% if page.sidebar.nav %}
      {% include nav_list nav=page.sidebar.nav %}
    {% endif %}
  {% endif %}

<!-- 카테고리 list -->
  {% assign categories_max = 0 %}
  {% for category in site.categories %}
    {% if category[1].size > categories_max %}
      {% assign categories_max = category[1].size %}
    {% endif %}
  {% endfor %}

  <ul class="taxonomy__index0">
    {% for i in (1..categories_max) reversed %}
      {% for category in site.categories %}
        {% if category[1].size == i %}
          <li style="width:100%">
            <a href="#{{ category[0] | slugify }}">
              <strong>{{ category[0] }}</strong> <span class="taxonomy__count">{{ i }}</span>
            </a>
          </li>
        {% endif %}
      {% endfor %}
    {% endfor %}
  </ul>
  </div> 
{% endif %}
```
[![sidebar에 카테고리 메뉴 생성 컬럼3](/assets/jekyll/images/jekyll-page-side-bar-col3.png)](/assets/jekyll/images/jekyll-page-side-bar-col3.png)

보면 조금 맘에 들지 않습니다. 깔끔하게 일자로 내려오는 메뉴를 만들고 싶은데, 컬럼이 3개나 존재합니다.
이를 해결하기 위해서 ```개발자도구```를 참고하여 봤더니, ```<ul class="taxonomy__index">``` 부분의 ```_sass/minimal-mistakes/_page.scss```에서 컬럼3(2)개로 나눠지는 코딩이 되어있는 것을 볼 수 있습니다.
```
.taxonomy__index {
  display: grid;
  grid-column-gap: 2em;
  grid-template-columns: repeat(2, 1fr);  <!-- 이부분 -->
  margin: 1.414em 0;
  padding: 0;
  font-size: 0.75em;
  list-style: none;

  @include breakpoint($large) {
    grid-template-columns: repeat(3, 1fr);  <!-- 이부분 -->
  }

  a {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    padding: 0.25em 0;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    color: inherit;
    text-decoration: none;
    border-bottom: 1px solid $border-color;
  }
}
```

저는 이부분을 대강 복사하여 ```.taxonomy__index1``` 이라고 명시하고, ```grid-template-columns: repeat(1, 1fr);``` 이라고 수정합니다(반응형 부분도 마찬가지)(a태그도 같이 복사해줍시다), 그리고 ```sidebar.html``` 문서의 클래스명도 똑같이 변경해줍니다.

```
.taxonomy__index1 { <!-- 이부분 -->
  display: grid;
  grid-column-gap: 2em;
  grid-template-columns: repeat(1, 1fr);  <!-- 이부분 -->
  margin: 1.414em 0;
  padding: 0;
  font-size: 0.75em;
  list-style: none;

  @include breakpoint($large) {
    grid-template-columns: repeat(1, 1fr);  <!-- 이부분 -->
  }

  a {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    padding: 0.25em 0;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    color: inherit;
    text-decoration: none;
    border-bottom: 1px solid $border-color;
  }
}
.taxonomy__index {
  display: grid;
  grid-column-gap: 2em;
  grid-template-columns: repeat(2, 1fr); 
  margin: 1.414em 0;
  padding: 0;
  font-size: 0.75em;
  list-style: none;

  @include breakpoint($large) {
    grid-template-columns: repeat(3, 1fr); 
  }

  a {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    padding: 0.25em 0;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    color: inherit;
    text-decoration: none;
    border-bottom: 1px solid $border-color;
  }
}
```
[![sidebar에 카테고리 메뉴 생성 컬럼1](/assets/jekyll/images/jekyll-page-side-bar-col1.png)](/assets/jekyll/images/jekyll-page-side-bar-col1.png)

# 2. 사이드메뉴 클릭시 세부 카테고리리스트 보여주기
사이드메뉴에 카테고리를 만들었는데, 눌러도 반응이없다. 하지만 URL 부분에 보면 ```http://localhost:4000/#react``` 이런식으로 변경되는 것을 확인할 수 있다.
이부분은 ```makrup``` 에서도 ```<h?>``` 태그로의 네비게이션 역할을 하는데, 이부분의 작동을 확인하고 싶다면, 화면상단 ```category``` 를 눌러 원래의 화면에서 사이드메뉴의 ```category``` 들을 눌러서 화면(스크롤)이 이동하는 것을 확인할 수 있다.

이부분을 수정하여 ```content``` 영역, 메인 화면부분을 원하는 카테고리리스트만 표현되게 수정해보자.

먼저, ```page```를 공부할 때, ```category/edge-case``` 를 봤던 기억이 있을 것이다.
어떤 선택한 ```category``` 모아보는 기능이었는데, 이부분을 활용해 볼 것이다.

## 세부 카테고리 폴더 생성
폴더 최상단의 ```categories``` 안에 추가할 카테고리 폴더를 만들어보자. ```categories/jekyll``` 


## 카테고리 설정 파일 추가.
```test/_pages/edge-case.md``` 파일을 추가하여 위의 ```categories/jekyll``` 폴더에 붙여넣자. 그리고 이름을 ```edge-case.md``` 에서 ```jekyll.md``` 로 변경하자.
파일을 열어 내용을 아래와 같이 변경하자
```
---
title: jekyll
layout: category
permalink: /categories/jekyll/
taxonomy: jekyll
---

Sample post listing for the category `jekyll`.

```