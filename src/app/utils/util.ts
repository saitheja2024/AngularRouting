export const genrateCaptchaCode = () => {
    const captchNum1 = Math.floor(Math.random() * 10) + 1;
    const captchNum2 = Math.floor(Math.random() * 10) + 1;
    const captchNumResult = captchNum1 + captchNum2;
    return [captchNum1, captchNum2, captchNumResult];
 }

 export const formatPhoneNumber = (data:any) => {

  if(!data){
    return data;
  }
    const length = data.length;
    data = data.replace(/\D/g, '');
    
    if (length <= 3) {
      data = '(' + data;
    } else if (length <= 6) {
      data = '(' + data.slice(0, 3) + ') ' + data.slice(3);
    } else {
      data = '(' + data.slice(0, 3) + ') ' + data.slice(3, 6) + '-' + data.slice(6, 10);
    }
    return data;
  }