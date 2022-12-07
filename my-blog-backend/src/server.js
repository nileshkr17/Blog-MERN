import express from 'express';
import {db,connectToDb} from './db.js';
const app = express();
app.use(express.json());

app.get('/api/articles/:name', async(req,res)=>{
    const {name} =req.params;
   
    const article = await db.collection('articles').findOne({name});
    if(article){
         res.json(article);
    }else{
        res.sendStatus(404);
    }

});



app.put('/api/articles/:name/upvote', async(req,res)=>{
    const {name}=req.params;
    
    await db.collection('articles').updateOne({name},
        {
            $inc:{upvotes:1}
        
 });
    //wanna update an article with a given name and increment the upvotes by 1
   
        const article = await db.collection('articles').findOne({name});
    if(article){
        res.send(`The ${name} article now has ${article.upvotes} upvotes`);
        res.status(200);
    } else{
        res.sendStatus(404);
    }

})

app.post('/api/articles/:name/comments',async(req,res)=>{
        const {name}=req.params;    
        const {postedBy,text}=req.body;
       
        await db.collection('articles').updateOne({name},
            {
                $push:{comments:{postedBy,text}},
            });
            const article = await db.collection('articles').findOne({name});
        if(article){
            
            res.send(article.comments);
        }
        else{
            res.status(404).json({message:'Article not found'});
            res.send(`The article named ${name} not found`);
        }    
});

connectToDb(()=>{
    console.log('Successfully connected to database!');
    app.listen(8000,()=>{
        console.log('Server is listening on port 8000');
    });
})

