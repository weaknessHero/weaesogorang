var chkExUsername=false;
var chkExNickname=false;
var chkExPhone=false;
function check_username(){
    var input = document.querySelector('#username').value;
    for(var i in exist_username){
        if(exist_username[i]==input){
            document.querySelector('#username').value="";
            alert("중복된 아이디입니다.");
            chkExUsername=false;
            return;
        }
    }
    chkExUsername=true;
    alert("사용가능한 아이디입니다.")
}

function check_nickname(){
    var input = document.querySelector('#nickname').value;
    for(var i in exist_nickname){
        if(exist_nickname[i]==input){
            console.log(exist_nickname[i]);
            console.log(input);
            document.querySelector('#nickname').value="";
            alert("중복된 닉네임입니다.");
            chkExNickname=false;
            return;
        }
    }
    chkExNickname=true;
    alert("사용가능한 닉네임입니다.")
}
function check_phone(){
    var input = document.querySelector('#phonenumber').value;
    String(input);
    for(var i in exist_phone){
        if(exist_phone[i]==input){
            alert("이미 등록된 핸드폰 번호입니다.");
            chkExPhone=false;
            document.querySelector('#phonenumber').value="";
            return;
        }
    }
    chkExPhone=true;
    alert("인증완료")
}


function signUp() {
    const form = document.login_form;
    const chkUsername = checkValidUsername(form);
    const chkEmail = checkValidEmail(form);
    const chkPw = checkValidPassword(form);
    const chkPw2 = checkValidPassword2(form);
    const chkNickname = checkValidNickname(form);
    const chkAdress = checkValidAdress(form);
    const chkPhone = checkValidPhone(form);
    if (chkNickname) {
        document.getElementById('alert_nickname').innerText = "";
        form.username.style.border = '2px solid';
        form.username.style.borderColor = '#00D000';
    } else {
        form.username.style.border = '2px solid';
        form.username.style.borderColor = '#FF0000';
        document.getElementById('alert_nickname').style.color = '#FF0000';
    }

    if (chkAdress) {
        document.getElementById('alert_homeadress').innerText = "";
        form.username.style.border = '2px solid';
        form.username.style.borderColor = '#00D000';
    } else {
        form.username.style.border = '2px solid';
        form.username.style.borderColor = '#FF0000';
        document.getElementById('alert_homeadress').style.color = '#FF0000';
    }

    if (chkPhone) {
        document.getElementById('alert_phone').innerText = "";
        form.username.style.border = '2px solid';
        form.username.style.borderColor = '#00D000';
    } else {
        form.username.style.border = '2px solid';
        form.username.style.borderColor = '#FF0000';
        document.getElementById('alert_phone').style.color = '#FF0000';
    }


    if (chkUsername) {
        document.getElementById('alert_username').innerText = "";
        form.username.style.border = '2px solid';
        form.username.style.borderColor = '#00D000';
    } else {
        form.username.style.border = '2px solid';
        form.username.style.borderColor = '#FF0000';
        document.getElementById('alert_username').style.color = '#FF0000';
    }

    if (chkEmail) {
        document.getElementById('alert_email').innerText = "";
        form.email.style.border = '2px solid';
        form.email.style.borderColor = '#00D000';
    } else {
        form.email.style.border = '2px solid';
        form.email.style.borderColor = '#FF0000';
        document.getElementById('alert_email').style.color = '#FF0000';
    }

    if (chkPw) {
        document.getElementById('alert_password').innerText = "";
        form.password.style.border = '2px solid';
        form.password.style.borderColor = '#00D000';
    } else {
        form.password.style.border = '2px solid';
        form.password.style.borderColor = '#FF0000';
        document.getElementById('alert_password').style.color = '#FF0000';
    }
    if (chkPw2) {
        document.getElementById('alert_password2').innerText = "";
        form.password2.style.border = '2px solid';
        form.password2.style.borderColor = '#00D000';
    } else {
        form.password2.style.border = '2px solid';
        form.password2.style.borderColor = '#FF0000';
        document.getElementById('alert_password2').style.color = '#FF0000';
    }

    if (chkUsername && chkEmail && chkPw && chkPw2 && chkNickname && chkAdress && chkPhone && chkExUsername && chkExNickname && chkExPhone) {
        form.submit();
    }
}
function checkValidNickname(form) {
    if (form.nickname.value == "") {
        document.getElementById('alert_nickname').innerText = "닉네임을 입력하세요.";
        return false;
    }

    return true;
}

function checkValidAdress(form) {
    if (form.nickname.value == "") {
        document.getElementById('alert_homeadress').innerText = "주소를 입력하세요.";
        return false;
    }

    return true;
}

function checkValidPhone(form) {
    if (form.nickname.value == "") {
        document.getElementById('alert_phone').innerText = "핸드폰 번호를 입력하세요.";
        return false;
    }

    const exptext = /[0-9]/;

    if (exptext.test(form.phonenumber.value) === false) {
        document.getElementById('alert_phone').innerText = "핸드폰 번호는 숫자로만 입력하실 수 있습니다.";
        return false;
    }

    return true;
}


function checkValidUsername(form) {
    if (form.username.value == "") {
        document.getElementById('alert_username').innerText = "이름을 입력하세요.";
        return false;
    }

    return true;
}

function checkValidEmail(form) {
    if (form.email.value == "") {
        document.getElementById('alert_email').innerText = "이메일을 입력하세요.";
        return false;
    }

    const exptext = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;

    if (exptext.test(form.email.value) === false) {
        document.getElementById('alert_email').innerText = "이메일 주소가 유효하지 않습니다.";
        return false;
    }

    return true;
}

function checkValidPassword(form) {
    if (form.password.value == "") {
        document.getElementById('alert_password').innerText = "비밀번호를 입력하세요.";
        return false;
    }

    const pw = form.password.value;

    const num = pw.search(/[0-9]/g);

    const eng = pw.search(/[a-z]/ig);

    const spe = pw.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);

    if (pw.length < 6) {
        document.getElementById('alert_password').innerText = "비밀번호는 6자 이상이어야 합니다.";
        return false;
    } else if (pw.search(/\s/) != -1) {
        document.getElementById('alert_password').innerText = "비밀번호를 공백없이 입력해주세요.";
        return false;
    } else if (num < 0 && eng < 0 && spe < 0) {
        document.getElementById('alert_password').innerText = "비밀번호가 올바르지 않습니다.";
        return false;
    }

    return true;
}

function checkValidPassword2(form) {
    if (form.password2.value == "") {
        document.getElementById('alert_password2').innerText = "비밀번호를 재입력해주세요.";
        return false;
    }

    if (form.password.value !== form.password2.value) {
        document.getElementById('alert_password2').innerText = "암호와 확인 암호가 일치하지 않습니다.";
        form.password.style.border = '2px solid';
        form.password.style.borderColor = '#FF0000';
        document.getElementById('alert_password').style.color = '#FF0000';
        return false;
    }

    return true;
}
