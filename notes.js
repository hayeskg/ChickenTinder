// for React app deployment on Heroku integration
//
// const path = require('path');

// if (process.env.NODE_ENV === 'production'){
//   app.use(express.static('client/build'));

//   app.get('*', (req, res)=>{
//     res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
//   })
// }
// add this script to package.json
// "heroku-postbuild": "cd client && npm install && npm run build"
// "engines":{
//   "node": "14.4.0"
// }
// Procfile web: npm start
