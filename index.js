'use strict'
function onChangeTest() {
    let with_people = document.getElementsByName('with_people')[0].checked
    let searchText =  document.getElementsByName('searchBox')[0].value
    console.log(with_people)
    $.ajax({
      url: "https://api.viki.io/v4/search.json?c="+ searchText +"&per_page=5&with_people=" +with_people+ "&app=100266a&t=1440586215",
    }).done(data => {
      console.log(data)
      console.log(name.e)
      let episodes = ''
      data.forEach(name => {
        if (name.e) {
          let episodes = 'Episodes:' + name.e
        }
        console.log(name.e, episodes)
        let searchTemplate = '<div class="searchTemplate">'
        + name.tt + '<div id="searchDetails"><img src="'+name.i+'"/>Type: ' +name.t +'' + episodes  +'</div>  </div>'
        $('#searchResults').append(searchTemplate)
      })
    })
}
