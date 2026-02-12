const watchlistDataSection = document.getElementById('watchlist-data-section')
let watchListArr = JSON.parse(localStorage.getItem('watchlist')) || []

document.addEventListener('click', (e) => {
    if (e.target.dataset.remove) {
        handleRemoveBtnClick(e.target.dataset.remove)
    }
})

function handleRemoveBtnClick(id) {
    const targetItemObj = watchListArr.filter(item => {
        return item.imdbID === id
    })[0]

    if (targetItemObj) {
        watchListArr = watchListArr.filter(el => el.imdbID !== id)
        console.log(watchListArr);
        localStorage.setItem('watchlist', JSON.stringify(watchListArr))
        renderWatchList()
    }
}

function getFeedHtml() {
    return watchListArr.map(movie =>
        `<div class="item-container">
                <div class="movie flex align-center">
                    <img src="${movie.Poster}" >
                    <div class="details">
                        <div class="details-head flex">
                            <h2>${movie.Title}</h2>
                            <i class="fa-solid fa-star"></i>
                            <span>${movie.Ratings[0].Value.substr(0, 3)}</span>
                        </div>
                        <div class="details-details flex">
                            <span>${movie.Runtime}</span>
                            <span>${movie.Genre}</span>
                            <button class="add-btn flex align-center" data-remove="${movie.imdbID}">
                                <i class="fa-solid fa-minus"></i>Remove
                            </button>
                        </div>
                        
                        <p>${movie.Plot.length > 150 ? movie.Plot.substring(0, 100) + '...Read more' : movie.Plot}</p>
                        
                    </div>
                </div>
              </div>
            `
    ).join("")
}

function renderWatchList() {
    if (watchListArr.length === 0) {
        watchlistDataSection.innerHTML = emptyWatchlist();
    } else {
        watchlistDataSection.innerHTML = getFeedHtml();
    }

}

function emptyWatchlist() {
    return `<div class="watchlist-empty-section flex align-center">
                <p>Your watchlist is looking a little empty...</p>
                <a href="index.html" class="flex center">
                    <i class="fa-solid fa-plus"></i>
                    <span>Let's add some movies!</span>
                </a>
            </div>`
}

renderWatchList()