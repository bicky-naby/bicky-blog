---
layout: default
title: "Welcome to Bicky's Blog"
---

# Hello!

This is **Bicky's Blog**, a place for my thoughts, projects, and ramblings.

## Latest Posts
{% for post in site.posts %}
- [{{ post.title }}]({{ post.url }})
{% endfor %}
