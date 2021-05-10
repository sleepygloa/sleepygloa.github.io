---
layout: category
title: jekyll
category: jekyll
permalink: /categories/jekyll/
author_profile: true
---

<h5> {{ page.title }} 시작하기</h5>

<div class="card">
{% for post in site.categories.jekyll %}
 <li class="category-posts">
 <!-- <span>{{ post.date | date_to_string }}</span> &nbsp;  -->
 <a href="{{ post.url }}">{{ post.title }}</a></li>
{% endfor %}
</div>