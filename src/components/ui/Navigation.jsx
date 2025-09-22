import { NavLink } from "react-router-dom";
import bookIcon from '@/assets/icons/book.svg';
import homeIcon from '@/assets/icons/home.svg';
import imageIcon from '@/assets/icons/image.svg';
import followersIcon from '@/assets/icons/followers.svg';
import notificationIcon from '@/assets/icons/notification.svg';

const iconStyle = { width: 20, height: 20, display: 'inline-block', verticalAlign: 'middle' };

function Navigation() {
  return (
    <nav className="NavigationLinks" style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <NavLink to="/" >
        <img src={homeIcon} alt="Home" style={iconStyle} />
      </NavLink>

      <NavLink to="/followers" >
        <img src={followersIcon} alt="Followers" style={iconStyle} />
      </NavLink>

      <NavLink to="/gallery" >
        <img src={imageIcon} alt="Gallery" style={iconStyle} />
      </NavLink>

      <NavLink to="/notifications" >
        <img src={notificationIcon} alt="Notifications" style={iconStyle} />
      </NavLink>

      <NavLink to="/guidlines" >
        <img src={bookIcon} alt="Library" style={iconStyle} />
      </NavLink>
    </nav>
  );
}

export default Navigation;
