import com.firebase.client.*;

import java.util.Date;

import java.util.Scanner;

import static java.lang.System.exit;

/**
 * Created by Administrator on 4/30/2017.
 */

public class fbdb {

    public static Firebase fbdbObj;
    static String fieldVal;
    static boolean getFieldFlag;
    static boolean mSwitch;

    public fbdb(){

    }

    public static void connect(){
        fbdbObj = new Firebase("https://assistantcoach-23a21.firebaseio.com/");
    }

    public static void clearFieldPlayer(String field){
        fbdbObj.child("/team/field/"+field).setValue("");
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    public static String getFieldPlayer(String field){
        fieldVal = null;
        fbdbObj.child("/team/field/"+field).addValueEventListener(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot dataSnapshot) {
                fieldVal = dataSnapshot.getValue().toString();
                mSwitch = true;
            }

            @Override
            public void onCancelled(FirebaseError firebaseError) {

            }
        });

        while(fieldVal == null){
            try {
                Thread.sleep(50);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }


        return fieldVal;
    }

    public static boolean swapFields(String field1, String field2){
        String playerOne = getFieldPlayer(field1);
        String playerTwo = getFieldPlayer(field2);

//        fbdbObj.child("/team/field/firstBase").setValue("ahmad");
//        fbdbObj.child("/team/field/centerField").setValue("aleem");
//        fbdbObj.child("/team/field/pitcher").setValue("bilal");
//        fbdbObj.child("/team/field/catcher").setValue("george");
//        fbdbObj.child("/team/field/rightField").setValue("jawad");
//        fbdbObj.child("/team/field/leftField").setValue("joshua");
//        fbdbObj.child("/team/field/shortStop").setValue("mark");
//        fbdbObj.child("/team/field/secondBase").setValue("saad");
//        fbdbObj.child("/team/field/

        fbdbObj.child("/team/field/"+field1).setValue(playerTwo);
        fbdbObj.child("/team/field/"+field2).setValue(playerOne);



        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
//        System.out.println(playerOne);
//        System.out.println(playerTwo);

        return true;

    }

    public static boolean sendMessage(String msg){
        Firebase tempRef = fbdbObj.child("/messages/").push();
        tempRef.child("sender").setValue("SuperUser");
        tempRef.child("content").setValue(msg);
        tempRef.child("date").setValue(new Date().toString());

        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        return true;
    }


    public static void main(String[] args){
        connect();

        fbdbObj.child("team/field").child("catcher").setValue("ahmad");
        fbdbObj.child("team/field").child("centerField").setValue("aleem");
        fbdbObj.child("team/field").child("firstBase").setValue("bilal");
        fbdbObj.child("team/field").child("leftField").setValue("george");
        fbdbObj.child("team/field").child("pitcher").setValue("jawad");
        fbdbObj.child("team/field").child("rightField").setValue("joshua");
        fbdbObj.child("team/field").child("secondBase").setValue("mark");
        fbdbObj.child("team/field").child("shortStop").setValue("saad");
        fbdbObj.child("team/field").child("thirdBase").setValue("talha");
//        String tempy = getFieldPlayer("firstBase");
//        System.out.println(tempy);
//        tempy = getFieldPlayer("pitcher");
//        System.out.println(tempy);

        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
//        clearFieldPlayer("firstBase");

//        swapFields("firstBase","pitcher");

        sendMessage("Hi this is bilal");


    }

}
