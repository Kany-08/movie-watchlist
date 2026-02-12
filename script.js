const apiKey = import.meta.env.VITE_API_KEY
const searchBarInput = document.getElementById("search-bar-input")
const dataSection = document.getElementById("data-section")
let feedHtml
let dataSearch

document.addEventListener('click', (e) => {
    if (e.target.id === "search-btn") {
        handleSearchBtnClick()
    }
    // if (e.target.dataset.add) {
    //     handleAddBtnClick(e.target.dataset.add)
    // }
})

searchBarInput.addEventListener('input', async () => {
    const response = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&s=${searchBarInput.value}&type=movie`)
    const data = await response.json()
    dataSearch = data.Search
    console.log(dataSearch);
})
// async function handleSearchBtnClick() {
//     try {
//         // let searchArrIds = []

//         // console.log(data);

//         // console.log(searchArr);

//         searchArr.forEach(async (element) => {
//             const res = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&i=${element.imdbID}&type=data`)
//             const data = await res.json()
//             console.log(data);


//             feedHtml += `<div class="item-container">
//                 <div class="data flex align-center">
//                     <img src="${data.Poster}" >
//                     <div class="details">
//                         <div class="details-head flex">
//                             <h2>${data.Title}</h2>
//                             <img src="assets/star.svg" />
//                             <span>${data.Ratings[0].Value.substr(0, 3)}</span>
//                         </div>
//                         <div class="details-details flex">
//                             <span>${data.Runtime}</span>
//                             <span>${data.Genre}</span>
//                             <button class="add-btn flex align-center" data-add="${data.imdbID}">
//                                 <img src="assets/plus-w.svg" />Watchlist
//                             </button>
//                         </div>

//                         <p>${data.Plot.length > 150 ? data.Plot.substring(0, 100) + '...Read more' : data.Plot}</p>

//                     </div>
//                 </div>
//               </div>
//             `


//         });

//         dataSection.innerHTML = feedHtml

//         // if (searchArr) {
//         //     searchArrIds = []
//         //     dataArr = []
//         //     searchArr.forEach(el => searchArrIds.push(el.imdbID))
//         //     searchArrIds.map(el => {
//         //         fetch(`http://www.omdbapi.com/?apikey=${apiKey}&i=${el}&type=data`)
//         //             .then(res => res.json())
//         //             .then(data => {
//         //                 dataArr.push(data)
//         //                 render()

//         //             })
//         //     })
//         // } else {
//         //     throw new Error("Unable to find what you’re looking for. Please try another search.");

//         // }
//     } catch (error) {
//         console.error(error);
//         dataSection.textContent = "Unable to find what you’re looking for. Please try another search."
//     }
// }

function handleSearchBtnClick() {
    if (dataSearch) {
        dataSearch.forEach(async (element) => {
            const response = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&i=${element.imdbID}`)
            const data = await response.json()
            console.log(data);

            if (data) {
                data.map(movie => {
                    feedHtml += `<div class="item-container">
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
                })

                dataSection.classList.toggle("list", "empty-section")
                dataSection.innerHTML = feedHtml
            }

        });
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

function render(arr) {
    dataSection.classList.toggle("list", "empty-section")
    dataSection.innerHTML = getFeedHtml(arr)
}

