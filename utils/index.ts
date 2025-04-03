export const maskPassword = (password: string) => {
    const pLen = password.length;
    let maskedPassword = '';
    let initialChar = '';
    let maskedChar = '';
    let endChar = '';

    const maskLogic = (startValue:number, midValue:number, endValue:number) => {
        initialChar = password.slice(startValue, midValue);
        maskedChar = password.slice(midValue, endValue).replace(/[a-zA-Z0-9!@#$%&*=]/g, "*");
        endChar = password.slice(endValue);
        maskedPassword = `${initialChar}${maskedChar}${endChar}`;
    }
    
    switch (pLen > 0) {
        case ((pLen == 4) || (pLen == 5)):
            maskLogic(0, 1, -1);
            break;
        case pLen > 5:
            maskLogic(0, 2, -2);
            break;
        default:
            initialChar = password.slice(0, 1);
            maskedChar = password.slice(1).replace(/[a-zA-Z0-9!@#$%&*=]/g, "*");
            maskedPassword = `${initialChar}${maskedChar}`;
            break;
    }


    return maskedPassword;
}

