(function () {

    "use strict";
    let url = 'https://puffy-easy-circle.glitch.me/movies'

// created markup for starting web page
    function renderMovies() {
        let markUp = ''
        let markUp2 = ''
        fetch(url)
            .then(movieData => {
                return movieData.json()
            })
            .then(data => {
                data.map(data => {
                    const movieTitle = data.title
                    const movieDirector = data.director
                    const ratings = data.rating
                    const genre = data.genre
                    const idNum = data.id


                    markUp += `
    <tr>
      <td>${movieTitle}</td>
      <td>${movieDirector}</td>
      <td>${ratings}</td>
      <td>${genre}</td>
    </tr>
  `
                    markUp2 += `<option>${movieTitle}</option>`

                })
                $('.movie-container').html(markUp)
                $('#delete-input').html(markUp2)
            })
    }

    renderMovies()

    // add function for adding movies

    $('#add-input').click(() => {
        let newMovie = {
            title: $('#title-input').val(),
            director: $('#director-input').val(),
            rating: $('#stars-input').val(),
            genre: $('#genre-input').val(),
        }
        console.log(newMovie)
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newMovie),
        };
        fetch(url, options).then(res => console.log(res))
        renderMovies()

    })

    $('#delete').click(() => {
        let deleteMovie = $('#delete-input').val()
        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({data: deleteMovie})
    }
    fetch(url, options).then(res => console.log(res))
    })
})()

