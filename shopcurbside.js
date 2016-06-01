var fetch = require("node-fetch"),
refreshSession = require("./session-refresh.js");

function fetchid(id) {
  return refreshSession()
  .then((session)=>{
    return fetch("http://challenge.shopcurbside.com/" + id, {headers: {"Session": session}});
  })
  .then((resp)=>{
    return resp.json();
  })
  .then((json)=>{
    if (json.error) {throw new Error(json.error);}
    if (json.message) {console.log(json.message);}
    if (json.secret) {console.log(json.secret);}
    if (json.nExt) {json.next = json.nExt;}
    if (json.Next) {json.next = json.Next;}
    if (json.neXt) {json.next = json.neXt;}
    if (json.nexT) {json.next = json.nexT;}
    if (json.next && json.next.length) {
      if (!Array.isArray(json.next)) {json.next = [json.next];}
      return json.next.reduce((prev, next)=>{
        return prev.then(fetchid.bind(null, next));
      }, Promise.resolve());
    }
  })
  .catch((err)=>{console.log(err);});
}

fetchid("start");
