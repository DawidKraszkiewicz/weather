window.addEventListener("load", () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            long = position.coords.longitude;
            lat= position.coords.latitude;
            const proxy = "https://cors-anywhere.herokuapp.com/";
            const api = `${proxy}https://api.darksky.net/forecast/0c1ace8f304978535e0d7fd753b47e1e/${lat},${long}`;
            fetch(api)
                .then(response=>{
                    return response.json();
                })
                .then(data=>{
                    
                    const {temperature, summary, icon} = data.currently;
                    //Set DOM elements from the API
                    temperatureDegree.textContent = temperature;
                    locationTimezone.textContent = data.timezone;
                    temperatureDescription.textContent = summary;
                    //set icon
                    setIcons(icon, document.querySelector(".icon"));
                });
        });
    }
    function setIcons(icon, iconID){
        const skycons= new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});