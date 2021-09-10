// ip adress fetcher
let key = 'at_pvlqoVaj8dOyYmHFsZZuHScqqPFG4';
let url = 'https://geo.ipify.org/api/'
let version = 'v1'

// bypass CORS
let bypass_cors = 'https://cors-anywhere.herokuapp.com/'

const header = {
    headers : {
        'Access-Control-Allow-Origin' : '*'
    }
}

// updated Data
let ipData = document.getElementById('ipData')
let ipLocation = document.getElementById('ipLocation')
let timezone = document.getElementById('ipLocation')
let isp = document.getElementById('isp')

// form elements
let searchBar = document.getElementById('ipSearch');
let searchBtn = document.getElementById('searchBtn');

// searchBtn.addEventListener('click',search_Api)

// determining user location with API
search_Api = (default_ip) => {
    if(default_ip == undefined) {
        // setting default ip adress
        var ip_url = `${bypass_cors}${url}${version}?apikey=${key}`
    } else {
        var ip_url = `${bypass_cors}${url}${version}?Apikey=${key}&ipAdress=${default_ip}`
    }

    fetch(ip_url, header)
    .then(res => res.json())
    .then(data => {
        ipData.innerHTML = data.ip;
        ipLocation.innerHTML = `${data.location.city} ${data.location.country} ${data.location.postalCode}`   
        timezone.innerHTML = data.location.timezone;
        isp.innerHTML = data.isp;

        updateMap([data.location.lat,data.location.lng])
    })
    // .catch(error => alert('failed to retrieve data, check your connection'))
}


// map section
var mymap = L.map('map').setView([51.505, -0.09], 13);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiYXp6eTMwIiwiYSI6ImNrdGVhM2txYjJubDYycHI1aDI2MHFzb24ifQ.WjQZSwT3Br9y0Q0-MtOFww'
}).addTo(mymap);

updateMap = (updateMark = [100,100]) => {
    map.setView(updateMark,13)
    L.marker(updateMark).addTo(mymap)
}

// running the function
search_Api();
document.addEventListener('load',updateMap());

searchBtn.addEventListener('click', e => {
    e.preventDefault();
    if(searchBar.value != '' && searchBar.value != null) {
        search_Api(searchBar.value);
        return
    } 
    alert('please enter a valid IP adress')
})



