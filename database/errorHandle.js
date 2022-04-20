//Class used to parse error codes from firebase
class ErrorHandle {

  static parseError(errorCode) {
    switch(errorCode) {
      case 'auth/email-already-in-use':
        return "Email in use already!"
      case 'auth/invalid-email':
        return "Invalid Email/Password"
      case 'auth/wrong-password':
        return "Invalid Email/Password"
      default:
        return "Something went wrong!"
    }
  }

  

}


module.exports = ErrorHandle;
