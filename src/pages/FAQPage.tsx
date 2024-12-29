import { FC } from 'react'
import TopMenu from '../components/UI/TopMenu/TopMenu';
import FAQ from '../components/FAQ/FAQ';

const FAQPage: FC = () => {
    return (
        <div className='w-full'>
            <TopMenu/>
            <div className="p-1 md:p-5">
                <FAQ />
            </div>
        </div>
    )
}

export default FAQPage;