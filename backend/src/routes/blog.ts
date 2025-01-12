import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate';
import { decode, sign, verify } from 'hono/jwt'

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    }
}>();

// //take the token and extract the user id 
// blogRouter.use("/*",(c,next)=>{

//     next();
// })

blogRouter.post('/',async(c) => {
    const body = await c.req.json();
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const blog = await prisma.post.create({
        data:{
            title:body.title,
            content:body.content,
            authorId:'1'
        }
    })
    return c.json({
        id:blog.id
    })
})

blogRouter.put('/', async(c) => {
    const body = await c.req.json();
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const blog = await prisma.post.update({
        where:{
            id:body.id
        },
        data: {
            title: body.title,
            content: body.content
        }
    })
    return c.json({
        id: blog.id
    })
    
})

blogRouter.get('/', async(c) => {
    const body  =await  c.req.json();
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try{
        const blog  = await prisma.post.findFirst({
            where:{
                id:body.id
            },
        })
        return c.json({
            blog
        });
    }catch(err){
        c.status(411);
        return c.json({
            message:"error while fetching blog post"
        });
    }
   
})

blogRouter.get('/bulk',async(c)=>{
    
})