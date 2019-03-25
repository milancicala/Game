// dependencies
import { Controller, Get } from '@nestjs/common';
import * as moment from 'moment';
// models
import database from '../../models';
// helper
import { formatActivityLogResponse } from '../../helper/reponse';

@Controller('activity-logs')
export class ActivityLogController {

    @Get('/calls')
    /**
     * List of all activity logs with day - Monday
     *
     *
     * @returns Array || Error
     * @author MC
     */
    async getActivityLogs() {
        try {
            const ActivityLogs = (await database.ActivityLog.findAll({
                attributes: ['id', 'user_id', 'description', 'route', 'data', 'ip_address', 'code', 'created_at'],
                rejectOnEmpty: false,
            })).filter(ActivityLog => (moment(ActivityLog.created_at).format('dd') === 'Mo'));

            return ActivityLogs.map(ActivityLog => formatActivityLogResponse(ActivityLog));
        } catch (e) {
            throw Error(e);
        }
    }
}
