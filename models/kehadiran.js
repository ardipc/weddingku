const mongoose = require('mongoose');

const KehadiranSchema = mongoose.Schema({
  nama: String,
  nomor: String,
  hadir: Boolean,
  pesan: String
}, {
  timestamps: true
});

module.exports = mongoose.model('kehadiran', KehadiranSchema);