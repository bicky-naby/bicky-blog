---
layout: default
title: "Welcome to Bicky’s Blog!"
---

<div class="construction">
  <img src="https://blob.gifcities.org/gifcities/2HK73FMZ27D3XXG4Q6PYVS4WLNCMTKHU.gif" width="200" alt="Under Construction" onerror="this.src='https://via.placeholder.com/200/FF00FF/000000?text=UNDER+CONSTRUCTION'">
</div>

# 💖 HEY BESTIE! 💖

Welcome to **Bicky Naby’s Blog**, your new favorite spot on the web! 🌈✨ Here, I’ll be sharing my *~thoughts~*, my *~drama~*, and all the things that make life *~sparkle~*.

## 📜 LATEST POSTS

<script>
// Bicky's *~extra~* date magic with Y2K flair! ✨
function formatBickyDate(dateString) {
  const now = new Date();
  const postDate = new Date(dateString);
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const postDay = new Date(postDate.getFullYear(), postDate.getMonth(), postDate.getDate());
  
  // Calculate days difference
  const diffTime = today - postDay;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  // Day emojis - because *~sparkle~*!
  const dayEmojis = ['🌞', '🌙', '💖', '✨', '💎', '🎀', '🌈'];
  const monthEmojis = ['❄️', '💘', '🍀', '🌸', '🌞', '🏖️', '🎆', '🌙', '🍂', '🎃', '🍁', '❄️'];
  
  // Y2K style formatting!
  if (diffDays === 0) {
    return 'TODAY';
  } else if (diffDays === 1) {
    return 'YESTERDAY';
  } else if (diffDays < 7) {
    // Within the last week - use day names with emojis!
    const days = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
    const dayName = days[postDate.getDay()];
    const dayEmoji = dayEmojis[postDate.getDay()];
    if (diffDays === 2) {
      return dayEmoji + ' DAY BEFORE YESTERDAY';
    }
    return dayEmoji + ' LAST ' + dayName;
  } else if (diffDays < 14) {
    // Last week - use day names with emojis!
    const days = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
    const dayName = days[postDate.getDay()];
    const dayEmoji = dayEmojis[postDate.getDay()];
    return dayEmoji + ' ' + dayName + ' LAST WEEK';
  } else {
    // Older than 2 weeks - use the original date but make it cute with emojis!
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    const monthEmoji = monthEmojis[postDate.getMonth()];
    return monthEmoji + ' ' + months[postDate.getMonth()] + ' ' + postDate.getDate() + ', ' + postDate.getFullYear();
  }
}

// Add some *~sparkle~* to the dates!
document.addEventListener('DOMContentLoaded', function() {
  const dateElements = document.querySelectorAll('.post-date');
  dateElements.forEach(el => {
    const absoluteDate = el.getAttribute('data-date');
    const bickyDate = formatBickyDate(absoluteDate);
    el.textContent = bickyDate;
    el.style.color = '#00FFFF';
    el.style.fontFamily = '"Comic Sans MS", "Comic Sans", "Chalkboard", "Chalkboard SE", "Marker Felt", fantasy, sans-serif';
    el.style.fontWeight = 'regular';
    el.style.textShadow = '2px 2px 4px #000';
  });
});
</script>

{% assign newest_posts = site.posts | sort: 'date' | reverse | slice: 0, 3 %}
{% for post in site.posts %}
{% assign is_new = false %}
{% for new_post in newest_posts %}
{% if new_post.url == post.url %}
{% assign is_new = true %}
{% endif %}
{% endfor %}
- <span class="post-date" data-date="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%B %d, %Y" }}</span> ✨ {% if is_new %}<img src="https://blob.gifcities.org/gifcities/IE2M4ENYXE6A462NVZBIIQEXJC3WF6TX.gif" width="40" alt="NEW" style="vertical-align: middle;">{% endif %} [{{ post.title }}]({{ site.baseurl }}{{ post.url }})
{% endfor %}

<div class="blink">
  <p>💫 <blink>THIS SITE IS UNDER CONSTRUCTION! PLEASE COME BACK LATER!</blink> 💫</p>
</div>

<div class="construction">
  <img src="https://blob.gifcities.org/gifcities/2HK73FMZ27D3XXG4Q6PYVS4WLNCMTKHU.gif" width="200" alt="Under Construction" onerror="this.src='https://via.placeholder.com/200/FF00FF/000000?text=UNDER+CONSTRUCTION'">
</div>
