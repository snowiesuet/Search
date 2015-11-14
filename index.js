'use strict'

function onChangeTest() {
    $('#searchResults').html('')
    const withPeople = document.getElementsByName('withPeople')[0].checked
    const searchText =  document.getElementsByName('searchBox')[0].value
    const timeStamp = Date.now()
    $.ajax({
      url: `https://api.viki.io/v4/search.json?c=${searchText}&per_page=5&with_people=${withPeople}&app=100266a&t=${timeStamp}`,
    }).done(dataset => {
      if (dataset.length > 0) {
        dataset.forEach(data => {
          let episodes = ''
          let available = data.blocked ? 'No' : 'Yes'
          let country = data.oc ? data.oc : ''
          episodes = data.e ? (`(${data.e} episodes)`) : ''
          const searchTemplate =
          `<div class="searchTemplate">
            ${data.tt}
            <div id="searchDetails">
              <img src=${data.i}/>
            <div class="searchDesc">
            Type: ${data.t} ${episodes}
            <br> Available in your region: ${available}
            <br> Country of Origin: ${country}
          </div></div></div>`
          $('#searchResults').append(searchTemplate)
        })
      }
      else {
        $('#searchResults').html(`<div class="searchTemplate">No data available.</div>`)
      }

    })
}
