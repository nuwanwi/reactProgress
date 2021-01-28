
  export default class ProgressOperation {

    static getProgressChangeValue(limit, completed , newValue ) {

      let progChangeVal=completed + newValue;

        if(progChangeVal <0){
            progChangeVal=0;
          }
    
          if(progChangeVal>=limit){
            progChangeVal=limit;
          }
    
        
        return progChangeVal;
      }

      static getProgressColour(progChangeVal ) {

        return progChangeVal >= 100 ? "#FF0000" : "#00695c";
        
      }
  }