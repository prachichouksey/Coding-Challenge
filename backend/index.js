const express = require("express");
const apiRouter = require("./route/fetchData");
const cors = require("cors");
const app = express();
const port = 5000;
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use("/api", apiRouter);

app.listen(port, () => console.log(`Server running on port ${port}`));
