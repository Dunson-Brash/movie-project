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
    <tr class="editMovie">
      <td>${movieTitle}</td>
      <td>${movieDirector}</td>
      <td>${ratings}</td>
      <td class="text-capitalize">${genre}</td>
      <td><button value="${idNum}" class="edit">Edit</button></td>
    </tr>
    <tr class="d-none">
    
    <form id="edit-form">
      <td><input type="text" id="edit-title-input${idNum}" placeholder="${movieTitle}"></td>
        <td><input type="text" id="edit-director-input" placeholder="${movieDirector}"></td>
        <td>
            <select id="edit-stars-input" required>
                <option disabled selected>Rating</option>
                <option>0</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
            </select>
            </td>
            <td> <input class="text-capitalize" type="text" id="edit-genre-input" placeholder="${genre}"></td>
        <td><button class="edit-input" id="edit-input" type="button">+</button></td> 
        </form>
</tr>
    
  `
                    markUp2 += `<option value="${idNum}" >${movieTitle}</option>`


                })
                $('.movie-container').html(markUp)
                $('#delete-input').html(markUp2)


                //      handle
            })
            .then(() => {
                $('.movie-container').on('click', '.edit', function () {
                    let hiddenEdit = $(this).parent().parent().next()
                    $(this).addClass('d-none')
                    $(hiddenEdit).removeClass('d-none')

                    let movieEditId = $(this).attr('value');
                    return movieEditId

                })
            }).then(()=>{
                $('.movie-container').on('click', `.edit-input`, function () {
                    let editMovie = {
                        title: $(this).parent().parent().children().children().first().val(),
                        director: $(this).parent().parent().children().next().next().children().val(),
                        rating: $(this).parent().parent().children().next().next().next().children().val(),
                        genre: $(this).parent().parent().children().next().next().next().next().children().val(),
                    }
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
        console.log(newMovie)
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newMovie),
        };
        fetch(url, options).then(res => console.log(res)).then(() => renderMovies())

    })

    $('#delete').click(() => {
        let deleteItem = $('#delete-input').val()
        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },

        }
        fetch(`https://puffy-easy-circle.glitch.me/movies/${deleteItem}`, options).then(res => console.log(res)).then(() => {
            renderMovies()
        })

    })

    //  HANDLE EDIT
    //handleEdit(id){
    // grab user input, create an body object with new info

//     fetch -> PUT url/{id}
//     body: userInput
// }

    // $('.movie-container').on('click',`#edit`,() => {
    //     console.log($(this).attr("value"))
    //     //handleEdit(id)
    // })

    let loader = $('#preloader');

    $(loader).on('load', () => {

    })

})()

