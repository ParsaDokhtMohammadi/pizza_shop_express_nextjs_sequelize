export const notFound=((req , res , next)=>{
    return res.status(404).json({
        message : "route not found"
    })
})

export const errorHandle=((err, req , res , next)=>{
    const status = err?.status ?? 500
    const message = err?.message ?? "internal server error"
    return res.status(status).json({
        message : message
    })
})
