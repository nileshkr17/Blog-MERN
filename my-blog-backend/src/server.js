import fs from 'fs';
import admin from 'firebase-admin';
import express from 'express';
import {db,connectToDb} from './db.js';

const credentials = JSON.parse(fs.readFileSync('./credentials.json'));

admin.initializeApp({
    credential:admin.credential.cert(credentials),
});

const app = express();
app.use(express.json());


app.use(async(req,res,next)=>{
    const{authtoken}= req.headers;
    if(authtoken){
        try {
            req.user = await admin.auth().verifyIdToken(authtoken);
        } catch (error) {
            return res.sendStatus(400);
        }
    }
    req.user =req.user || {};
    next();
});

app.get('/api/articles/:name', async(req,res)=>{
    const {name} =req.params;
   const {uid} = req.user;

    const article = await db.collection('articles').findOne({name});
    if(article){
        const upvoteIds= article.upvoteIds || [];
        article.canUpvote = uid && !upvoteIds.includes(uid);
         res.json(article);
    }else{
        res.sendStatus(404);
      
    }

});



app.use((req,res,next)=>{
    if(req.user){
        next();

    }else{
        res.sendStatus(401);
    }
});

app.put('/api/articles/:name/upvote', async(req,res)=>{
    const {name}=req.params;
    const {uid}=req.user;
    const article = await db.collection('articles').findOne({name});
    if(article){
        const upvoteIds= article.upvoteIds || [];
        const canUpvote = uid && !upvoteIds.includes(uid);
            if(canUpvote){
                await db.collection('articles').updateOne({name},
                    {
                        $inc:{upvotes:1},
                        $push: {upvoteIds:uid}
                    
                    });
            }
    
    //wanna update an article with a given name and increment the upvotes by 1
   
        const updateArticle = await db.collection('articles').findOne({name});
        res.json(updateArticle);
    } else{
        res.sendStatus(404);
        res.send('Article not found ')
    }

})

app.post('/api/articles/:name/comments',async(req,res)=>{
        const {name}=req.params;    
        const {email} = req.user;
        const {text}=req.body;
       
        await db.collection('articles').updateOne({name},
            {
                $push:{comments:{postedBy:email,text}},
            });
            const article = await db.collection('articles').findOne({name});
        if(article){
            
            res.json(article);
            res.status(200);
        }
        else{
            res.status(404).json({message:'Article not found'});
            res.send(`The article named ${name} not found`);
            return;
        }    
});

connectToDb(()=>{
    console.log('Successfully connected to database!');
    app.listen(8000,()=>{
        console.log('Server is listening on port 8000');
    });
})

