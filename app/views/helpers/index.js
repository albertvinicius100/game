function toLower(str){
    return str.toLowerCase();
}
function toUpper(str){
    return str.toUpperCase();
}

function checked(currentValue, value){
    if(currentValue == value){
        return "checked";
    }else {
        return "";
    }
}

const printError = function (errors, field) {
    let mensagem;
    if (typeof errors != 'undefined') {
    errors.errors.forEach(error=> {
    if (error.path == field) {
        mensagem = error.message;
        return;
    }
    });
    return mensagem;
    }
    }

module.exports = { toLower, toUpper, checked, printError}
