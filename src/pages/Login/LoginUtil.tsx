import { REST_BASE_URL } from "@constants/constants";

export const validateEmailAndPassword = (email: string, password: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^.{8,}$/;
    let retval: { valid: boolean, emailError?: string, passwordError?: string } = { valid:true };

    if (!emailRegex.test(email)) {
        retval.emailError = "Email format is invalid";
        retval.valid = false;
    }
    if (!passwordRegex.test(password)) {
        retval.passwordError = "Password must contain at least 8 characters";
        retval.valid = false;
    }
    return retval;
};

export const loginRequest = async (email: string, password: string): Promise<ServerResponse>  => {
    try {        
        const response = await fetch(`${REST_BASE_URL}/token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
            email: email,
            password: password,
            })
        });
        
        if (!response.ok) {
            const error = await response.json();            
            throw error;
            // TODO: Add interactive errors
        }
    
        const contentType = response.headers.get("Content-Type");
        if (contentType && contentType?.includes("application/json")) {
            const data: ServerResponse = await response.json();
            console.log(data);
            if(response.status != 200){
                console.log("Failed");
                // TODO: Add interactive errors
            }
            return data;
        } else {
            console.error(`Unexpected content type: ${contentType}`);
            return new ServerResponse();
        }
    } catch (error) {
        return new ServerResponse();
    }
}