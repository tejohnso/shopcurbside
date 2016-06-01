var fetch = require("node-fetch"),
sessionCallCount,
session;

module.exports = function refreshSession() {
  if (!sessionCallCount || sessionCallCount === 10) {
    sessionCallCount = 1;
    return fetch("http://challenge.shopcurbside.com/get-session")
    .then((resp)=>{
      return resp.text();
    })
    .then((text)=>{
      session = text;
      return session;
    });
  } else {
    sessionCallCount += 1;
    return Promise.resolve(session);
  }
};
