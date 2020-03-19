var DecisionTree = require('decision-tree'); //import modul decision-tree (Harus npm install decision-tree )
// var training_data = [                       
//     {"color":"blue", "shape":"square", "liked":false},
//     {"color":"red", "shape":"square", "liked":false},
//     {"color":"blue", "shape":"circle", "liked":true},
//     {"color":"red", "shape":"circle", "liked":true},
//     {"color":"blue", "shape":"hexagon", "liked":false},
//     {"color":"red", "shape":"hexagon", "liked":false},
//     {"color":"yellow", "shape":"hexagon", "liked":true},
//     {"color":"yellow", "shape":"circle", "liked":true}
// ];

// var test_data = [
//     {"color":"blue", "shape":"hexagon", "liked":false},
//     {"color":"red", "shape":"hexagon", "liked":false},
//     {"color":"yellow", "shape":"hexagon", "liked":true},
//     {"color":"yellow", "shape":"circle", "liked":true}
// ];

// var class_name = "liked";
// var features = ["color", "shape"];
// var dt = new DecisionTree(training_data, class_name, features);
// var predicted_class = dt.predict({
//     color: "blue",
//     shape: "hexagon"
// });


// const csv = require('csv'); 

// // loads the csv module referenced above.

// const http = require('http');

// //loads the http module

// const obj = csv(); 

// // gets the csv module to access the required functionality

// ​

// function MyCSV(Fone, Ftwo, Fthree, Ffour, Ffive, Fsix, Fseven, Feight, Fnine) {
//     this.Pregnancies = Fone;

//     this.Glucose = Ftwo;

//     this.BloodPressure = Fthree;

//     this.SkinThickness = Ffour;

//     this.Insulin = Ffive;

//     this.BMI = Fsix;

//     this.DiabetesPedigreeFunction = Fseven;

//     this.Age = Feight;

//     this.Outcome = Fnine;

// }; 

// // Define the MyCSV object with parameterized constructor, this will be used for storing the data read from the csv into an array of MyCSV. You will need to define each field as shown above.

// ​

// var MyData = []; 

// // MyData array will contain the data from the CSV file and it will be sent to the clients request over HTTP. 

// ​

// obj.from.path('/KULIAH SEMSETER 7/SKRIPSI/DecisionTree_cicil skripsi/diabetes.csv').to.array(function (data) {

//     for (var index = 0; index < data.length; index++) {

//         MyData.push(new MyCSV(data[index][0], data[index][1], data[index][2], data[index][3], data[index][4], data[index][5], data[index][6], data[index][7], data[index][8]));

//     }

//     console.log(MyData);

// });

// //Reads the CSV file from the path you specify, and the data is stored in the array we specified using callback function.  This function iterates through an array and each line from the CSV file will be pushed as a record to another array called MyData , and logs the data into the console to ensure it worked.

// ​

// const server = http.createServer(function (req, resp) {

//     resp.writeHead(200, { 'content-type': 'application/json' });

//     resp.end(JSON.stringify(MyData));

// });

// // Create a webserver with a request listener callback.  This will write the response header with the content type as json, and end the response by sending the MyData array in JSON format.

// ​

//server.listen(8080);

//Tells the webserver to listen on port 8080(obviously this may be whatever port you want.)
// var accuracy = dt.evaluate(test_data);
// var treeModel = dt.toJSON();
// console.log(predicted_class);
// console.log(accuracy);
// console.log(treeModel);

