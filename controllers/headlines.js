// Bring in our scrape script and makeDate scripts
var scrape = require("../scripts/scrape");
var makeDate = require("../scripts/date");

//Bring in the Headline and Note mongoose models
var Headline = require("../models/Headline");

module.exports = {
    fetch: function(cb) {
        scrape(function(data) {
            var articles = data;
            for (var i = 0; i < articles.length; i++) {
                articles[i].date = makeDate();
                articles[i].saved = false;
            }
            Headline.collection.insertMany(articles, { orderd: false }, function(err, docs) {
                cb(err, docs);
            });
        });
    },
    // to delete a headline
    delete: function(query, cb) {
        Headline.remove(query, cb);
    },

    // to get a headline
    get: function(query, cb) {
        Headline.find(query)
            .sort({
                _id: -1
            })
            .exec(function(err, doc) {
                cb(doc);
            });
    },

    // to update a headline
    update: function(query, cb) {
        Headline.update({ _id: query._id }, {
            $set: query
        }, {}, cb);
    }

};
