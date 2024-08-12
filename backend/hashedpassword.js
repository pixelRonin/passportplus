// this lets us generate our admins hashed password so we can, write it in 
// mongodb
const bcrypt = require('bcrypt');
const saltRounds = 10; // This should match your app's salt rounds

const password = '@Adm1n';

bcrypt.hash(password, saltRounds, function(err, hash) {
  if (err) throw err;
  console.log('Hashed password:', hash);
});
