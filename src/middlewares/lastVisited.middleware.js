
export const setLastVisited =(req,res,next)=>{

    //1.if cookie is set , then add a local variable with last visit time data.
    if(req.cookies.lastVisited){
        res.locals.lastVisited = new Date(
            req.cookies.lastVisited
        ).toLocaleString()
    }

    //2.if no cookie set then set a new one

    res.cookie('lastVisited',new Date().toISOString(),{
        maxAge: 2*24*60*60*1000
    })

    next();
};