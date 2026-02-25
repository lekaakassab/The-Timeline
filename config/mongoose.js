const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://lolo:fHZzjXiqlPwFwnZp@time-line-project.ampjlle.mongodb.net/")
.then( ()=> {
    console.log("DB is working")
}
)
.catch( err => {

    console.log(err);

})