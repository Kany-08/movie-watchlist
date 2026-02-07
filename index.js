

const apiKey = import.meta.env.VITE_API_KEY
let dataArr = []
let watchListArr = JSON.parse(localStorage.getItem('watchlist')) ?? []
let iconBtn = 'assets/plus-w.svg'

const searchBarInput = document.getElementById("search-bar-input")
const dataSection = document.getElementById("data-section")
const searchBtn = document.getElementById("search-btn")
const watchlistDataSection = document.getElementById('watchlist-data-section')

if (watchListArr.length > 0) {
    renderWatchList()
}
console.log(watchListArr);

document.addEventListener('click', (e) => {
    if (e.target.id === "search-btn") {
        handleSearchBtnClick()
    }
    if (e.target.dataset.add) {
        handleAddBtnClick(e.target.dataset.add)
    }
})


async function handleSearchBtnClick() {

    try {
        let searchArrIds = []
        const response = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&s=${searchBarInput.value}&type=movie`)
        const data = await response.json()
        const searchArr = await data.Search

        if (searchArr) {
            searchArrIds = []
            dataArr = []
            searchArr.forEach(el => searchArrIds.push(el.imdbID))
            searchArrIds.map(el => {
                fetch(`http://www.omdbapi.com/?apikey=${apiKey}&i=${el}&type=movie`)
                    .then(res => res.json())
                    .then(data => {
                        dataArr.push(data)
                        render()

                    })
            })
        } else {
            throw new Error("Unable to find what you’re looking for. Please try another search.");

        }
    } catch (error) {
        console.error(error);
        dataSection.textContent = "Unable to find what you’re looking for. Please try another search."

    }
}

function handleAddBtnClick(id) {

    const targetItemObj = dataArr.filter(item => {
        return item.imdbID === id
    })[0]

    console.log(targetItemObj);



    if (!targetItemObj) {
        console.log("Target item object not found in dataArr.");

    } else {
        const itemIndex = watchListArr.findIndex(item => item.imdbID === id)

        if (itemIndex === -1) {
            watchListArr.push(targetItemObj)


        } else {
            watchListArr.splice(itemIndex, 1)
            console.log("Removed from watch list:", watchListArr);

        }

        localStorage.setItem("watchlist", JSON.stringify(watchListArr))
        renderWatchList()

    }



}

function getFeedHtml(arr) {

    return arr.map(movie =>

        `<div class="item-container">
                <div class="movie flex align-center">
                    <img src="${movie.Poster}" >
                    <div class="details">
                        <div class="details-head flex">
                            <h2>${movie.Title}</h2>
                            <img src="assets/star.svg" />
                            <span>${movie.Ratings[0].Value.substr(0, 3)}</span>
                        </div>
                        <div class="details-details flex">
                            <span>${movie.Runtime}</span>
                            <span>${movie.Genre}</span>
                            <button class="add-btn flex align-center" data-add="${movie.imdbID}">
                                <img src="assets/plus-w.svg" />Watchlist
                            </button>
                        </div>
                        
                        <p>${movie.Plot.length > 150 ? movie.Plot.substring(0, 100) + '...Read more' : movie.Plot}</p>
                        
                    </div>
                </div>
              </div>
            `
    ).join("")



}

function render() {
    dataSection.classList.toggle("list", "empty-section")
    dataSection.innerHTML = getFeedHtml(dataArr)
}

function renderWatchList() {

    if (watchListArr.length > 0) {
        watchlistDataSection.innerHTML = getFeedHtml(watchListArr)
    }

}

// console.log(localStorage.getItem('watchList'));

