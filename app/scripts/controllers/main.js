'use strict';

angular.module('wikipediaViewerApp')
  .controller('MainCtrl', function ($http) {


    var self = this;



    self.searchArticle = function(searchTerm){
      self.entries = [];
      var api = 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=';
      var cb = '&callback=JSON_CALLBACK';
      var pageUrl = 'https://en.wikipedia.org/?curid=';

      $http.jsonp(api + searchTerm + cb)
      .success(function(data){
        for (var key in data.query.pages) {
          var page = data.query.pages[key];
            self.entries.push({
              title: page.title,
              description: page.extract,
              url: pageUrl + page.pageid,
              thumbnail: page.thumbnail
            });
        }
        self.searchTerm = searchTerm;

      }).error(function(data){
        // TODO - handle error
      });

    };



  });
