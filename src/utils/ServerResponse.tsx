class ServerResponse  {
    message: string;
    valid: boolean;
    data: any;
  
    constructor(message: string = "Server error", valid: boolean | string = false, data: any = null) {
        this.message = message;
        this.data = data;
        
        if (typeof valid === 'boolean'){
            this.valid = valid;
        } else{
            this.valid = valid === "true";
        }
    }
  }