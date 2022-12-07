import express from 'express';
//locakhost:8000/articles/{}

const app = express();
app.use(express.json());
let articleInfo=[{
    name: 'learn-react',
    upvotes: 1,
},
{
    name: 'learn-node',
    upvotes: 0,
},
{
    name: 'my-thoughts-on-resumes', 
    upvotes: 0,
}];

app.put('/api/article/:name/upvote',(req,res)=>{
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

app.get('/articles/:name/upvotes',(req,res)=>{
    const articleName = req.params.name;
    res.send(`Upvotes for ${articleName}`);

})

app.listen(8000,()=>{
    console.log('Server is listening on port 8000');
})