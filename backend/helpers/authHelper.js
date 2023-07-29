import bcrypt from "bcrypt";

// Function to create normal password to hashed Password
export const hashPassword = async(password) => {
    try {
        const saltRounds = 10;

        // This line coverts the password into hassed password
        const hashedPassword = await bcrypt.hash(password, saltRounds); 
        return hashedPassword
    } catch (error) {
        console.log(error)
    }
}

// Function to compare Password
export const comparePassword = async(password, hashedPassword) =>{
    
    // Compare function of bcrypt compares the password 
    return bcrypt.compare(password, hashedPassword);
}