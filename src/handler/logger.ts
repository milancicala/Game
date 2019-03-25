// dependencies
import { Request, Response} from 'express';
// models
import database from '../models';

/**
 * Log of all request after response
 *
 * @param request
 * @param response
 *
 * @returns
 * @author MC
 */
export default async function logger(request: Request, response: Response) {
    let data = {
        body: {},
        params: {},
    };

    if (Object.getOwnPropertyNames(request.body)) {
        data.body = request.body;
    }

    if (Object.getOwnPropertyNames(request.params)) {
        data.params = request.params;
    }

    await database.ActivityLog.create({
        user_id:     null, // temporary
        description: DESCRIPTION[request.route.path] || '',
        method:      request.method,
        route:       request.originalUrl,
        data,
        ip_address:  request.headers.host,
        code:        response.statusCode,
    });
}

const DESCRIPTION = {
    // games
    '/games': 'View all games',

    // activity logs
    '/activity-logs/calls': 'View all activity logs created at Monday',
};