const interval = 5000;
var index = 0;

window.onload = function() {
    slideShow();
    loginCheck();
}

function slideShow() {
    var i;
    var x = document.getElementsByClassName("transition"); 
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";  
    }
    index++;
    if (index > x.length) {
        index = 1; 
    }   
    x[index-1].style.display = "block";  
    setTimeout(slideShow, interval); 
}

function makeUser() {
    let user_imformations = [];
    user_imformations.push(document.querySelector("#signUp_name").value);
    user_imformations.push(document.querySelector("#signUp_id").value);
    user_imformations.push(document.querySelector("#signUp_pw").value);
    user_imformations.push(document.querySelector("#signUp_pw_config").value);
    user_imformations.push(document.querySelector("#signUp_email").value);

    for (let index = 0; index < user_imformations.length; index++) {
        const element = user_imformations[index];
        console.log(element);
        console.log(index);
        if (!element) {
            alert("정보를 모두 채워주세요.");
            return;
        }
    }

    if (user_imformations[2] != user_imformations[3]) {
        alert("비밀번호를 다시 확인해주세요.");
        return;
    }
    
    let userList = JSON.parse(localStorage.getItem("userList"));
    userList = userList ? userList : [] ; 

    let user = {
        userNumber : userList.length,
        userName : user_imformations[0],
        userId : user_imformations[1],
        userPw : user_imformations[2],
        userEmail : user_imformations[4]
    }
    userList.push(user);

    let userLst_json = JSON.stringify(userList);
    localStorage.setItem(`userList`, userLst_json);
    alert("계정이 생성되었습니다.")
    window.location.reload();
}

//로그인
function login() {
    let typed_id = document.querySelector("#signIn_id").value;
    let typed_pw = document.querySelector("#signIn_pw").value;

    let userList = JSON.parse(localStorage.getItem("userList"));
    let login_succese = false;
    userList.forEach(user_info => {
        if (user_info.userId == typed_id && user_info.userPw == typed_pw) {
            let logined_user = {
                userNumber : user_info.userNumber,
                userName : user_info.userName,
                userId : user_info.userId,
                userPw : user_info.userPw,
                userEmail : user_info.userEmail
            }
            sessionStorage.setItem("logined_user", JSON.stringify(logined_user));
            alert(`환영합니다. ${logined_user.userId}님`);
            login_succese = true;
            // document.getElementById("nav_logOff").style.display = "none";
            // document.getElementById("nav_logOn").style.display = "";   
            $("#signIn").modal("hide");     
            window.location.reload();   
            return;
        }
    });
    if (!login_succese) {
        alert("아이디와 비밀번호를 다시 확인해주세요.");
    }
}

function logout() {
    sessionStorage.setItem("logined_user", null);
    alert("로그아웃 되었습니다.");
    window.location.reload(); 
}

function loginCheck(){
    let logined_user = JSON.parse(sessionStorage.getItem("logined_user"));
    let hide_arr = [];
    let show_arr = [];
    if (logined_user == null) { //로그인 안된 상태
        console.log(0);
        hide_arr = document.querySelectorAll(".Logined");
        show_arr = document.querySelectorAll(".nonLogined");
    }else{
        console.log(1);
        show_arr = document.querySelectorAll(".Logined");
        console.log(hide_arr);
        hide_arr = document.querySelectorAll(".nonLogined");
        console.log(hide_arr);
    }
    hide_arr.forEach(element => {
        element.style.display = "none";
    });
    show_arr.forEach(element => {
        element.style.display = "";
    });
}
