(function () {
    settingUp();

    function settingUp() {
        console.log("code = " + localStorage.getItem('code'));

        if (localStorage.getItem('code')) {
            login();
        } else {
            register();
        }
    }

    function login() {
        console.log("login");
        //do login
        var url = "http://localhost:4000/login/";
        var code = localStorage.getItem('code');
        post_data(url, code, function (response) {
            console.log("setting" + response.code);
            localStorage.setItem('code', response.code);
            window.location.href = "http://localhost/twiggy/twiggy-frontend/bin/";
        }, function (response) {
            console.log("ERR")
        });
    }

    function register() {
        console.log("regis echt");
        //register user
        var url = "http://localhost:4000/register/";
        post_data(url, null, function (response) {
            var code = response.code;
            console.log("code" + code);
            localStorage.setItem('code', response.code);
            window.location.href = "http://localhost/twiggy/twiggy-frontend/bin/";
        }, function (response) {
            console.log("Error" + response)
        });
    }


    function post_data(url, data, success, error) {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                var response = JSON.parse(xmlHttp.responseText);
                (!response.error) ? success(response) : error(response);

            } else if (xmlHttp.readyState == 4 && xmlHttp.status == 401) {
                console.log("Wrong login.");
            } else if (xmlHttp.readyState == 4 && xmlHttp.status == 422) {
                console.log("Parameter not found.");
            }
        };

        var send_data = "code=" + data;
        xmlHttp.open("post", url);
        xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        if (data) {
            xmlHttp.send(send_data);
        } else {
            xmlHttp.send();
        }
    }

}());
