package main

import (
	"net/http"
	"fmt"
	"encoding/json"
	"net/url"
	"io/ioutil"
	"html/template"
	"io"
)

type NameCar struct {
	Name 	string `json:"name"`
	Car 	string `json:"car"`
}

var templates = template.Must(template.ParseGlob("templates/*.html"))

func main() {
	http.Handle("/css/", http.FileServer(http.Dir("./public")))
	http.Handle("/js/", http.FileServer(http.Dir("./public")))
	http.Handle("/img/", http.FileServer(http.Dir("./public")))
	http.Handle("/favicon.ico", http.NotFoundHandler())

	http.HandleFunc("/", index)
	http.HandleFunc("/receiveget", a)
	http.HandleFunc("/receivepost", b)
	http.HandleFunc("/sendjson", c)
	http.HandleFunc("/sendformdataa", d)
	http.HandleFunc("/sendformdatab", e)
	http.HandleFunc("/sendformdatac", f)
	http.HandleFunc("/newencoderarray", g)
	http.HandleFunc("/receivejson", h)
	http.HandleFunc("/newencodersingle", i)

	http.ListenAndServe(":8080", nil)
}

func index(res http.ResponseWriter, req *http.Request)  {

	templates.ExecuteTemplate(res, "index", nil)
}

func a(res http.ResponseWriter, req *http.Request)  {
	//http://localhost:8080/receiveget?name="Isabel"
	val := req.URL.Query().Get("name")
	fmt.Println(val)
	io.WriteString(res, "Natalia")
}
func b(res http.ResponseWriter, req *http.Request)  {
	if req.Method == "POST"{
		val := req.FormValue("name")
		fmt.Println(val)
		io.WriteString(res, "Laura")
	}
}
func c(res http.ResponseWriter, req *http.Request)  {
	if req.Method == "POST"{
		cesar := &NameCar{Name: "Nuria", Car: "Ferrari"}
		json.NewEncoder(res).Encode(cesar)
	}
}
func d(res http.ResponseWriter, req *http.Request)  {
	urldata := url.Values{}
	urldata.Add("name", `Cesar`)
	urldata.Add("car", `BMW`)
	hc := &http.Client{}
	resp, _ := hc.PostForm("http://127.0.0.1:5000/golang", urldata)
	defer resp.Body.Close()
	var p NameCar
	xx, _ := ioutil.ReadAll(resp.Body)
	json.Unmarshal(xx, &p)
	fmt.Println(p.Name)
}
func e(res http.ResponseWriter, req *http.Request)  {
	urlData := url.Values{}
	urlData.Set("name", "Isabel")
	urlData.Set("car", "Audi")
	client := &http.Client{}
	resp, _ := client.PostForm("http://127.0.0.1:5000/golang", urlData)
	defer resp.Body.Close()
	var p NameCar
	err := json.NewDecoder(resp.Body).Decode(&p)
	if err != nil {fmt.Println(err)}
	fmt.Println(p.Name)
}
func f(res http.ResponseWriter, req *http.Request)  {
	resp, _ := http.PostForm("http://127.0.0.1:5000/golang", url.Values{"name": {"Marta"}, "car": {"Lexus"}})
	defer resp.Body.Close()
	var p NameCar
	json.NewDecoder(resp.Body).Decode(&p)
	fmt.Println(p.Name)
}
func g(res http.ResponseWriter, req *http.Request)  {
	if req.Method == "POST" {
		manyThings := []NameCar{
			{Name: "Natalia", Car: "Mustang"},
			{Name: "Laura", Car: "Camaro"},
		}
		json.NewEncoder(res).Encode(manyThings)
	}
}
func h(res http.ResponseWriter, req *http.Request)  {
	if req.Method == "POST" {
		var xperson NameCar
		xx, _ := ioutil.ReadAll(req.Body)
		json.Unmarshal(xx, &xperson)
		fmt.Println(xperson.Name)
		io.WriteString(res, "Isabel")
	}
}
func i(res http.ResponseWriter, req *http.Request)  {
	if req.Method == "POST" {
		xx := NameCar{Name: "Cristina", Car: "Seat"}
		json.NewEncoder(res).Encode(xx)
	}
}
func j(res http.ResponseWriter, req *http.Request)  {

}