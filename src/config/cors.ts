import { CorsOptions } from "cors";

export const corsConfig: CorsOptions = {
    origin(requestOrigin, callback) {
        const whiteList = [process.env.FRONTEND_URL];

        if (whiteList.includes(requestOrigin)) {
            callback(null, true);
        } else {
            callback(new Error("CORS errors"));
        }
    },
};
