import { rest } from "msw";

const baseURL = "https://drf-api-pp-0ae57f00f3cd.herokuapp.com/";

export const handlers = [
    rest.get(`${baseURL}dj-rest-auth/user/`, (req, res, ctx) => {
        return res(
            ctx.json({
                pk: 2,
                username: "admin",
                email: "",
                first_name: "",
                last_name: "",
                profile_id: 2,
                profile_image:
                    "https://res.cloudinary.com/ddbihgvkh/image/upload/v1/media/../default_profile_ezt2rj",
            })
        );
    }),
    rest.post(`${baseURL}dj-rest-auth/logout/`, (req, res, ctx) => {
        return res(ctx.status(200));
    }),
];