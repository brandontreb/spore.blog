function ready(callback){
  // in case the document is already rendered
  if (document.readyState!='loading') callback();
  // modern browsers
  else if (document.addEventListener) document.addEventListener('DOMContentLoaded', callback);
  // IE <= 8
  else document.attachEvent('onreadystatechange', function(){
      if (document.readyState=='complete') callback();
  });
}

ready(async () => {
  try {

    const conversationsDiv = document.getElementById('conversations');
    if(!conversationsDiv) {
      console.log('This theme does not support conversations. Add a div with the id conversations to your page.');
      return;
    }

    conversationsDiv.innerHTML = `
      <div class="conversations-loading">
        <div class="spinner">Loading...</div>
      </div>
    `;

    let url = decodeURIComponent(document.currentScript.src.split('?')[1].split('=')[1]);
    let urlParts = new URL(url);
    let baseUrl = urlParts.origin;
    let permalink = encodeURIComponent(urlParts.pathname);    
    const response = await fetch(`${baseUrl}/api/v1/conversations?permalink=${permalink}`);
    let data = await response.json();

    if(data.length > 0) {
      conversationsDiv.innerHTML = `<h3>Replies</h3>`;
    } else {
      conversationsDiv.innerHTML = `<p>No replies yet</p>`;
    }
    
    data.forEach(conversation => {      
      let conversationDiv = document.createElement('div');
      conversationDiv.className = 'conversation';
      conversationDiv.innerHTML = `
        <div>
          <img src="${conversation.entry.author.photo}" alt="${conversation.entry.author.name}" width="30" height="30" style="max-width: 30px;" />
          <span>${conversation.entry.author.name}</span>
        </div>
        <div>
          <span>${conversation.entry.content.value}</span>
        </div>
        <div>
          <span>${conversation.entry.published}</span>
        </div>
        `;
      conversationDiv.id = conversation.id;
      conversationsDiv.appendChild(conversationDiv);
    });

  } catch (e) {
    console.log(e);
  }
});