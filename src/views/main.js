function deleteProduct(id){
    const res = confirm("Are you sure you want to delete this product?");

    if(res){
        fetch('/delete-product/'+id,{
            method:'POST'
        }).then(res => {
            if(res.ok){
                location.reload()
            }
        })
    }
}