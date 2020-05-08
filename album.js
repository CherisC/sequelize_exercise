const Sequelize = require('sequelize');
const sequelize = new Sequelize('music_database', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'postgres'
});

const prompt = require('prompt-promise');

let res = [];

const Model = Sequelize.Model;

class album extends Model {}

album.init({
    // Column definition!
    albumName: {
        type: Sequelize.STRING,
        allowNull: false
      }, //... etc
}, {
  // Configuration object! 
  sequelize,
  modelName: 'album',
  tableName: 'album',
  timestamps: false //<-- right here
});

prompt('Enter album artist_id: \n')
    .then(function albumArtist(val) {
        res.push(val);
        return prompt('Enter album year: \n');
    })
    .then(function albumYear(value) {
        res.push(value);
        return prompt('Enter album name: \n');
    })

    .then(function(albumName) {
        res.push(albumName);
        return db.result('INSERT INTO album (artist_id, year, album_name) VALUES ($1, $2, $3) RETURNING artist_id',
        res) 
    })

    .then(function(artist_id) {
        console.log(artist_id);
        pgp.end();     
    })

    .catch(function rejected(err) {
        console.log('error:', err.stack);
        prompt.finish();

    });





album
.findOrCreate({
    where: {album_id: 1 }, 
    defaults: {album_name: 'Off The Wall', release_year: '1979'}})
.then(([album, created]) => {
  console.log(album.get({
    plain: true
  }))

  
  console.log(created)
});