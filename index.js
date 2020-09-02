// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAiggElCEuy17NklV0GyRmQa6KFVXWmYQo",
    authDomain: "turbo-motor-f9781.firebaseapp.com",
    databaseURL: "https://turbo-motor-f9781.firebaseio.com",
    projectId: "turbo-motor-f9781",
    storageBucket: "turbo-motor-f9781.appspot.com",
    messagingSenderId: "1089808311018",
    appId: "1:1089808311018:web:902c5cf9c18dab6136ad93",
    measurementId: "G-SEF4VMCG8K",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
let database = firebase.database();
console.log(
    "hlo from atom turbo !! this program is developed by Atom Developers"
);
//
//
let flag = false;

document.getElementById("btn1").addEventListener("click", function() {
    //console.log("worked");
    //
    if (flag) {
        document.querySelector("#userFlag").textContent = "OFF";
        document.querySelector(".btn-1 h1").style.marginLeft = "84px";
        document.querySelector(".btn-1").style.borderColor = "#E1D2CF";
        document.querySelector(".btn-1 h1").style.color = "#DCBDB7";
        flag = false;
        //document.querySelector("#stsFlag").textContent = "Motor is off now";
        //document.querySelector(".btn-1 h3").style.color = "#DCBDB7";
        //sen to the sts flag is 0 to data base
        firebase.database().ref("sCominication").set({
            stsFlag: 0,
        });
        //
        //
        if (overCurrentData == 1) {
            firebase.database().ref("overCrt").set({
                overFlag: 0,
            });
            // firebase.database().ref("hCominication").set({
            //     returnFlag: 0,
            // });
        }
    } else {
        document.querySelector("#userFlag").textContent = "ON";
        document.querySelector(".btn-1 h1").style.marginLeft = "95px";
        document.querySelector(".btn-1").style.borderColor = "#362D2B";
        document.querySelector(".btn-1 h1").style.color = "#261C19";
        flag = true;
        //sen to the sts flag is 1 to data base
        firebase.database().ref("sCominication").set({
            stsFlag: 1,
        });
    }
});

//over current protection mode
let overCurrentData;
firebase
    .database()
    .ref("overCrt")
    .on("value", function(snapshot) {
        overCurrentData = snapshot.val().overFlag;
        //console.log(typeof data);
        //

        if (overCurrentData === 1) {
            document.querySelector("#userFlag").textContent = "OFF";
            document.querySelector(".btn-1 h1").style.marginLeft = "84px";
            document.querySelector(".btn-1").style.borderColor = "#ab1111";
            document.querySelector(".btn-1 h1").style.color = "#730202";
            document.querySelector("#stsFlag").textContent =
                "over current protection mode on";
            document.querySelector(".btn-1 h3").style.marginLeft = "33px";
            document.querySelector(".btn-1 h3").style.marginTop = "12px";
            document.querySelector(".btn-1 h3").style.fontSize = "15px";
            document.querySelector(".btn-1 h3").style.color = "#730202";
        } else if (overCurrentData === 0) {
            // document.querySelector("#stsFlag").textContent = "Motor is off now";
            // document.querySelector(".btn-1 h3").style.color = "#DCBDB7";
            // document.querySelector(".btn-1 h3").style.fontSize = "25px";
            // document.querySelector(".btn-1 h3").style.marginLeft = "56px";
            let data;
            firebase
                .database()
                .ref("hCominication")
                .on("value", function(snapshot) {
                    data = snapshot.val().returnFlag;
                    //console.log(typeof data);
                    //
                    if (data === 1) {
                        document.querySelector("#stsFlag").textContent = "Motor is on now";
                        document.querySelector(".btn-1 h3").style.marginLeft = "49px";
                        document.querySelector(".btn-1 h3").style.color = "#261C19";
                        document.querySelector(".btn-1 h3").style.fontSize = "25px";
                    } else {
                        document.querySelector("#stsFlag").textContent = "Motor is off now";
                        document.querySelector(".btn-1 h3").style.color = "#DCBDB7";
                        document.querySelector(".btn-1 h3").style.fontSize = "25px";
                        document.querySelector(".btn-1 h3").style.marginLeft = "56px";
                        document.querySelector(".btn-1 h3").style.marginTop = "9px";
                    }
                });
        }
    });

//atom welcome msg
//

var blk3 = document.querySelector(".atom-welcome-msg-container");
//blk3.style.display = "none";

//sts checking
let onOfData;
firebase
    .database()
    .ref("crtSts")
    .on("value", function(snapshot) {
        onOfData = snapshot.val().crtStsFlag;
        //console.log(typeof data);
        //

        if (onOfData === 1) {
            blk3.style.display = "none";
            document.querySelector(".btn-1").style.display = "block";
        } else {
            document.querySelector("#welcomeMsg").textContent =
                "oops ! no power is avilable";
            document.querySelector(
                ".atom-welcome-msg-container h6"
            ).style.marginLeft = "35px";
            document.querySelector(".btn-1").style.display = "none";
            blk3.style.display = "block";
        }
    });