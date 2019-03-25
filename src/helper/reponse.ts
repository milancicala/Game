export function formatActivityLogResponse(ActivityLog) {
    return {
        id: ActivityLog.id,
        userId: ActivityLog.user_id,
        description: ActivityLog.description,
        requestMethod: ActivityLog.method,
        requestRoute: ActivityLog.route,
        requestData: ActivityLog.data,
        responseCode: ActivityLog.code,
        ipAddress: ActivityLog.ip_address,
        calledAt: new Date(ActivityLog.created_at),
    };
}