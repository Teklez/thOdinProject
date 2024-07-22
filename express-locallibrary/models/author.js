const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const {DateTime} = require("luxon");

const AuthorSchema = new Schema({
    first_name:{type:String, required:true, maxLength:100},
    family_name:{type:String, required:true, maxLength:100},
    date_of_birth:{type:Date},
    date_of_death:{type:Date},
})


// Virtual for author's full name

AuthorSchema.virtual("name").get(function(){

    let fullname = "";
    if(this.first_name && this.family_name){
        fullname = `${this.family_name}, ${this.first_name} `;
    }

    return fullname;
});

// Virtual for author's URL
AuthorSchema.virtual("url").get(function(){
    return `/catalog/author/${this._id}`;
});


const formatDate = (stringDate) => {
    console.log("date" , stringDate);
    if (stringDate === undefined){
        return "";
    }
    // Parse the date
    const date = DateTime.fromJSDate(new Date(stringDate));
    // Format the date
    const formattedDate = date.setLocale('en').toFormat('MMM d, yyyy');

    return formattedDate;
}




// Virtual for author's lifespan
AuthorSchema.virtual("lifespan").get(function(){
    const birth = formatDate(this.date_of_birth);
const death = formatDate(this.date_of_death);
    return `${birth} - ${death}`;
})




module.exports = mongoose.model("Author", AuthorSchema);