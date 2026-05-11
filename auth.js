function signup() {

    let name =
    document.getElementById("name").value;

    let email =
    document.getElementById("email").value;

    let password =
    document.getElementById("password").value;

    let users =
    JSON.parse(localStorage.getItem("users"))
    || [];

    users.push({
        name,
        email,
        password
    });

    localStorage.setItem(
        "users",
        JSON.stringify(users)
    );

    alert("✅ Account Created");

    window.location.href =
    "login.html";
}

function login() {

    let email =
    document.getElementById("loginEmail").value;

    let password =
    document.getElementById("loginPassword").value;

    let users =
    JSON.parse(localStorage.getItem("users"))
    || [];

    let user =
    users.find(u =>
        u.email === email &&
        u.password === password
    );

    if(user){

        localStorage.setItem(
            "currentUser",
            JSON.stringify(user)
        );

        alert("✅ Login Successful");

        window.location.href =
        "dashboard.html";

    } else {

        alert("❌ Invalid Login");
    }
}