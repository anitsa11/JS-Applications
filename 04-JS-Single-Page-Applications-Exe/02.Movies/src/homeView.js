const homeRef = document.getElementById("home-page")
const movieList = document.getElementById("movies-list");


export function showHome() {
    homeRef.style.display = "block";
    homeRef.querySelectorAll("section").forEach(section => section.style.display = "block");

    showAllMovies()
}

function showAllMovies() {
    movieList.innerHTML = "";

    createMovie("data")
}

function createMovie(data) {
    const li = document.createElement("li");
    li.classList.add("card");
    li.classList.add("mb-4");

    li.innerHTML = `
                <img class="card-img-top" src="./images/movie1.jpeg" alt="Card image cap" width="400" />
                <div class="card-body">
                  <h4 class="card-title">Movie Title</h4>
                  <a href="#">
                  </a>
                </div>
                <div class="card-footer">
                  <button type="button" class="btn btn-info">Details</button>
                </div>
    `
    movieList.appendChild(li);
}