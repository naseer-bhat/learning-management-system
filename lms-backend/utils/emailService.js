import axios from "axios";
export const sendEmail = async ({ to, subject, text, html }) => {
  try {
    const response = await axios.post(
      "https://microservices-kccr.onrender.com/api/sendmail",
      {
        to,
        subject,
        text,
        html,
      },
      { headers: { "x-api-key": process.env.EMAIL_SERVICE_KEY } }
    );
    return response.json();
  } catch (error) {
    return error.message;
  }
};
