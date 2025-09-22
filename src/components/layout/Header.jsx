import Brand from '@/components/ui/Brand';
import Search from '@/components/ui/Search';
import Navigation from '@/components/ui/Navigation';
import Menu from '@/components/ui/Menu';

import '@/assets/styles/Header.css';

function Header() {
    return (<div className='header'>
        <div className='group'>
            <Brand />
            <Search />
        </div>

        <Navigation />
        <Menu />
    </div>)
}

export default Header