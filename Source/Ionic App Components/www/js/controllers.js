angular.module('assistantcoach',[])

.controller('panel-controller',function($scope){
    
    $scope.assignUserName = function(value){
        $scope.parentUserName = value;
    }
    
    $scope.getTemplate = function(){
        return $scope.template;
    }
    
    $scope.assignChat = function(){
        $scope.template = "templates/Chat.html";
    }
    
    $scope.assignLogin = function(){
        $scope.template = "templates/login.html";
    }
    
    $scope.assignUpdate = function(){
        $scope.template = "templates/PlayerUpdate.html";
    }
    
    $scope.assignPlayerRegister = function(){
        $scope.template = "templates/PlayerRegister.html";
    }
    
    $scope.assignPlayerMain = function(){
        $scope.template = "templates/PlayerMain.html";
    }
    
    $scope.assignParentRegister = function(){
        $scope.template = "templates/ParentRegister.html";
    }
    
    $scope.assignParentMain = function(){
        $scope.template = "templates/ParentMain.html";
    }
    
    $scope.assignTeam = function(){
        $scope.template = "templates/TeamView.html";
    }
    
})

.controller('PlayerRegister-controller',function($scope){
    
    $scope.submit = function (){
        fname = $scope.fname;
        surname = $scope.surname;
        username = $scope.username;
        password = $scope.password;
        email = $scope.email;
        
        fbdb.ref('/players/'+email).once('value',function(snapshot){
           exists = (snapshot.val() !== null);
           
           if(exists){
            alert('User ID already exists');
            return;
           } else {
               fbdb.ref('players/'+username).set({
                   'fname' : fname,
                   'sname' : surname,
                   'username' : username,
                   'password' : password,
                   'email' : email
               });
               
               alert('You are registered successfully');
           }
        });
    
    };
})

.controller('Login-controller',function($scope){
  
    $scope.signup = function(){
        $scope.combo = $('#comboTypes').val();
        
        if($scope.combo == "Player"){
            $scope.assignPlayerRegister();
        }
        if($scope.combo == "Parent"){
            $scope.assignParentRegister();
        }
    }
    
    $scope.submit = function(){
        $scope.combo = $('#comboTypes').val();
        if($scope.combo == "Player"){
            fbdb.ref('/players/' + $scope.username ).once('value',function(snapshot){
        
            exists = snapshot.val() !== null;
            
            if(exists){
             
                if(snapshot.val().password == $scope.password){      
                    
                    $scope.assignPlayerMain();
                    $scope.parentUserName = $scope.assignUserName($scope.username);
                    $scope.$apply();
                } 
                else
                {
                    alert('password not correct');
                    $scope.assignLogin();
                }
            } else {
                alert("username doesn\'t exists");
            }         
            });
        }
        if($scope.combo == "Parent"){
            $scope.assignParentMain();
        }
        if($scope.combo == "Coach"){
            
        }
        
        
        
    }
    
})

.controller('PlayerMain-controller',function($scope){
    
    $scope.submit = function(){
        
        
    }
    
})

.controller('Team-controller',function($scope){
    
    fbdb.ref('team').on('value',function(snapshot){
        $scope.leftField = snapshot.val().leftField;
        $scope.centerField = snapshot.val().centerField;
        $scope.rightField = snapshot.val().rightField;
        $scope.shortStop = snapshot.val().shortStop;
        $scope.secondBase = snapshot.val().secondBase;
        $scope.thirdBase = snapshot.val().thirdBase;
        $scope.pitcher = snapshot.val().pitcher;
        $scope.firstBase = snapshot.val().firstBase;
        $scope.catcher = snapshot.val().catcher;
        $scope.$apply();
        console.log('controller Called');
    });
    
})

.controller('ParentMain-controller',function($scope){
    
    $scope.submit = function(){
        
        $scope.assignTeam();
        
    }
    
})

.controller('PlayerUpdate-controller',function($scope){
    fbdb.ref('/players/'+$scope.parentUserName).once('value',function(snapshot){
            $scope.fname =  snapshot.val().fname;
            $scope.surname = snapshot.val().sname;
            $scope.email = snapshot.val().email;
            $scope.password = snapshot.val().password;
            $scope.$apply();
        }); 
    
    $scope.submit = function(){
        
        fbdb.ref('/players/'+$scope.parentUserName).set({
            
                   'fname'    : $scope.fname,
                   'sname'    : $scope.surname,
                   'username' : $scope.parentUserName,
                   'password' : $scope.password,
                   'email'    : $scope.email
                   
        });
        
        alert('Info Updated Successfully');
        
    }
    
})

.controller('ParentRegister-controller',function($scope){
    
    fbdb.ref('/players').once('value',function(snapshot){
            
            arr = [];
            for(x in snapshot.val()){
                arr.push(snapshot.val()[x]);
            }
            $scope.playersArr = arr;
            $scope.$apply();

        }); 
    
    $scope.submit = function(){
        
        fbdb.ref('/parents/'+$scope.players).once('value',function(snapshot){
            exists = snapshot.val() !== null;

            if(exists){
                alert('Parent with the player already exists');
                return;
            } else {
                fbdb.ref('/parents/'+$scope.players).set({
            
                   'fname'    : $scope.fname,
                   'sname'    : $scope.surname,
                   'password' : $scope.password,
                   'email'    : $scope.email
                   
                });
                
                alert('Parent added successfully');
            }
        });
        
        
    }
    
})