var express = require('express');
var router = express.Router();

var Kehadiran = require('../models/kehadiran');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/kehadiran', function(req, res, next) {
	if(!req.body.nama) {
	  return res.status(400).send({
      message: "Nama tidak boleh kosong"
	  });
	}

	if(!req.body.nomor) {
	  return res.status(400).send({
      message: "Nomor tidak boleh kosong"
	  });
	}

	if(!req.body.hadir) {
	  return res.status(400).send({
      message: "Kehadiran tidak boleh kosong"
	  });
	}

	if(!req.body.pesan) {
	  return res.status(400).send({
      message: "Pesan tidak boleh kosong"
	  });
	}

	var row = {
		nama: req.body.nama,
		nomor: req.body.nomor,
		hadir: req.body.hadir,
		pesan: req.body.pesan
	};

	var newRow = new Kehadiran(row);
	newRow.save().then(data => {
		res.json({ error: false, result: data });
	}).catch(err => {
		res.json({ error: true, result: err });
	});
});

router.get('/kehadiran', function(req, res, next) {
	Kehadiran.find().then(rows => {
		res.json({ error: false, result: rows });
	}).catch(err => {
		res.json({ error: true, result: err });
	});
});

router.get('/kehadiran/:_id', function(req, res, next) {
	Kehadiran.findById(req.params._id)
		.then(note => {
      if(!note) {
        return res.status(404).send({
          message: "Row not found with id " + req.params._id
        });            
      }
      res.json({ error: false, result: note });
    }).catch(err => {
      if(err.kind === 'ObjectId') {
        return res.status(404).send({
          message: "Row not found with id " + req.params._id
        });                
      }
      return res.status(500).send({
        message: "Error retrieving row with id " + req.params._id
      });
    });
});

router.delete('/kehadiran/:_id', function(req, res, next) {
	if(!req.params._id) {
	  return res.status(400).send({
      message: "ID tidak boleh kosong"
	  });
	}

	Kehadiran.findByIdAndRemove(req.params._id)
		.then(note => {
      if(!note) {
        return res.status(404).send({
          message: "Row not found with id " + req.params._id
        });
      }

      res.send({message: "Row deleted successfully!"});
    })
    .catch(err => {
      if(err.kind === 'ObjectId' || err.name === 'NotFound') {
        return res.status(404).send({
          message: "Row not found with id " + req.params._id
        });                
      }

      return res.status(500).send({
        message: "Could not delete row with id " + req.params._id
      });
    });
})

module.exports = router;
