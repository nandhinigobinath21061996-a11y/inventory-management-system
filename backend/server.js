const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db")
const authRoutes = require("./routes/authRoutes")
const productRoutes = require("./routes/productRoutes")
const supplierRoutes = require("./routes/supplierRoutes");
const purchaseRoutes = require("./routes/purchaseRoutes");
const saleRoutes = require("./routes/saleRoutes");
const reportRoutes = require("./routes/reportRoutes");



dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/products",productRoutes);
app.use("/api/suppliers", supplierRoutes);
app.use("/api/purchases", purchaseRoutes);
app.use("/api/sales", saleRoutes);
app.use("/api/purchases", purchaseRoutes);
app.use("/api/sales", saleRoutes);
app.use("/api/reports", reportRoutes);

app.get("/",(req,res)=>{
    res.send("Inventory ManagementAPI Running");
});

const PORT = process.env.PORT;

app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`);
})