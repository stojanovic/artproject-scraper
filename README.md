[![Build Status](https://travis-ci.org/stojanovic/artproject-scraper.svg)](https://travis-ci.org/stojanovic/artproject-scraper) [![npm version](https://badge.fury.io/js/artproject-scraper.svg)](http://badge.fury.io/js/artproject-scraper)

# ArtProject Scraper

Get random art and metadata from Google Art Project.

**Important:**  
This is experimental and extremely dependable on current layout of Google Art 
Project website. Don't use it for anything important since it can be broken in 
future.

## Why

I wasn't able to find a simple API that returns painting and some meta data, but
I found Google Art Project that has exactly what I want, except there was no API.

## Usage

```
  
var scraper = require('artproject-scraper')

scraper(err, function(randomArt) {
  if (!err)
    console.log(randomArt)

    // Output:
    //
    // { 
    //   image: 'http://lh4.ggpht.com/cLJpANVeHxbEdjmRMUu7E0YBYdbGoRVd87igKPdXbgvKt69qWoWg_7-6GE9U=s1200',
    //   title: 'Portrait of Nini Lopez',
    //   link: 'https://www.google.com/culturalinstitute/browse/Portrait%20of%20Nini%20Lopez',
    //   description: 'Nini Lopez first appeared in the work of Auguste Renoir (1841–1919) in La Loge (The Theatre Box), painted in 1874. The young woman from Montmartre, cruelly nicknamed Nini-Gueule-de-Raie, or "fish face", is shown alongside the artist\'s brother. Although the artwork was immediately purchased by the art dealer "le Père Martin", Renoir, like many of his Impressionist friends, was experiencing serious financial difficulty at the time. In the spring of',
    //   creator: 'Pierre-Auguste Renoir',
    //   date: '1876'
    // }

})

```

## Test

`npm test` or `tap test/*.js`
