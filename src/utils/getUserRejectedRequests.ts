import {EditRequest, User} from "../models/User.ts";

export const getUserRejectedRequests = (user: User,item: EditRequest) => {
    return item.rejectedAt &&
        !user?.editRequest?.find(req => item.field === req.field && !req.rejectedAt)
}