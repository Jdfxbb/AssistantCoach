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

//fbdb.ref('/team').set({
//   leftField: 'player',
//   centerField: 'player',
//   rightField: 'player',
//   shortStop: 'player',
//   secondBase: 'player',
//   thirdBase: 'player',
//   pitcher: 'player',
//   firstBase: 'player',
//   catcher: 'player',
//});