/** Ambil csv file
a,b,c
1,2,3
4,5,6
*/
const csvFilePath='D:/KULIAH SEMESTER 7/SKRIPSI/Code/skripsiSukses-npm/diabetes.csv'; 
const csv=require('csvtojson'); //import modul csvtojson untuk mengubah data diabetes.csv menjadi kumpulan / array of json (Harus npm i --save csvtojson)
const fs = require('fs');       // import modul fs untuk membaca dan menulis data kedalam file (menyimpan model tree yang telah digenerate ke dalam file message.json)
csv()
.fromFile(csvFilePath)
.then((jsonObj)=>{              //jsonObj adalah variable yang memuat data file diabetes.csv yang sudah dalam bentuk json
    //console.log(jsonObj);
    var class_name_a = "Outcome"; //atribut yang akan ditebak
    var features_a = ["Pregnancies", "Glucose","BloodPressure","SkinThickness","Insulin","BMI","DiabetesPedigreeFunction","Age"]; //atribut feature
    var dt_a = new DecisionTree(jsonObj, class_name_a, features_a);  //generate model tree
    var predicted_class_a = dt_a.predict({                          //memprediksi berdasarkan data baru, predicted_class_a (hasil prediksi data baru)
        Pregnancies: '6',
        Glucose: '148',
        BloodPressure: '72',
        SkinThickness: '35',
        Insulin: '0',
        BMI: '33.6',
        DiabetesPedigreeFunction: '0.627',                          
        Age: '50'

        // Pregnancies: '1',
        // Glucose: '85',
        // BloodPressure: '66',
        // SkinThickness: '29',
        // Insulin: '0',
        // BMI: '326.6',
        // DiabetesPedigreeFunction: '0.351',
        // Age: '31'
    });

    var test_data_a = [
    { Pregnancies: '1',
      Glucose: '89',
      BloodPressure: '66',
      SkinThickness: '23',
      Insulin: '94',
      BMI: '28.1',
      DiabetesPedigreeFunction: '0.167',
      Age: '21',
      Outcome: '0' },

      { Pregnancies: '5',
      Glucose: '116',
      BloodPressure: '74',
      SkinThickness: '0',
      Insulin: '0',
      BMI: '25.6',
      DiabetesPedigreeFunction: '0.201',
      Age: '30',
      Outcome: '0' },

    { Pregnancies: '8',
      Glucose: '125',
      BloodPressure: '96',
      SkinThickness: '0',
      Insulin: '0',
      BMI: '0',
      DiabetesPedigreeFunction: '0.232',
      Age: '54',
      Outcome: '1' },

    { Pregnancies: '0',
      Glucose: '118',
      BloodPressure: '84',
      SkinThickness: '47',
      Insulin: '230',
      BMI: '45.8',
      DiabetesPedigreeFunction: '0.551',
      Age: '31',
      Outcome: '1' }
    ];

    var accuracy_a = dt_a.evaluate(test_data_a);                            //akurasi dari model tree
    var treeModel_a = dt_a.toJSON();                                        //model tree diconvert kedalam json
    console.log("Ini adalah test hasil prediksi :" , predicted_class_a);    //print hasil prediksi
    //console.log(accuracy_a);
    console.log(treeModel_a);
    console.log("---------------------------------------------------------")
    //console.log(td);

    //fs.writeFile('./message.txt', 'Hello Node.js' , 'utf8', callback);
    var model_tree =  JSON.stringify(treeModel_a);          //mengubah model_tree menjadi sebuah json
    fs.writeFile('./message.json', model_tree , (err) => {  //Menyimpan model tree berupa json ke dalam file message.json
        if (err) throw err;
        console.log('The file has been saved!');
      });
      
      fs.writeFile('./obj', treeModel_a , (err) => {  //Menyimpan model tree berupa json ke dalam file message.json
        if (err) throw err;
        console.log('The file has been saved!');
      });
    /**
     * [
     * 	{a:"1", b:"2", c:"3"},
     * 	{a:"4", b:"5". c:"6"}
     * ]
     */ 
})

exports.decision_tree = DecisionTree;


// Async / await usage
// const start = async function() {
//     global.jsonArray =await csv().fromFile(csvFilePath);
//     //console.log(jsonArray);
//     globals.set('jsondata',jsonArray, {forced: true});
//     return jsonArray;
// }


// start();
//var print = globals.get('jsondata');
//console.log("Ini global.jsonArray :" , global.jsonArray)


// var class_name_a = "Outcome";
// var features_a = ["Pregnancies", "Glucose","BloodPressure","SkinThickness","Insulin","BMI","DiabetesPedigreeFunction","Age"];
// var dt_a = new DecisionTree(data, class_name_a, features_a);
// var predicted_class_a = dt_a.predict({
//     Pregnancies: '6',
//     Glucose: '148',
//     BloodPressure: '72',
//     SkinThickness: '35',
//     Insulin: '0',
//     BMI: '33.6',
//     DiabetesPedigreeFunction: '0.627',
//     Age: '50'
// });

// var accuracy_a = dt_a.evaluate(test_data_a);
// var treeModel_a = dt_a.toJSON();
// console.log(predicted_class_a);
// console.log(accuracy_a);
// console.log(treeModel_a);