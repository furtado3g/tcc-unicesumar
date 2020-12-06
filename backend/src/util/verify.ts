class Verify{
    verifyNullIncommingFields(values:any){
        let returnable = true
        Object.keys(values).forEach(key=>{
            if(values[key] == undefined || values[key] == 'null' || values[key] == ''){
                returnable = false
            }   
        })
        return returnable
    }
}
export default Verify