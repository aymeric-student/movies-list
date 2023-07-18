import supabase from "../lib/supabase"; // Renommez le module supabase


interface User {
    name: string,
    email: string,
    password: string
}

class SupabaseService {
    constructor() {
    }

    public async signup(name: string, email: string, password: string) {
        const {data, error} = await supabase
            .from("users_table")
            .insert({
                name,
                email,
                password
            });

        if (error) {
            throw new Error(error.message);
        }
    }

    public async login(email: string, password: string) {
        const {data, error} = await supabase
            .from("users_table")
            .select("*")
            .eq("email", email)

        if (error) {
            throw new Error(error.message);
        }

        /*console.log("je suis la")*/

        /*localStorage.setItem('isLoggedIn', 'true');*/
        return data;
    }
}

export default new SupabaseService();

