import { Router } from "express"
import { IUser, IUserRole } from "../database/models/interfaces/User.interface"
import { createUser} from "../database/actions/createUser.action"
import { loginUser } from "../database/actions/loginUser.action"
import { getSession } from "../database/actions/getSession.action"

const router = Router()


// for logib
router.post("/logup", async (req, res, next) => {
  try {
    if ([req.body.name, req.body.email, req.body.password].includes(undefined)) throw new Error("All fields are required")
    const myUser: IUser = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role ? req.body.role === IUserRole.ADMIN ? IUserRole.ADMIN : IUserRole.MODERATOR : IUserRole.MODERATOR
    }
    await createUser(myUser)
    res.json({
      "status": "success",
      "message": "User created successfully",
    }).status(201)
  }
  catch (error) {
    next({error})
  }
})


// for logup 

router.post("/login", async (req, res, next) => {
   try{
      if([req.body.email, req.body.password].includes(undefined)) throw new Error("All fields are required")
      const user = await loginUser({email: req.body.email, password: req.body.password})
      res.json({
         "status": "success",
         "message": "User logged in successfully",
         "jwt": user.jwt
      }).status(200)
   }catch(error){
      next({error})
   }  
})


// validate jwt and return the user object
router.get("/session", async (req, res, next) => {
  try {
    // get header authorization
    const authorization = req.headers.authorization
    if (authorization === undefined) throw new Error("Authorization header not found")
    const jwt = authorization.split(" ")[1]
    const user = await getSession({ token: jwt })
    res.json({
      "status": "success",
      "message": "User session retrieved successfully",
      "jwt": user.jwt
    }).status(200)
  } catch (error) {
    next({ error })
  }
})

/*
let errorMessage : string 
    if (typeof error === "object" && error instanceof Error) errorMessage = error.message
    else errorMessage = "An error occurred while creating the user. Please try again."
    return res.json({ "status": "error", "message": errorMessage }).status(400)    

*/

export default router;

