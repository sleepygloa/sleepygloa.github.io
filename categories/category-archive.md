---
title: ""
layout: category
permalink: /categories/
author_profile: true
---

{% assign categories_max = 0 %}
{% for category in site.categories %}
  {% if category[1].size > categories_max %}
    {% assign categories_max = category[1].size %}
  {% endif %}
{% endfor %}

<!-- <ul class="taxonomy__index"> -->
<div>
  {% for i in (1..categories_max) reversed %}
    {% for category in site.categories %}
      {% if category[1].size == i %}
        <h3> {{ category[0] }} </h3>
        <div class="card">
        {% for post in category[1] %}
        <li class="category-posts">
        <!-- <span>{{ post.date | date_to_string }}</span> &nbsp;  -->
        <a href="{{ post.url }}">{{ post.title }}</a></li>
        {% endfor %}
        </div>
      {% endif %}
    {% endfor %}
  {% endfor %}
</div>
<!-- </ul> -->

<!-- 
<h5> Posts by Category : {{ page.title }} </h5>

<div class="card">
{% for post in site.categories.jekyll %}
 <li class="category-posts"><span>{{ post.date | date_to_string }}</span> &nbsp; <a href="{{ post.url }}">{{ post.title }}</a></li>
{% endfor %}
</div> -->