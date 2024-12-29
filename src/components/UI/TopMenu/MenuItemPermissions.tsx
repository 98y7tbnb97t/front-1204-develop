import { FC } from 'react'
import { ITopMenu } from '../../../models/ITopMenu';

interface MenuItemPermissionsProps {
    item: ITopMenu,
    className?: string,
    onClick?: () => void,
}

const MenuItemPermissions: FC<MenuItemPermissionsProps> = ({item, className, onClick}) => {

    const trainerEditedCount = Array.isArray(item.editedCount) && item.editedCount[0]
    const studentEditedCount = Array.isArray(item.editedCount)
        ? item.editedCount[1]
        : item.editedCount
    return (
        <>
            <div onClick={onClick} className={['cursor-pointer bg-gradient-top-menu-item text-[#353535] sm:flex items-center justify-center text-xl py-1 xl:py-5 px-2 rounded-full font-bold whitespace-pre-wrap text-center relative', className].join(' ')}>
                {item.name} <span className='text-blue-600'>{item.counter}</span>
                {
                    item.editedCount ?
                        <>

                            {
                                !!(trainerEditedCount)  &&
                                    <span
                                        className={'absolute top-0 left-0 w-[25px] h-[25px] rounded-full bg-blue-600 text-white text-[18px] flex items-center justify-center'}>{trainerEditedCount}</span>
                            }
                            {
                                !!(studentEditedCount) &&
                                <span
                                className={'absolute top-0 right-0 w-[25px] h-[25px] rounded-full bg-red-600 text-white text-[18px] flex items-center justify-center'}>
                                        {studentEditedCount}
                                    </span>
                            }
                        </>

                        : null
                }
            </div>
        </>
    )
}

export default MenuItemPermissions;