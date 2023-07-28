import supabase from "../lib/supabase";

interface User {
    name: string,
    email: string,
    password: string
}

class SupabaseService {
    constructor() {
    }

    public async signup(name: string, email: string, password: string, picture_id: string) {

        const {data, error} = await supabase
            .from("users_table")
            .insert({
                name,
                email,
                password,
                picture_id
            });

        if (error) {
            throw new Error(error.message);
        }

        return data
    }

    public async login(email: string, password: string) {
        const {data, error} = await supabase
            .from("users_table")
            .select("*")
            .eq("email", email)


        if (error) {
            throw new Error(error.message);
        }

        return data;
    }
}

export default new SupabaseService();

