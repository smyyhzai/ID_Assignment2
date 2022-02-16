var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://assignment2-53e4.restdb.io/rest/login",
  "method": "GET",
  "headers": {
    "content-type": "application/json",
    "x-apikey": "22631469345172666884",
    "cache-control": "no-cache"
  }
}

$.ajax(settings).done(function (response) {
  console.log(response);
});