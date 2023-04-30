var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://musoliman14:wZ98qneVk1yMd8YL@sobek.yibtuka.mongodb.net/test');
var conn = mongoose.connection;
conn.on('connected', function() {
    console.log('database is connected successfully');
});
conn.on('disconnected',function(){
    console.log('database is disconnected successfully');
})
conn.on('error', console.error.bind(console, 'connection error:'));
module.exports = conn;