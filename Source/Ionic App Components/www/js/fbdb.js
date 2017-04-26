fbdb = null;

function SetupFirebase(){
    // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCEtM-pHkDnPGxUWW9EJ_TQjN62t-dbHvI",
    authDomain: "assistantcoach-23a21.firebaseapp.com",
    databaseURL: "https://assistantcoach-23a21.firebaseio.com",
    storageBucket: "assistantcoach-23a21.appspot.com",
    messagingSenderId: "102648024626"
  };

  conn = firebase.initializeApp(config);
  return conn;
}

function CreateFBObject(){

    init = SetupFirebase();
    connection = init.database();
    return connection;
}

fbdb = CreateFBObject();

// fbdb.ref('/team/field').set({
//   leftField: 'player',
//   centerField: 'player',
//   rightField: 'player',
//   shortStop: 'player',
//   secondBase: 'player',
//   thirdBase: 'player',
//   pitcher: 'player',
//   firstBase: 'player',
//   catcher: 'player',
// });
//
//


// fbdb.ref('/team/bat').set({
//   _1: 'player',
//   _2: 'player',
//   _3: 'player',
//   _4: 'player',
//   _5: 'player',
//   _6: 'player',
//   _7: 'player',
//   _8: 'player',
//   _9: 'player',
// });
//
//
// players = ["ahmad","bilal","joshua","mark","talha","aleem","george","saad","jawad"];
//
// $(players).each(function(index,data){
//   fbdb.ref('/players/'+data).set({
//
//       email:data,
//       fname:data,
//       password:data,
//       sname:data,
//       fname:data
//
//   });
// });
