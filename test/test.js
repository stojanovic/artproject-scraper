'use strict'

var test    = require('tap').test
var scraper = require('../index')

function ValidURL(str) {
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.=~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locater
  if(!pattern.test(str)) {
    return false
  } else {
    return true
  }
}

test('Test if request works', function(t) {
  t.plan(3)

  scraper(function(err, art) {
    t.notOk(err, 'No errors.')
    t.ok(art.title != null, 'Title exists.')
    t.ok(ValidURL(art.image), 'Image URL is valid.')
  })
})
