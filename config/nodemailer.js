const nodemailer = require("nodemailer");

class SmsSender {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "restart.parol@gmail.com", // Gmail account
        pass: "afmi hive vmhf ktff", // Gmail App password
      },
    });
  }

  // Emailni SMS gateway formatiga o‘girib, SMS yuborish
  async sendSms(email, message) {
    try {
      // Eslatma: email -> phoneNumber@example.com formatda bo‘lishi kerak
      const mailOptions = {
        from: "restart.parol@gmail.com",
        to: email,
        subject: "Auth confirm",
        html: `
  <div style="width: 100%; padding: 30px; background-color: #f4f6f8; font-family: Arial, sans-serif; color: #333;">
    <div style="max-width: 500px; margin: auto; background: #fff; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1); overflow: hidden;">
      <div style="background-color: #007bff; padding: 20px; text-align: center; color: #fff;">
        <h2 style="margin: 0;">Tasdiqlash Kodingiz</h2>
      </div>
      <div style="padding: 30px; text-align: center;">
        <p style="font-size: 16px;">Quyidagi kodni tizimga kirishda yoki ro‘yxatdan o‘tishda foydalaning:</p>
        <div style="font-size: 32px; font-weight: bold; margin: 20px 0; color: #007bff;">${message}</div>
        <p style="font-size: 14px; color: #666;">Agar bu siz emas bo‘lsangiz, ushbu xabarni e’tiborsiz qoldiring.</p>
      </div>
      <div style="background-color: #f1f1f1; padding: 15px; text-align: center; font-size: 12px; color: #999;">
        ⓒ ${new Date().getFullYear()} Restart Team. Barcha huquqlar himoyalangan.
      </div>
    </div>
  </div>
`,
      };

      const info = await this.transporter.sendMail(mailOptions);
      console.log("SMS yuborildi:", info.response);
    } catch (error) {
      console.error("Xatolik yuz berdi:", error);
    }
  }
}

module.exports = SmsSender;
