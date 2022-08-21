const User = require("./User");
const Link = require("./Link");

let db ={};

User.hasMany(Link, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});
Link.belongsTo(User);

db.user = User;
db.link = Link;

module.exports = db;