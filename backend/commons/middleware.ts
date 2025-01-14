import { Hono, Next } from 'hono';
import {decode, verify} from 'hono/jwt';
import { createMiddleware } from 'hono/factory';


export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    },
    Variables:{
        userId:Number
    }
}>();


export const  jwtDecodeandVerify = createMiddleware(async (c:any,next:Next)=>{
    if(c.req.header("Authorization")){
        try{
            const token = c.req.header("Authorization").split(" ")[1];
            if(!token){
                return c.text("Invalid Authorization header",401);
            }
            const user =await verify(token,c.env.JWT_SECRET)
            const decoded = decode(token);
            if(decoded?.payload?.id){
                c.set("userId",decoded.payload.id);
                await next();
            }else{
                return c.next("Invalid token:Missing userId",401)
            }
            
        }catch(error){
            return c.text(`Token decoding failed`,401);
        }
    }else{
        return c.text("Not Authorized")
    }
})