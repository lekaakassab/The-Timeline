const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://lolo:<db_password>@time-line-project.ampjlle.mongodb.net/")
.then( ()=> {
    console.log("DB is working")
}
)
.catch( err => {

    console.log(err);

})