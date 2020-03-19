const fs = require('fs'); //import modul fs untuk membaca dan menulis file
var DecisionTree = require('decision-tree') //import modul decision-tree (modul yang telah mengimplementasikan ID3)
var tree_model;           //variable yang akan menyimpan model tree yang diambil dari file message.json
var client_data = {       //data baru pasien
    Pregnancies: '6',
    Glucose: '148',
    BloodPressure: '72',
    SkinThickness: '35',
    Insulin: '0',
    BMI: '33.6',
    DiabetesPedigreeFunction: '0.627',
    Age: '50'};
// First I want to read the file
fs.readFile('./message.json', function read(err, data) {    //mengambil model tree dari file message.json
    if (err) {
        throw err;
    }
    // console.log("Ini data :");
    // console.log(data);
    // console.log("Ini Objek :");
    // console.log(JSON.parse(data));
    var load = //coba pakai export variable ya
    tree_model = JSON.parse(data);                          //mengubah data json yang ada di file message.json menjadi sebuah objek
    processFile();                                          // print tree model
    var bmi = calculate_bmi(49,170);                        // Sistem menghitung bmi dari berat dan tinggi badan yang diinputkan oleh user
    status_BMI(bmi);                                        // Sistem cek status BMI (kelebihan berat badan, atau kurang, atau obesitas)
    status_hipertensi(121,80);                              // Sistem menghitung status tekanan darah dari tekanan sistol dan diastol yang diinputkan oleh user
    cek_input_tekanan_darah(121,60);                        // validasi input sistol dan diastol
    cek_input_berat_tinggi(49,1);                           // validasi input tinggi dan berat badan
    cek_all_input();                                                   // validasi all
    do_predict();                                         // prediksi diabetes berdasarkan data baru pasien
    //do_predict(tree_model);
});

//     /**
//      * Imports a previously saved model with the toJSON() method
//      */
// encodeJSONtoDecisionTree = (json)=>{
//         var {model, data, target, features} = json;
//         var load_model_decision_tree = new DecisionTree(data, target, features);
//         return load_model_decision_tree;
//         //return {model, data, target, features};
// }

function processFile() {
    console.log(tree_model);
}

function do_predict(){
    var load_model_decision_tree = new DecisionTree(tree_model);  //membuat tree dari tree model yang sudah ada di file message.json
    //var load_model_decision_tree = encodeJSONtoDecisionTree(json);
    var result_predict = load_model_decision_tree.predict(client_data); //memprediksi penyakit diabetes pasien
    console.log(result_predict);
    //print_predict(result_predict);
}

// do_predict = (/*json*/) => {
//     var load_model_decision_tree =  tree_model; //membuat tree dari tree model yang sudah ada di file message.json
//     //var load_model_decision_tree = encodeJSONtoDecisionTree(json);
//     var result_predict = load_model_decision_tree.predict(client_data); //memprediksi penyakit diabetes pasien
//     console.log(result_predict);
//     //print_predict(result_predict);
// }

function print_predict(hasil){
    console.log("Hasil Prediksi Anda : ",hasil);
}

function calculate_bmi(berat, tinggi){
    console.log(berat/Math.pow((tinggi/100), 2));
    return berat/Math.pow((tinggi/100), 2);
}

function status_BMI(bmi){
    var status = "";
    if(bmi < 18.5)
    {
        status = "Berat badan kurang";
    }
    else if(bmi >= 18.5 && bmi<= 22.9 )
    {
        status = "Berat badan normal";
    }
    else if(bmi >= 23 && bmi<= 29.9 )
    {
        status = "Berat badan berlebih";
    }
    else if(bmi >= 30)
    {
        status = "Obesitas";
    }
    console.log(status);
    return status;
}

function status_hipertensi(sistol, diastol){
    var status = "";
    if(sistol < 90 && diastol <60)
    {
        status = "hipotensi";
    }
    else if(sistol >= 90 && sistol <=120 && diastol >= 60 && diastol <=80)
    {
        status = "normotensi";
    }
    else if(sistol > 120 && diastol >=80)
    {
        status = "hipertensi";
    }
    console.log(status);
    return status;
}

function cek_input_tekanan_darah(sistol, diastol){
    var status = 0;
    if(sistol < 90 && diastol <60)
    {
        status = 1;
    }
    else if(sistol >= 90 && sistol <=120 && diastol >= 60 && diastol <=80)
    {
        status = 1;
    }
    else if(sistol > 120 && diastol >=80)
    {
        status = 1;
    }
    console.log(status);
    return status;
}

function cek_input_berat_tinggi(berat, tinggi)
{
    var status = "true";
    if(berat >= 12 && tinggi < 10) //menanggulangi user salah kira tinggi menjadi bersatuan (m)
    {
        status = "warning";
    }
    console.log(status);
    return status;
}

function cek_input_keluarga(keluarga_terserang, jumlah_keluarga)
{
    var status = 1;
    if(keluarga_terserang > 0 && jumlah_keluarga <=0)
    {
        status = 0;
    }
    else if(jumlah_keluarga <= 0 || keluarga_terserang <0 || keluarga_terserang > jumlah_keluarga)
    {
        status = 0;
    }
    console.log(status);
    return status;
}

function cek_all_input(jumlah_hamil, kadar_glukosa, sistol, diastol, ketebalan_kulit, c_peptida, berat, tinggi, keluarga_terserang, jumlah_keluarga)
{
    status = 1;
    if(jumlah_hamil < 0 ||kadar_glukosa <= 0 || sistol <= 0 || diastol <= 0 || ketebalan_kulit<=0 ||c_peptida<=0 || berat<=0||tinggi<=0 ||jumlah_keluarga<0)
    {
        status = 0;
    }
    else if(cek_input_keluarga(keluarga_terserang,jumlah_keluarga) == 0)
    {
        status = 0;
    }
    else if(cek_input_berat_tinggi(berat, tinggi) == "warning")
    {
        status = 0;
    }
    else if(cek_input_tekanan_darah(sistol,diastol) == 0)
    {
        status = 0;
    }
    console.log(status);
    return status;
}