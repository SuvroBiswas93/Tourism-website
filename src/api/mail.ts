export type Mail = {
    name : string,
    email: string,
    message: string
}
const apiBase = import.meta.env.VITE_APP_API_URL || 'https://simple-mail-send-service.vercel.app';
export async function sendMail({name, email, message} : Mail) {
    if(!apiBase)  {
        console.error("No api url found");
        return;
    }
    const response = await fetch(`${apiBase}/contact`, {
        method:"POST",
        body: JSON.stringify({name, email, message}),
        headers: {
            "Content-Type":"application/json"
        }
    });
    return await response.json();
    
}