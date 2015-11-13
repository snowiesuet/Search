'use strict'
function onChangeTest() {
    $('#searchResults').html('')
    let with_people = document.getElementsByName('with_people')[0].checked
    let searchText =  document.getElementsByName('searchBox')[0].value
    $.ajax({
      url: "https://api.viki.io/v4/search.json?c="+ searchText +"&per_page=5&with_people=" +with_people+ "&app=100266a&t=1440586215",
    }).done(data => {
      let episodes = ''
      data.forEach(name => {
        episodes = (name.e ? ('Episodes: ' + name.e) : '')
        let searchTemplate = '<div class="searchTemplate">'
        + name.tt + '<div id="searchDetails"><img src="'+name.i+'"/>Type: ' +name.t +'<br>' + episodes  +'</div>  </div>'
        $('#searchResults').append(searchTemplate)
      })
    })
}
