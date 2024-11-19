const express = require("express");
const indexRouter = require("./routes/index");

const app = express();

app.use("/", indexRouter);




const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server listning on port ${PORT}`);
});
