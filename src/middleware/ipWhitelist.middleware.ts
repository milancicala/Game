// dependencies
import { Injectable, NestMiddleware } from '@nestjs/common';
import * as requestIP from 'request-ip';
// models
import database from '../models';

@Injectable()
export class IpWhitelistMiddleware implements NestMiddleware {
    resolve(...args: any[]) {
        return async (req, res, next) => {
            const clientIP = getClientIP(req);

            if (!clientIP) {
                console.error('[Middleware :: API] Could not get IP.');

                return res.status(401).send({
                    code: 1001,
                    message: 'Unauthorized',
                });
            }

            try {
                console.info('[Middleware :: API] IP ->' + clientIP);

                await isIPWhitelisted(clientIP, 'API');

                return next();
            } catch (error) {
                return res.status(401).send({
                    code: 1001,
                    message: 'Unauthorized',
                });
            }
        };
    }
}

/**
 * Check whether the IP is whitelisted
 *
 * @param clientIp
 * @param type
 *
 * @returns boolean
 * @author MC
 */
async function isIPWhitelisted(clientIp, type) {
    try {
        const IPWhitelist = await database.IPWhitelist.findOne({
            where: {
                ip_address: clientIp,
                type,
            },
            // rejectOnEmpty: true,
        });

        return true;
    } catch (error) {
        throw error;
    }
}

/**
 * Get client IP from request
 *
 * @param req
 *
 * @returns String
 * @author MC
 */
function getClientIP(req) {
    let clientIP = requestIP.getClientIp(req);

    if (clientIP.indexOf('::ffff:') === 0) {
        clientIP = clientIP.substr(7);
    }

    return clientIP;
}