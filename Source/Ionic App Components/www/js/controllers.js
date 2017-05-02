

angular.module('assistantcoach',[])

.controller('panel-controller',function($scope){

   $scope.updateField = function(obj){
      var parent = $(obj.target).parent();
      var index = $(parent).attr('kParam');
      var children = $(parent).children();

      if(parent.find("select")[0].selectedIndex == 0){

        fbdb.ref('team/field/'+index).set("");

        console.log('bilal');

        fbdb.ref('players').once('value',function(snapshot){
          // console.log('bilal');
          playersArr = snapshot.val();
          // console.log(playersArr);
          xarr = {};
          $scope.availableArr = [""];
          fbdb.ref('team/field').once('value').then(function(snappy){
            $.each(snappy.val(),function(key,value){
              // console.log(snappy.val());
              // console.log(typeof value);
              // console.log(playersArr[value]);
              if(playersArr[value]){
                if(playersArr[value].fname == value){
                  xarr[value] = playersArr[value];
                }
              }
            });

            // console.log(xarr);

            $.each(playersArr,function(i,obj){

              if(xarr[obj.fname] == undefined){
                $scope.availableArr.push(obj);
              }
            });

            $scope.$evalAsync();
          });
        });


      } else {
        fbdb.ref('team/field/'+index).set(parent.find("select")[0].value);


        fbdb.ref('players').once('value',function(snapshot){
          // console.log(typeof snapshot.val());
          playersArr = snapshot.val();
          // console.log(playersArr);
          xarr = {};
          $scope.availableArr = [""];
          fbdb.ref('team/field').once('value').then(function(snappy){
            $.each(snappy.val(),function(key,value){
              // console.log(typeof value);
              // console.log(playersArr[value]);
              if(playersArr[value]){
                if(playersArr[value].fname == value){
                  xarr[value] = playersArr[value];
                }
              }
            });

            $.each(playersArr,function(i,obj){

              if(xarr[obj.fname] == undefined){
                $scope.availableArr.push(obj);
              }
            });

            $scope.$evalAsync();
          });
        });

      }
    };

    xclone = function clone(obj) {
      if (null == obj || "object" != typeof obj) return obj;
      var copy = obj.constructor();
      for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
      }
      return copy;
    };

    fbdb.ref('players').on('value',function(snapshot){
      // console.log(typeof snapshot.val());
      playersArr = snapshot.val();
      // console.log(playersArr);
      xarr = {};
      $scope.availableArr = [""];
        fbdb.ref('team/field').once('value').then(function(snappy){
          $.each(snappy.val(),function(key,value){
            // console.log(typeof value);
            // console.log(playersArr[value]);
            if(playersArr[value]){
              if(playersArr[value].fname == value){
                xarr[value] = playersArr[value];
              }
            }
          });

          $.each(playersArr,function(i,obj){

            if(xarr[obj.fname] == undefined){
              $scope.availableArr.push(obj);
            }
          });
        });



      // console.log(playersArr);
      // console.log(xarr);

      // $.each(arr,function(index,value){
      //   if(playersArr[value] != undefined){
      //
      //   }
      // });
      //



      // console.log(arr);
      // console.log($scope.availableArr);
    });

    $scope.assignUserName = function(value){
        $scope.parentUserName = value;
    }

    $scope.getTemplate = function(){
        return $scope.template;
    }

    $scope.assignChat = function(){
        $scope.template = "templates/Chat.html";
        $scope.$evalAsync();
    }

    $scope.assignLogin = function(){
        $scope.template = "templates/login.html";
        $scope.$evalAsync();
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

    $scope.assignParentUpdate = function(){
      $scope.template = "templates/ParentUpdate.html";
    }

    $scope.assignTeam = function(){
      $scope.template = "templates/TeamView.html";
      $scope.$evalAsync();
    }

    $scope.assignTeamParent = function(){
      $scope.template = "templates/TeamViewParent.html";
    }

    $scope.assignCoachRegister = function(){
      $scope.template = "templates/CoachRegister.html";
    }

    $scope.assignTeamCoach = function(){
      $scope.template = "templates/TeamViewCoach.html";
    }

    $scope.assignUpdateCoach = function(){
      $scope.template = "templates/CoachUpdate.html";
    }

  $scope.assignCoachMain = function(){
    $scope.template = "templates/CoachMain.html";
  }

  $scope.assignChatCoach = function(){
    $scope.template = "templates/ChatCoach.html";
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

    fbdb.ref('command').set('');
    fbdb.ref('command').on('value',function(snapshot){

        if($scope.combo == "Coach"){
            switch(snapshot.val()){
                case 'chat':
                    $scope.assignChat();
                    $scope.$evalAsync();
                    console.log('chat');
                    fbdb.ref('command').set('');
                    break;
                case 'team':
                    $scope.assignTeam();
                    $scope.$evalAsync();
                    console.log('team');
                    fbdb.ref('command').set('');
                    break;
                case 'main':
                    $scope.assignLogin();
                    $scope.$evalAsync();
                    console.log('team');
                    fbdb.ref('command').set('');
                    break;
            }
        }
    });

    $scope.signup = function(){
        $scope.combo = $('#comboTypes').val();

        if($scope.combo == "Player"){
            $scope.assignPlayerRegister();
        }
      if($scope.combo == "Parent"){
        $scope.assignParentRegister();
      }
      if($scope.combo == "Coach"){
        $scope.assignCoachRegister();
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
                    $scope.$evalAsync();
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
          fbdb.ref('/parents/' + $scope.username ).once('value',function(snapshot){

            exists = snapshot.val() !== null;

            if(exists){

              if(snapshot.val().password == $scope.password){

                $scope.assignParentMain();
                $scope.parentUserName = $scope.assignUserName($scope.username);
                $scope.$evalAsync();
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
        if($scope.combo == "Coach"){
          fbdb.ref('/coaches/' + $scope.username ).once('value',function(snapshot){

            exists = snapshot.val() !== null;

            if(exists){

              if(snapshot.val().password == $scope.password){

                $scope.assignCoachMain();
                $scope.parentUserName = $scope.assignUserName("Coach");
                $scope.$evalAsync();
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



    }

})

  .controller('PlayerMain-controller',function($scope){



  })

  .controller('CoachMain-controller',function($scope){



  })

  .controller('Team-controller',function($scope){



    fbdb.ref('location').on('value',function(snapshot){
      $scope.location = snapshot.val();
    });


    fbdb.ref('team/field').on('value',function(snapshot){
      $scope.leftField = snapshot.val().leftField;
      $scope.centerField = snapshot.val().centerField;
      $scope.rightField = snapshot.val().rightField;
      $scope.shortStop = snapshot.val().shortStop;
      $scope.secondBase = snapshot.val().secondBase;
      $scope.thirdBase = snapshot.val().thirdBase;
      $scope.pitcher = snapshot.val().pitcher;
      $scope.firstBase = snapshot.val().firstBase;
      $scope.catcher = snapshot.val().catcher;

      $scope.canvasRender = function(){
        console.log(parseFloat($('#teamCanvas').width() / $scope.location.leftField.x));
        var canvas = document.getElementById('teamCanvas');
        var context = canvas.getContext('2d');
        context.font = "14px solid"
        context.clearRect(0,0,$('#teamCanvas').width(),$('#teamCanvas').height())
        context.fillStyle = '#FFFF00';
        context.fillText($scope.leftField,$scope.location.leftField.x,$scope.location.leftField.y);
        context.fillText($scope.centerField,$scope.location.centerField.x,$scope.location.centerField.y);
        context.fillText($scope.rightField,$scope.location.rightField.x,$scope.location.rightField.y);
        context.fillText($scope.firstBase,$scope.location.firstBase.x,$scope.location.firstBase.y);
        context.fillText($scope.secondBase,$scope.location.secondBase.x,$scope.location.secondBase.y);
        context.fillText($scope.thirdBase,$scope.location.thirdBase.x,$scope.location.thirdBase.y);
        context.fillText($scope.pitcher,$scope.location.pitcher.x,$scope.location.pitcher.y);
        context.fillText($scope.catcher,$scope.location.catcher.x,$scope.location.catcher.y);
        context.fillText($scope.shortStop,$scope.location.shortStop.x,$scope.location.shortStop.y);


        context.fillStyle = '#FF3300';
        context.fillRect($scope.location.leftField.x,$scope.location.leftField.y,5,5);
        context.fillRect($scope.location.centerField.x,$scope.location.centerField.y,5,5);
        context.fillRect($scope.location.rightField.x,$scope.location.rightField.y,5,5);
        context.fillRect($scope.location.firstBase.x,$scope.location.firstBase.y,5,5);
        context.fillRect($scope.location.secondBase.x,$scope.location.secondBase.y,5,5);
        context.fillRect($scope.location.thirdBase.x,$scope.location.thirdBase.y,5,5);
        context.fillRect($scope.location.pitcher.x,$scope.location.pitcher.y,5,5);
        context.fillRect($scope.location.catcher.x,$scope.location.catcher.y,5,5);
        context.fillRect($scope.location.shortStop.x,$scope.location.shortStop.y,5,5);

      };

      $scope.canvasRender();


      $scope.$evalAsync();
      console.log('controller Called');
    });


    fbdb.ref('team/bat').on('value',function(snapshot){
      $scope._1 = snapshot.val()._1;
      $scope._2 = snapshot.val()._2;
      $scope._3 = snapshot.val()._3;
      $scope._4 = snapshot.val()._4;
      $scope._5 = snapshot.val()._5;
      $scope._6 = snapshot.val()._6;
      $scope._7 = snapshot.val()._7;
      $scope._8 = snapshot.val()._8;
      $scope._9 = snapshot.val()._9;
      $scope.$evalAsync();
      console.log('controller Called');
    });

})

  .controller('TeamParent-controller',function($scope){


    fbdb.ref('location').on('value',function(snapshot){
      $scope.location = snapshot.val();
    });


    fbdb.ref('team/field').on('value',function(snapshot){
      $scope.leftField = snapshot.val().leftField;
      $scope.centerField = snapshot.val().centerField;
      $scope.rightField = snapshot.val().rightField;
      $scope.shortStop = snapshot.val().shortStop;
      $scope.secondBase = snapshot.val().secondBase;
      $scope.thirdBase = snapshot.val().thirdBase;
      $scope.pitcher = snapshot.val().pitcher;
      $scope.firstBase = snapshot.val().firstBase;
      $scope.catcher = snapshot.val().catcher;

      $scope.canvasRender = function(){
        console.log(parseFloat($('#teamCanvas').width() / $scope.location.leftField.x));
        var canvas = document.getElementById('teamCanvas');
        var context = canvas.getContext('2d');
        context.font = "14px solid"
        context.clearRect(0,0,$('#teamCanvas').width(),$('#teamCanvas').height())
        context.fillStyle = '#FFFF00';
        context.fillText($scope.leftField,$scope.location.leftField.x,$scope.location.leftField.y);
        context.fillText($scope.centerField,$scope.location.centerField.x,$scope.location.centerField.y);
        context.fillText($scope.rightField,$scope.location.rightField.x,$scope.location.rightField.y);
        context.fillText($scope.firstBase,$scope.location.firstBase.x,$scope.location.firstBase.y);
        context.fillText($scope.secondBase,$scope.location.secondBase.x,$scope.location.secondBase.y);
        context.fillText($scope.thirdBase,$scope.location.thirdBase.x,$scope.location.thirdBase.y);
        context.fillText($scope.pitcher,$scope.location.pitcher.x,$scope.location.pitcher.y);
        context.fillText($scope.catcher,$scope.location.catcher.x,$scope.location.catcher.y);
        context.fillText($scope.shortStop,$scope.location.shortStop.x,$scope.location.shortStop.y);


        context.fillStyle = '#FF3300';
        context.fillRect($scope.location.leftField.x,$scope.location.leftField.y,5,5);
        context.fillRect($scope.location.centerField.x,$scope.location.centerField.y,5,5);
        context.fillRect($scope.location.rightField.x,$scope.location.rightField.y,5,5);
        context.fillRect($scope.location.firstBase.x,$scope.location.firstBase.y,5,5);
        context.fillRect($scope.location.secondBase.x,$scope.location.secondBase.y,5,5);
        context.fillRect($scope.location.thirdBase.x,$scope.location.thirdBase.y,5,5);
        context.fillRect($scope.location.pitcher.x,$scope.location.pitcher.y,5,5);
        context.fillRect($scope.location.catcher.x,$scope.location.catcher.y,5,5);
        context.fillRect($scope.location.shortStop.x,$scope.location.shortStop.y,5,5);

      };

      $scope.canvasRender();

      $scope.$evalAsync();
      console.log('controller Called');
    });


    fbdb.ref('team/bat').on('value',function(snapshot){
      $scope._1 = snapshot.val()._1;
      $scope._2 = snapshot.val()._2;
      $scope._3 = snapshot.val()._3;
      $scope._4 = snapshot.val()._4;
      $scope._5 = snapshot.val()._5;
      $scope._6 = snapshot.val()._6;
      $scope._7 = snapshot.val()._7;
      $scope._8 = snapshot.val()._8;
      $scope._9 = snapshot.val()._9;
      $scope.$evalAsync();
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
      $scope.$evalAsync();
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

  .controller('CoachUpdate-controller',function($scope){
    fbdb.ref('/coaches/'+$scope.parentUserName).once('value',function(snapshot){
      $scope.fname =  snapshot.val().fname;
      $scope.surname = snapshot.val().sname;
      $scope.email = snapshot.val().email;
      $scope.password = snapshot.val().password;
      $scope.$evalAsync();
    });

    $scope.submit = function(){

      fbdb.ref('/coaches/'+$scope.parentUserName).set({

        'fname'    : $scope.fname,
        'sname'    : $scope.surname,
        'username' : $scope.parentUserName,
        'password' : $scope.password,
        'email'    : $scope.email

      });

      alert('Info Updated Successfully');

    }

  })

  .controller('ParentUpdate-controller',function($scope){
    fbdb.ref('/parents/'+$scope.parentUserName).once('value',function(snapshot){
      $scope.fname =  snapshot.val().fname;
      $scope.surname = snapshot.val().sname;
      $scope.email = snapshot.val().email;
      $scope.password = snapshot.val().password;
      $scope.$evalAsync();
    });

    $scope.submit = function(){

      fbdb.ref('/parents/'+$scope.parentUserName).set({

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
      parentsArr = null;


      fbdb.ref('/parents').once('value',function(snappy){
        parentsArr = snappy.val();

        for(x in snapshot.val()){
          if(parentsArr[snapshot.val()[x].fname] == undefined )
            arr.push(snapshot.val()[x]);
        }
        $scope.playersArr = arr;
        $scope.$evalAsync();
      });
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

  .controller('CoachRegister-controller',function($scope){

    $scope.submit = function (){
      fname = $scope.fname;
      surname = $scope.surname;
      username = $scope.username;
      password = $scope.password;
      email = $scope.email;

      fbdb.ref('/coaches/'+email).once('value',function(snapshot){
        exists = (snapshot.val() !== null);

        if(exists){
          alert('User ID already exists');
          return;
        } else {
          fbdb.ref('coaches/'+username).set({
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

  .controller('chat-controller',function($scope){

  fbdb.ref('messages/').once('value').then(function(snapshot){

    $(document).ready(function(){
      var element = document.getElementById("parentDiv");
      element.scrollTop = element.scrollHeight;
    });

    $scope.chatMessages = snapshot.val();
    $scope.$evalAsync();

  });


  fbdb.ref('messages/').on('value',function(snapshot){

    $(document).ready(function(){
      var element = document.getElementById("parentDiv");
      element.scrollTop = element.scrollHeight;
    });

    $scope.chatMessages = snapshot.val();
    $scope.$evalAsync();

    $(document).ready(function(){
      var element = document.getElementById("parentDiv");
      element.scrollTop = element.scrollHeight;
    });
  });

  $scope.send = function(){

        $scope.$evalAsync();
        console.log($scope.parentUserName);
    var date = new Date();
    var xdate = date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes();

    console.log(this);

    fbdb.ref('messages/').push({
      sender: $scope.parentUserName,
    content:$scope.message,
    date: xdate
    });

    $scope.message = "";
  }

})
