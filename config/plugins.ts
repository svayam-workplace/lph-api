import type { Core } from '@strapi/strapi';

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Plugin => ({
    email: {
        config: {
            provider: 'nodemailer',
            providerOptions: {
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                    user: 'adarshmishraa216@gmail.com', 
                    pass: 'diqy jzuw ocre baha', 
                },
            },
            settings: {
                defaultFrom: 'adarshmishraa216@gmail.com',
                defaultReplyTo: 'adarshmishraa216@gmail.com',
            },
        },
    },
});

export default config;