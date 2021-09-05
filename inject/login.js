const { ipcRenderer, remote } = require("electron");

let style = `
body {
    min-width: inherit !important;
}

#autoLogin {
    background: #424242;
    width: 100%;
    height: 54px;
    color: #ffffff;
    font-family: inherit;
    line-height: 54px;
    font-size: 15px;
    border: none;
    border-radius: 2px;
    text-align: center;
    cursor:pointer;
}
`;

require("./api").injectCss(style);

if (document.getElementById("l-username") != undefined && document.getElementById("l-password") != undefined) {
    document.getElementsByClassName("row")[1].insertAdjacentHTML('afterbegin', '<div align="center" style=""><input id="autoLogin" value="AUTOLOGIN" type="button"></div>');
}

document.getElementById("autoLogin").addEventListener("click", () => {
	ipcRenderer.send("autoLogin", remote.getCurrentWindow().id);
});

ipcRenderer.on("login", (event, data) => {
    document.getElementById("l-username").value = data[0];

    document.getElementById("l-password").value = data[1];

    if (document.querySelectorAll('iframe[title="reCAPTCHA"]').length != 0) {
        alert("Por favor, complete el captcha");
    } else {
        document.getElementsByClassName("btn-large grey darken-3 waves-effect waves-light col s12")[0].click();
    }
});