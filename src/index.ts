import express from "express"
import loginRouter from "./routes/auth.route"
import productRouter from "./routes/product.route"

const app = express()

app.use("/auth", loginRouter)
app.use("/product", productRouter)

app.listen(3000, () => {
  console.log("Server is running on port 3000")
})


