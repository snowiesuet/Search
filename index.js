'use strict'

function onBlur () {
  console.log('hello ㅠㅠ')
  $('#searchResults').hide()
}

const searchBox = document.getElementsByName('searchBox')[0]
searchBox.onblur = onBlur

function onChange () {
    //clear the search results from previous search
    $('#searchResults').html('')
    const withPeople = document.getElementById('withPeople').checked
    const searchText =  document.getElementsByName('searchBox')[0].value
    const timeStamp = Date.now()
    $.ajax({
      url: `https://api.viki.io/v4/search.json?c=${searchText}&per_page=5&with_people=${withPeople}&app=100266a&t=${timeStamp}`,
    }).done(dataset => {
      if (dataset.length > 0) {
        dataset.forEach(data => {
          //only display data when available
          const available = data.blocked ? 'No' : 'Yes'
          const availableText = data.t === 'person' ? '' : `Available in your region: ${available}`
          const country = data.oc ? ` Country of Origin: ${(data.oc).toUpperCase()}` : ''
          const episodes = data.e ? `(${data.e} episodes)` : ''
          const img = data.t === 'person' ? 'https://0.viki.io/pr/18231pr/86dc9e0393.jpg?x=b&a=0x0&s=780x436&q=h&e=t&f=t&cb=1' : data.i
          //the search template for every row
          const searchTemplate =
          `<div class="searchTemplate">
            ${data.tt}
            <div id="searchDetails">
              <img src=${img}/>
            <div class="searchDesc">
            Type: ${data.t} ${episodes}
            <br> ${availableText}
            <br> ${country}
          </div></div></div>`
          $('#searchResults').append(searchTemplate)
        })
      }
      else {
        //if no data, display this!
        $('#searchResults').html(`<div class="searchTemplate">No data available.</div>`)
      }
    })
}
