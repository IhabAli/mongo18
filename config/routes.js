// Server routes
//==============

// Bring in the scrape function from our scripts directory
var scrape = require("../scripts/scrape");

// Bring Headlines and notes from the controller
var headlinescontroller = require("../controllers/headlines");
var notesController = require("../controllers/notes");

module.exports = function(router) {
	// This route renders the homepage
    router.get('/', function(req, res) {
        res.render("home");
    });
    // This route renders the saved handlebars page
    router.get("/saved", function(req, res) {
        res.render("saved");
    });

    router.get("/api/fetch", function(req, res) {
        headlinescontroller.fetch(function(err, docs) {
            if (!docs || docs.insertedCount === 0) {
                res.json({
                    message: "No articles today, maybe tomorrow!"
                });
            } else {
                res.json({
                    message: "Added " + docs.insertedCount + " new articles"
                });
            }
        });
    });

     router.get("/api/headlines", function(req, res) {
        var query = {};
        if (req.query.saved) {
            query = req.query;
        }
        headlinescontroller.get(query, function(data) {
            res.json(data);
        });
    });

     router.delete("/api/headlines/:id", function(err, data) {
        var query = {};
        query._id = req.params.id;
        headlinescontroller.delete(query, function(err, data) {

            res.json(data);
        });
    });
    
    router.patch("/api/headlines", function(req, res) {
        headlinescontroller.update(req.body, function(err, data) {
            res.jspn(data);
        });
    });

      router.get("/api/notes/:headline_id", function(req, res) {
      	var query = {};
        if (req.params.headline_id) {
            query._id = req.params.headline_id
        }

        notesController.get(query, function(err, data) {
            res.json(data);
        });
    });

      router.delete("api/notes/:id", function(req, res) {
        var query = {};
        query._id = req.params.id;
        notesController.delete(query, function(err, data) {
            res.json(data);
        });
    });

      router.post("/api/notes", function(req, res) {
        notesController.save(req.body, function(data) {
            res.json(data);
        });
    });

}