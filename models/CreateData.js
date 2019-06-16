const names = ["shirt-girl", "tshirt-girl", "shirt-man", "tshirt-man", "sport", "fashion"]
const names2 = ["Nike", "Adidas", "Levis", "Gucci", "Calvin Klein", "Puma", "Versace", "Victoria's Secret", "ZARA", "Louis Vuitton"];
const names3 = ["Cương", "Bảo", "Châu"]

function GetCurrentDate() {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  today = mm + '/' + dd + '/' + yyyy;

  return today
}

class Creater {
  constructor(){}
  createProduct(){
    var array = []
    for (i = 0; i < 8; i++)
    {
      names.map(name => array.push(({
          Image: name + "-" + i + ".jpg",
          Name: name,
          Category: name,
          Gender: getGender(name),
          Color: "White and Red",
          Cost: "50.5",
          Discount: "10",
          Amount: "5",
          Describe: "Made in VietNam",
          Size: "XL",
          Product_Group: 'New'
      })))
    }
    return array
  }
  createManufacturer() {
    var array = []
    names2.map(name => array.push(({
        Name: name,
        Address: "Địa chỉ của " + name,
        PhoneNumber: Math.floor(Math.random() * 1000000).toString(),
        Description: "Không"
    })))
        return array
  }

  createOrder(productArray, sum) { 
    var array = []
    names3.map(name => array.push(({
        Description: "Không",
        CustomerId: "id cua" + name,
        OrderDate: GetCurrentDate(),
        Products: productArray,
        ReceiverPhonenumber: Math.floor(Math.random() * 1000000).toString(),
        ReceiverAddress: "Địa chỉ của " + name,
        ReceiverName: name,
        Sum: sum
    })))
  return array
  }
};

function getGender(name) {
  if(name.indexOf("girl") === -1) {
    return "Woman"
  } else if (name.indexOf("man") === -1) {
    return "Man"
  } else if (name.indexOf("sport") === -1) {
    return "Sport"
  }
}

let creater = new Creater()
module.exports = creater
