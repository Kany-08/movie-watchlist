const apiKey = import.meta.env.VITE_API_KEY
let dataArr = []
let watchListArr = JSON.parse(localStorage.getItem('watchlist')) || []
const searchBarInput = document.getElementById("search-bar-input")
const dataSection = document.getElementById("data-section")

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
        const searchArr = data.Search

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

    if (targetItemObj) {
        document.querySelector(`[data-add="${id}"]`).querySelector('i').classList.toggle('fa-check', 'fa-plus')

        const existingItem = watchListArr.find(item => item.imdbID === id)
        if (!existingItem) {
            watchListArr.push(targetItemObj)
            localStorage.setItem('watchlist', JSON.stringify(watchListArr))

        } else {
            console.log(existingItem + ' is already exist');

        }

    } else {
        console.log('Target item is not found');
    }
}

function getFeedHtml() {

    return dataArr.map(movie =>
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
                                <i class="fa-solid fa-plus"></i>Watchlist
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
    dataSection.innerHTML = getFeedHtml()
}





