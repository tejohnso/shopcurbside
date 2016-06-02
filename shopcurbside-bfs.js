var fetch = require("node-fetch"),
refreshSession = require("./session-refresh.js");

function bfs(nodes) {
  if (nodes.length === 0) {return;}

  return refreshSession()
  .then((session)=>{
    return fetch("http://challenge.shopcurbside.com/" + nodes.shift(), {headers: {"Session": session}});
  })
  .then((resp)=>{
    return resp.json();
  })
  .then((json)=>{
    if (json.error) {throw new Error(json.error);}
    if (json.message) {console.log(json.message);}
    if (json.secret) {console.log(json.secret);}
    json.next = json.Next || json.nExt || json.neXt || json.nexT || json.next;
    if (json.next) {
      if (!Array.isArray(json.next)) {json.next = [json.next];}
      nodes = nodes.concat(json.next);
    }
    return bfs(nodes);
  })
  .catch((err)=>{console.log(err);});
}

bfs(["start"]);
