(function () {

"use strict";


let markUp =''
fetch('https://puffy-easy-circle.glitch.me/movies')
    .then(movieData => {return movieData.json()})
    .then(data => {
        console.log(data);
        data.map( data => {
            const movieTitle = data.title
            const movieDirector = data.director
            const ratings = data.rating
            const genre = data.genre
            const idNum = data.id

            markUp += `
            
            `
        })
    })
})()