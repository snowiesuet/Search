'use strict'
function onChangeTest() {
    let searchTemplate = ''
    let with_people = document.getElementsByName('with_people')[0].checked
    let searchText =  document.getElementsByName('searchBox')[0].value
    console.log(with_people)
    $.ajax({
      url: "https://api.viki.io/v4/search.json?c="+ searchText +"&per_page=5&with_people=" +with_people+ "&app=100266a&t=1440586215",
    }).done(data => {
      console.log(data)
      let episodes = ''
      data.forEach(name => {
        episodes = (name.e ? ('Episodes: ' + name.e) : '')
        console.log(episodes)
        searchTemplate = '<div class="searchTemplate">'
        + name.tt + '<div id="searchDetails"><img src="'+name.i+'"/>Type: ' +name.t +'<br>' + episodes  +'</div>  </div>'
        $('#searchResults').append(searchTemplate)
      })
    })
}
