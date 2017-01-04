import 'dart:html';
import 'dart:convert' show JSON;
//COMPILE to js file with this line:
//dart2js --out=./public/js/dart.js main.dart

sendReceive()async{
  var mapData = new Map();
  mapData["name"] = "Cesar";
  mapData["car"] = "BMW";
  String jsonData = JSON.encode(mapData);

  await HttpRequest.request('receivejson', method: 'POST', sendData: jsonData)
      .then((HttpRequest resp) {
    // Do something with the response.
    querySelector('#divc').text = resp.response.toString();
    print(resp.response.toString());
  });
}


sendOnly() async{
  var mapData = new Map();
  mapData["name"] = "Cesar";
  mapData["car"] = "BMW";
  String jsonData = JSON.encode(mapData); // convert map to String

  HttpRequest request = new HttpRequest();
  request.open("POST","receivejson");
  await request.send(jsonData);
}

postForm()async{
  var mapData = new Map();
  mapData["name"] = "Cesar";
  mapData["car"] = "BMW";

  await HttpRequest.postFormData('receivepost', mapData).then((HttpRequest resp) {
    // Do something with the response.
    querySelector('#divc').text = resp.response.toString();
    print(resp.response.toString());
  });
}

getData()async{
  String url = "https://jsonplaceholder.typicode.com/users";
  String response = await HttpRequest.getString(url);
  Map model = JSON.decode(response);
  querySelector('#divc').text = model[0]["name"];
  if(querySelectorAll('#outputB').length != 0){
    querySelector('#outputB').text = model[1]["name"];
  }
  querySelector('#divd').text = model[2]["name"];
}

void main(){

  getData();
  //
  querySelector('#darta').onClick.listen(
      (event){
    sendReceive();
    //sendOnly();
    //postForm();
  }
  );

  querySelector('#dartb').onClick.listen(
      (event){
    //sendReceive();
    //sendOnly();
    postForm();
  }
  );
}
