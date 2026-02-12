"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(prevState: any, formData: FormData) {
    try {
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const message = formData.get("message") as string;

        if (!name || !email || !message) {
            return { success: false, error: "Please fill in all fields.", message: undefined };
        }

        const { data, error } = await resend.emails.send({
            from: "onboarding@resend.dev", // Or your verified domain
            to: "mnifanmohdariff@gmail.com",
            replyTo: email,
            subject: `New Contact Form Submission from ${name}`,
            text: message, // Plain text fallback
            html: `
        <p><strong>From:</strong> ${name} (${email})</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
        });

        if (error) {
            console.error("Resend Error:", error);
            return { success: false, error: error.message || "Failed to transmit.", message: undefined };
        }

        return { success: true, message: "Transmission successful.", error: undefined };
    } catch (err: any) {
        console.error("Server Action Error:", err);
        return { success: false, error: "An unexpected error occurred.", message: undefined };
    }
}
