---
date: "2023-03-03T00:14:18.746Z"
type: reply 
post_type: reply
slug: u26qsqkwseemezodprp6
reply_to_url: https://aaronparecki.com/2023/03/02/14/
reply_to_hostname: aaronparecki.com
---
True, but it would be tricky. 

Wouldn’t the attacker have find a way to extract the `code_verifier` from local storage and pass it along with the hijacked redirect?

They would have to somehow have the ability to write custom js code on the path they are redirecting to. I guess this _is_ possible on sites that don’t sanitize user inputs.
