const ipInput = document.getElementById('ipInput')
const pingResponse = document.getElementById('pingResponse')


function pingIP(ipAddress) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          pingResponse.innerText = `Ping successful to ${ipAddress}`
        } else {
          pingResponse.innerText = `Ping failed to ${ipAddress}`;
        }
      }
    };
    xhr.open('HEAD', 'http://' + ipAddress);
    xhr.send();
}



function pingSend(){
    pingIP(this.value)
}