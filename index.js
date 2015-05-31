var request = require('request')

// Google Art Project url
var artProjectUrl = 'https://www.google.com/culturalinstitute/project/art-project'

// Get random number between 0 and length
function getRandomItemKey(length) {
  return parseInt(Math.random() * length, 10)
}

// Get random image
module.exports = getRandomImage = function(callback) {
  // Get source of Google Art Project home page
  request(artProjectUrl, function(error, response, body) {

    if (!error & response.statusCode === 200) {

      // Result object
      var result = {}

      // Google store all data as an array in `gciGlobal` variable, so we are 
      // getting it and using `eval` to get a real array instead of scraping 
      // whole pagel
      var res = body.split('<script type="text/javascript">gciGlobal')
      res = res[1].split('</script>')[0]

      var gciGlobal = []
      gciGlobal['config'] = []

      // Yes, eval is evil, I know...
      // But this was the fastest solution
      eval('gciGlobal' + res)

      // `gciGlobal` array is a bit strange, so there's a lot of hardcoded 
      // values in a code below. I'm not sure what's the exact structure and 
      // but this below seems to work all the time with a current website 
      // structure.
      // In case they chage anything this module will be broken
      var obj = gciGlobal['config']['channel'].pop()

      var key = Object.keys(obj)[0]

      // Get a random image from an array
      var n = getRandomItemKey(obj[key][5].length)
      
      var data = obj[key][5][n][1][0],
          l    = data.length,
          i    = 0

      // Image URL, `s1200` returns a bigger image, it seems that it represents 
      // 1200px, but that's the only value I find so far.
      result.image = obj[key][5][n][5] + '=s1200'

      // Loop through attributes and store title, description etc.
      for (; i < l; i++) {
        var d = data[i]

        if (d[1] === 'title') {
          var title = d.pop()[0][0][0]
          result.title = title
          result.link = 'https://www.google.com/culturalinstitute/browse/' + encodeURIComponent(title)
        }

        else if (d[1] === 'description') {
          result.description = d.pop()[0][0][0]
        }

        else if (d[1] === 'display_date') {
          result.date = d.pop()[0]
        }

        // There is a few different possible values here, ie. `creator` and 
        // `creator.artist`
        else if (d[1].indexOf('creator') === 0) {
          result.creator = d.pop()[0][0][0]
        }

        // Same as above, `location`, `location.locationId`, `location.mint`...
        else if (d[1].indexOf('location') === 0) {
          result.location = d.pop().pop()[0][0][0]
        }
      }

      // Then just return callback
      callback(null, result)
    }

    // In case of an error return error
    else if (error) {
      callback(error)
    }

    // And return error = true in case of something weird happens
    else {
      callback(true)
    }
  })
}
