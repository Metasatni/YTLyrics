const client_access_token =
    "&access_token="+"YOUR API ACCESS TOKEN";
function ytLyrics(){
  const getJSON = (url, callback) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.responseType = "json";

    xhr.onload = () => {
      const status = xhr.status;
      if (status == 200) {
        callback(null, xhr.response);
      }
    };
    xhr.send();
  };
  function con(){
    if (window.location.href.indexOf("https://www.youtube.com/watch?v") >= 0) {
      try {
        getJSON(req(), (err, data) => {
          if (err != null) {
            console.error(err);
          } else {
            if (
              data &&
              data.response &&
              data.response.hits &&
              data.response.hits[0] &&
              data.response.hits[0].result
            ) {
              urls = `${data.response.hits[0].result.url}`;
              val = document.getElementById("always-shown").innerHTML;
              document.getElementById("always-shown").innerHTML =
                "<div style='margin-top: 5px;background-color: #272727;border-radius: 10px;padding: 10px;'><a href='" +
                urls +
                "' target='_blank' style='padding-top:25px; font-size:15px; text-decoration:none; color:white;'>" +
                urls +
                "</div></a>";
            } else {
              document.getElementById("always-shown").innerHTML =
                "<div style='margin-top: 5px;background-color: #272727;border-radius: 10px;padding: 10px;'></div>";
            }
          }
        });
      } catch (err) {
        console.log(err);
      }
    }
  }
  function addBttn() {
    if(window.location.href.indexOf("https://www.youtube.com/watch?v") >= 0){
      console.log("startuje");
    let btn = "Click here for lyrics";
    const br = document.getElementById("always-shown");
    br.innerHTML =
      "<div style='margin-top: 5px;background-color: #272727;border-radius: 10px;padding: 10px;'>" +
      btn +
      "</div>";
      br.onclick = function(){
        con();
      }
    }
  }
  
  const gettitle = () => {
    return (title = document.evaluate(
      '//*[@id="title"]/h1/yt-formatted-string',
      document,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null
    ).singleNodeValue.innerHTML);
  };
  const req = () => {
    return "https://api.genius.com/search?q=" + gettitle() + client_access_token;
  };
    addBttn();
  
}
let prevUrl = undefined;
setInterval(() => {
  const currUrl = window.location.href;
  if (currUrl != prevUrl) {
    setTimeout(() => {
      ytLyrics();
    }, 1500);
    prevUrl = currUrl;
  }
}, 1000);

window.onload = function(){
  
  setTimeout(() => {
    ytLyrics();
  }, 1500);
  
}