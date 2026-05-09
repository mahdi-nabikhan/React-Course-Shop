import rules from "./rules"
const validator = (value,validations)=>{
    console.log(value,validations)
    let validationsResults =[]
    for (const validator of validations){
        if (validator.value === rules.requiredValue){
            value.trim().length ===0 && validationsResults.push(false)

        }
        if (validator.value === rules.minValue){
            value.trim.lenght < validator.min && validationsResults.push(false)
        }

        if (validator.value === rules.maxValue){
            value.trim().lenght > validator.max && validationsResults.push(false)
        }
        if (validator.value === rules.emailValue){
            value.trim().includes ("@") && validationsResults.push(false)
        }
    }
    if (validationsResults.length){
        return true
    }else{
        return false
    }
}
export default validator

