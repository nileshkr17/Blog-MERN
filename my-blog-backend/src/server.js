import express from 'express';
//locakhost:8000/articles/{}

const app = express();
app.use(express.json());
let articleInfo=[{
    name: 'learn-react',
    upvotes: 1,
    comments: [],
},
{
    name: 'learn-node',
    upvotes: 0,
    comments: [],
},
{
    name: 'my-thoughts-on-resumes', 
    upvotes: 0,
    comments: [],
}];

app.put('/api/articles/:name/upvote',(req,res)=>{
    const {name}=req.params;
    const article = articleInfo.find((article)=>article.name===name);
    if(article){
        article.upvotes+=1;
        res.send(`The ${name} article now has ${article.upvotes} upvotes`);
        res.status(200).json({message:'Upvote successful',article});
    } else{
        res.status(404).json({message:'Article not found'});
    }

})

app.post('/api/articles/:name/comments',(req,res)=>{
        const {name}=req.params;    
        const {postedBy,text}=req.body;
        const article = articleInfo.find((article)=>article.name===name);
        if(article){
            article.comments.push({postedBy,text});
            res.send(article.comments);
        }
        else{
            res.status(404).json({message:'Article not found'});
            res.send(`The article named ${name} not found`);
        }
        

});



app.listen(8000,()=>{
    console.log('Server is listening on port 8000');
})