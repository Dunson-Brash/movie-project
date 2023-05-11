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
    <div class="card editMovie col-5 m-5">
      <h1 class="text-center mb-3 mt-3 movie-title text-capitalize">${movieTitle}</h1>
      <h5 class="text-center mb-3 mt-3 movie-director text-capitalize">${movieDirector}</h5>
      <h4 class="text-center mb-3 mt-3 movie-rating">${ratings}</h4>
      <h3 class="text-center text-capitalize mb-3 mt-3 movie-genre">${genre}</h3>
      <div class ="text-center mb-3 mt-3"><button value="${idNum}" class="edit btn btn-primary">Edit</button></div>
    </div>
    
    <div class="card d-none col-5 m-5" id="edit-form">
    <form >
      <div class="text-center mb-3 mt-3">Title: <input type="text" id="edit-title-input${idNum}" placeholder="${movieTitle}"></div>
        <div class="text-center mb-3 mt-3">Director: <input type="text" id="edit-director-input${idNum}" placeholder="${movieDirector}"></div>
        <div class="text-center mb-3 mt-3">
            <select id="edit-stars-input" required>
                <option disabled selected>Rating</option>
                <option>0</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
            </select>
            </div>
            <div class="text-center mb-3 mt-3">Genre: <input class="text-capitalize" type="text" id="edit-genre-input" placeholder="${genre}"></div>
        <div class="text-center mb-3 mt-3"><button value="${idNum}" class="btn btn-primary edit-input" id="edit-input" type="button">+</button></div> 
        </form>
</div>
    
  `
                    markUp2 += `<option value="${idNum}" >${movieTitle}</option>`


                })
                $('.movie-container').html(markUp)
                $('#delete-input').html(markUp2)


                //      handle
            })
            .then(() => {
                $('.movie-container').on('click', '.edit', function () {
                    // on click of edit, display edit form
                    let hiddenEdit = $(this).parent().parent().next()
                    $(this).addClass('d-none')
                    $(hiddenEdit).removeClass('d-none')


                })
            }).then(() => {

            $('.movie-container').on('click', `.edit-input`, function () {

                // let updatedMovie = {}
                // -----------------  this fetch request helps get movies original values and in the for Each loop ... change the values of updatedMovies based on these conditions: if the movie title that the user input is empty , switch it for movie.title,etc.
                fetch(url).then(res => res.json()).then(movies => {
                    console.log($(this).attr('value'))
                    movies.forEach(movie => {
                        let idNum = $(this).attr('value')
                        if (movie.id == idNum) {
                            let prevMovie = {
                                title: movie.title,
                                director: movie.director,
                                ratings: movie.rating,
                                genre: movie.genre,
                                id: movie.id
                            }
                            let editMovie = {
                                title: $(this).parent().parent().children().children().first().val(),
                                director: $(this).parent().parent().children().next().children().val(),
                                rating: $(this).parent().parent().children().next().next().children().val(),
                                genre: $(this).parent().parent().children().next().next().next().children().val(),
                                id: $(this).attr('value'),
                            }
                            if (editMovie.title === '') {
                                editMovie.title = prevMovie.title
                            }
                            if (editMovie.director === '') {
                                editMovie.director = prevMovie.director
                            }
                            if (editMovie.rating === null) {
                                editMovie.rating = prevMovie.ratings;
                            }
                            if (editMovie.genre === '') {
                                editMovie.genre = prevMovie.genre
                            }

                            console.log(editMovie)
                            console.log(prevMovie)

                            const options = {
                                method: 'PUT',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify(editMovie),
                            };
                            fetch(`https://puffy-easy-circle.glitch.me/movies/${editMovie.id}`, options)
                                .then(() =>
                                    $(document).ready(() => {
                                        $('.pageloader').show();
                                        setTimeout(() => {
                                            $('.pageloader').hide();
                                        }, 1000)
                                    }))
                                .then(() => renderMovies())
                        }
                    })
                })

            })
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
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newMovie),
        };
        fetch(url, options)
            .then(() =>
                $(document).ready(() => {
                    $('.pageloader').show();
                    setTimeout(() => {
                        $('.pageloader').hide();
                    }, 1000)
                }))
            .then(() => {
                renderMovies()
            });

    })

    $('#delete').click(() => {
        let deleteItem = $('#delete-input').val()
        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },

        }
        fetch(`https://puffy-easy-circle.glitch.me/movies/${deleteItem}`, options)
            .then(() =>
                $(document).ready(() => {
                    $('.pageloader').show();
                    setTimeout(() => {
                        $('.pageloader').hide();
                    }, 1000)
                }))
            .then(() => renderMovies())

    })
    $(document).ready(() => {
        setTimeout(() => {
            $('.pageloader').hide();
        }, 1000)
    });

})()

