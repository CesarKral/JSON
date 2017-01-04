$(function () {
    var buta = $("#buta")
    var bute = $("#bute")
    var buti = $("#buti")
    var buto = $("#buto")
    var butu = $("#butu")
    var ba = $("#ba")
    var bb = $("#bb")
    var diva = $("#diva")
    var divc = $("#divc")
    diva.html("Cesar")

    diva.click(function () {
        $(this).css({'color': 'red', 'background-color': 'green'})
    })
    var items = []
    var urlx = "https://jsonplaceholder.typicode.com/users"
    $.getJSON(urlx, function (data) {
        $.each(data, function (k, v) {
            items.push("<li>" + v.name + "</li>")
        })
    }).done(function () {
        $("<ul/>",{
            class: "myList",
            html: items.join("")
        }).appendTo("#divb")
    }).fail().always()
    
    buta.click(function () {
        $.post("receivejson", JSON.stringify({name: "Cesar", car: "BMW"})).done(function (data) {
            console.log(data)
            divc.empty().append(data)
        })
    })
    bute.click(function () {
        var jsona = {name: 'Cesar', car: 'BMW'}

        $.get("receiveget", jsona).done(function (data) {
            console.log(data)
            divc.empty().append(data)
        })
    })
    buti.click(function () {
        $.post("http://127.0.0.1:5000/jsonto", {jsondata: JSON.stringify({name: "Surface", brand: "Microsoft"})}).done(function (data) {
            console.log(data)
            divc.empty().append(data)
        })
    })
    buto.click(function () {
        var dataToSend = JSON.stringify({name: 'Cesar', car: 'BMW'});
        $.ajax({ url: "receivejson",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            dataType: "text",
            data: dataToSend , // pass that text to the server as a correct JSON String
            success: function (data) {
                console.log(data)
                divc.empty().append(data)
            }
        });
    })
    butu.click(function () {
        HttpCsharp()
    })
    ba.click(function () {
        $.post("newencodersingle").done(function (data) {
            var jp = JSON.parse(data)
            divc.empty().append(jp.name)
        })
    })
    bb.click(function () {
        $.post("newencoderarray").done(function (data) {
            var ps = JSON.parse(data)
            $.each(ps, function (k,v) {
                console.log(v.name)
            })
        })
    })
});

function HttpUe() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("divc").innerHTML =
                this.responseText;
        }
    };
    xhttp.open("POST", "receivejson", true);
    xhttp.setRequestHeader("Content-type", "application/json; charset=utf-8");
    xhttp.send(JSON.stringify({name: "Cesar", car: "BMW"}));
}

function HttpCsharp() {
    var obj = {name: "Cesar", car: "BMW"}
    var str = Object.keys(obj).map(function(key){
        return encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]);
    }).join('&');
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("divc").innerHTML =
                this.responseText;
        }
    };
    xhttp.open("POST", "receivepost", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(str);
}

function HttpUrl() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if(this.readyState == 4 && this.status == 200){
            var x = JSON.parse(this.responseText);
            x.forEach(function (data) {
                console.log(data.name);
            })
        }
    };
    xhttp.open("GET", "https://jsonplaceholder.typicode.com/users", true);
    xhttp.send(null)
}

function fetchUe() {
    fetch("receivejson", {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({name: "Cesar", car: "BMW"})}).then(function (response) {
        if(response.ok){
            response.text().then(function (data) {
                document.getElementById("divc").innerHTML = data;
            });
        }else{
            return
        }

    });
}

function fetchCsharp() {
    var prms = "name=" + "Cesar" + "&car=" + "BMW"
    fetch("receivepost", {method: 'POST', headers: {'Content-Type': 'application/x-www-form-urlencoded'}, body: prms}).then(function (response) {
        if(response.ok){
            response.text().then(function (data) {
                document.getElementById("divc").innerHTML = data;
            });
        }else{
            return
        }

    });
}

function fetchUrl() {
    fetch("https://jsonplaceholder.typicode.com/users", {method: 'GET'}).then(function (response) {
        if(response.ok){
            response.json().then(function (res) {
                res.forEach(function (data) {
                    console.log(data.name);
                })
            });
        }else{
            return
        }

    });
}