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
<div class="card text-center d-block w-100 mb-3">
              <div class="card-header">
                ${movieDirector} 
              </div>
              <div class="card-body">
                <h2 class="card-title">${movieTitle}</h2>
                <h5 class="card-genre text-capitalize">${genre} </h5>
              </div>
              <div class="card-footer text-muted">
                <h5>${ratings} Stars</h5>
              </div> 
              </div>      
            `
    })
$('.container').html(markUp)})

