function generateOtp() {
    return Math.floor(Math.random() * 1000);
  }
  module.exports=generateOtp