/**
 * enquiry controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::enquiry.enquiry', ({ strapi }) => ({

    async create(ctx) {

        await super.create(ctx);

        const { full_name, email, phone, desc, form_type } = ctx.request.body.data || {};

        try {
            await strapi.plugins['email'].services.email.send({
                to: 'adarshmishraa216@gmail.com',
                from: 'adarshmishraa216@gmail.com',
                replyTo: email,
                subject: `New Enquiry: ${full_name}`,
                html: `
                  <h3>New Enquiry Received</h3>
                  <p><strong>Source:</strong> ${form_type || 'Website'}</p>
                  <ul>
                    <li><strong>Name:</strong> ${full_name}</li>
                    <li><strong>Email:</strong> ${email}</li>
                    <li><strong>Phone:</strong> ${phone}</li>
                  </ul>
                  <p><strong>Description:</strong><br/>${desc || 'No message provided'}</p>
                `,
            });

            if (email) {
                await strapi.plugins['email'].services.email.send({
                    to: email,
                    from: 'adarshmishraa216@gmail.com',
                    subject: 'Thank you for contacting Leeds Private Hospital',
                    html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 10px; background-color: #ffffff;">
                        
                        <div style="text-align: center; margin-bottom: 30px;">
                            <img src="https://viredrive.s3.eu-north-1.amazonaws.com/uploads/LPH logo.png" alt="Leeds Private Hospital" style="max-width: 200px; height: auto;">
                        </div>

                        <h2 style="color: #c07f40; text-align: center; font-size: 22px; font-weight: bold; margin-bottom: 20px; line-height: 1.4;">
                            Hi ${full_name}, Thank You for Your Interest
                        </h2>

                        <p style="color: #333333; font-size: 16px; line-height: 1.6; margin-bottom: 15px; text-align: center;">
                            We truly appreciate your interest in <strong>Leeds Private Hospital</strong>.
                        </p>

                        <p style="color: #333333; font-size: 16px; line-height: 1.6; margin-bottom: 25px; text-align: center;">
                            A member of our team will reach out to you soon with further details regarding your enquiry.
                        </p>

                        <p style="color: #333333; font-size: 16px; line-height: 1.6; margin-bottom: 30px; text-align: center;">
                            Stay tuned for more updates at <br>
                            <a href="https://leedsprivatehospital.co.uk" target="_blank" style="color: #1d2350; text-decoration: none; font-weight: bold;">www.leedsprivatehospital.co.uk</a>.
                        </p>

                        <hr style="border: none; border-top: 1px solid #eeeeee; margin: 20px 0;">

                        <div style="text-align: center; color: #666666; font-size: 14px;">
                            <p style="margin: 5px 0;">Warm regards,</p>
                            <p style="margin: 5px 0; font-weight: bold; color: #333;">Leeds Private Hospital Team</p>
                        </div>
                    </div>
                    `,
                });
            }

            return {
                response: 'ok',
                message: 'Successfully submitted and Emails Sent'
            };

        } catch (err) {
            console.log('Email Error:', err);
            return ctx.badRequest('Email sending failed', { error: err });
        }
    }
}));