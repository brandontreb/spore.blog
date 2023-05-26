function ready(callback) {
  // in case the document is already rendered
  if (document.readyState != 'loading') callback();
  // modern browsers
  else if (document.addEventListener) document.addEventListener('DOMContentLoaded', callback);
  // IE <= 8
  else document.attachEvent('onreadystatechange', function() {
    if (document.readyState == 'complete') callback();
  });
}

ready(async() => {
  try {

    var webmention_url = document.getElementById("script_conversation").getAttribute("data-webmention_url");

    var styleEl = document.createElement('style');
    styleEl.innerHTML = `
    #conversations{
      border-top: 1px solid #eee;
    }
    #conversations img{    
      max-width: 20px;
      height: auto;            
      object-fit: cover;      
      border-radius: 50%;
      padding: 0;      
      vertical-align:middle;
    }
    #conversations a {
      text-decoration: none;        
    }
    #conversations .p-name{             
      vertical-align:middle;
    }    
    #conversations .p-url{
      font-size: 0.8em;
      color: #999;
    }
    #conversations .content p{ 
      margin: 0;
    }    
    #conversations .date, #conversations .date a{
      font-size: 0.8em;
      color: #999;
      padding: 0;
      margin: 0;      
      text-transform: none !important;
    }
    #conversations .mention{
      margin-bottom: 2em;
    }
    #conversations .webmention-form label{
      display: block;
      clear: both;      
      font-size: 1.0em;      
    }
    #conversations .webmention-form input[type=url]{
      display: block;
      width: 100%;
      font-size: 1.0em;
      padding: 0.5em;
      float: left;
    }
    #conversations .webmention-form input[type=submit]{
      display: block;      
      font-size: 1.0em;
      padding: 0.5em;
      float: right;
    }
    #conversations .clear{
      clear: both;
    }
    `;
    document.head.appendChild(styleEl);

    const conversationsDiv = document.getElementById('conversations');
    if (!conversationsDiv) {
      console.log('This theme does not support conversations. Add a div with the id conversations to your page.');
      return;
    }

    conversationsDiv.innerHTML = `
      <br />
      <form class="webmention-form" action="${webmention_url}" method="post">
        <label>Have you written a <a href="https://indieweb.org/responses">response</a> to this? Let me know the URL:</label>
        <br />
        <input type="url" name="source" class="url">
        <div>
          <label>&nbsp;</label>
          <input type="submit" class="ui submit button" value="Send Webmention">
        </div>      
      <input type="hidden" name="target" value="${window.location.href}">
    </form>
    <div class="clear"></div>
    `
    let target = encodeURIComponent(window.location.href);    
    // target = 'https://brandontreb.com/2023/01/29/8ym4rm3zu2mbsqihipyi67';
    let url = `https://webmention.io/api/mentions.jf2?target=${target}`
    const response = await fetch(url);
    let data = await response.json();

    // If there was a slash at the end of target, try again without it
    if (target.endsWith('/')) {
      target = target.slice(0, -1);
      url = `https://webmention.io/api/mentions.jf2?target=${target}`
      const response = await fetch(url);
      // Merge data
      let data2 = await response.json();
      data.children = data.children.concat(data2.children);
    }

    // If there was no slash at the end of target, try again with it
    if (!target.endsWith('/')) {
      target = target + '/';
      url = `https://webmention.io/api/mentions.jf2?target=${target}`
      const response = await fetch(url);
      // Merge data
      let data2 = await response.json();
      data.children = data.children.concat(data2.children);
    }

    if (!data || !data.children || data.children.length === 0) {
      return;
    }

    conversationsDiv.innerHTML = `${conversationsDiv.innerHTML}<h3>Replies</h3><br />`;

    let mentions = data.children
      .sort(function(a, b) {
        return new Date(a.published) - new Date(b.published);
      });;

    mentions.forEach(mention => {
      let conversationDiv = document.createElement('div');
      conversationDiv.className = 'conversation';
      conversationDiv.innerHTML = `
        <div class="mention">     
        <span>
          <img src="${mention.author.photo}" alt="${mention.author.name}" title="${mention.author.name}" />     
          <a href="${mention.author.url}">            
            <span class="p-name">${mention.author.name}</span>
          </a>          
        </span>
          <span class="p-url">${mention.author.url}</span>
          ${mention['wm-property'] === 'in-reply-to' ? `<span class="content p-summary"> ${mention.content.html || mention.content.text}</span>` : ''}
          ${mention['wm-property'] === 'like-of' ? `<span class="content p-summary"><br/><strong>👍</strong></span>` : ''}
          <div class="date">
            <a href="${mention['wm-source']}">${new Date(mention.published).toDateString()}</a>
          </div>        
        </div>
        `;
      conversationDiv.id = mention.id;
      conversationsDiv.appendChild(conversationDiv);
    });

  } catch (e) {
    console.log(e);
  }
});