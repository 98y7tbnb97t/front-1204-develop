


export const isMobileMenuHidden = ({groupId}: {groupId?: string},pathname: string) => {
    const hidePagePaths = ['messenger/chat',`homework/${groupId || 'undefined'}`]

    return hidePagePaths.some(item => pathname.includes(item))

}