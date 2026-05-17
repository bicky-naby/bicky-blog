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
  const diffWeeks = Math.floor(diffDays / 7);
  
  // Debug: log the values to console
  console.log('Post date:', dateString, 'Parsed:', postDate, 'PostDay:', postDay);
  console.log('Today:', today, 'DiffDays:', diffDays, 'DiffWeeks:', diffWeeks);
  
  // Number to words - because *~sparkle~*!
  function numberToWords(num) {
    const ones = ['', 'ONE', 'TWO', 'THREE', 'FOUR', 'FIVE', 'SIX', 'SEVEN', 'EIGHT', 'NINE'];
    const teens = ['TEN', 'ELEVEN', 'TWELVE', 'THIRTEEN', 'FOURTEEN', 'FIFTEEN', 'SIXTEEN', 'SEVENTEEN', 'EIGHTEEN', 'NINETEEN'];
    const tens = ['', 'TEN', 'TWENTY', 'THIRTY', 'FORTY', 'FIFTY', 'SIXTY', 'SEVENTY', 'EIGHTY', 'NINETY'];
    
    if (num < 10) {
      return ones[num];
    } else if (num < 20) {
      return teens[num - 10];
    } else if (num < 100) {
      const ten = Math.floor(num / 10);
      const one = num % 10;
      return tens[ten] + (one ? '-' + ones[one] : '');
    } else if (num < 1000) {
      const hundred = Math.floor(num / 100);
      const remainder = num % 100;
      if (remainder === 0) {
        return ones[hundred] + ' HUNDRED';
      } else {
        return ones[hundred] + ' HUNDRED ' + numberToWords(remainder);
      }
    } else {
      return 'A LOT OF';
    }
  }
  
  // Day emojis - because *~sparkle~*!
  const dayEmojis = ['🌞', '🌙', '💖', '✨', '💎', '🎀', '🌈'];
  const monthEmojis = ['❄️', '💘', '🍀', '🌸', '🌞', '🏖️', '🎆', '🌙', '🍂', '🎃', '🍁', '❄️'];
  
  // Y2K style formatting!
  if (diffDays === 0) {
    return 'TODAY';
  } else if (diffDays === 1) {
    return 'YESTERDAY';
  } else if (diffDays === 2) {
    return dayEmojis[postDate.getDay()] + ' DAY BEFORE YESTERDAY';
  } else if (diffDays < 7) {
    // Within the last week - use day names with emojis!
    const days = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
    return dayEmojis[postDate.getDay()] + ' LAST ' + days[postDate.getDay()];
  } else if (diffWeeks < 1000) {
    // Up to 1000 weeks ago - keep the weekday energy going!
    const days = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
    const dayName = days[postDate.getDay()];
    const dayEmoji = dayEmojis[postDate.getDay()];
    
    if (diffWeeks === 1) {
      return dayEmoji + ' ' + dayName + ' LAST WEEK';
    } else {
      return dayEmoji + ' ' + dayName + ' ' + numberToWords(diffWeeks) + ' WEEKS AGO';
    }
  } else {
    // Older than 1000 weeks - use the original date but make it cute with emojis!
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
