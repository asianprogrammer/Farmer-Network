import Follower from '@/components/ui/Follower';
import profile from '@/assets/images/logo.png';
import '@/assets/styles/FollowerSuggest.css';

export default function FollowerSuggest() {
    return (
        <div className="follower-suggest">
            <h3 className='title'>ফলো করুন</h3>

            <section className="scrollViw">
                {[...Array(5)].map((_, item) => (
                    <Follower
                        key={item}
                        userid={Math.random().toString(36).substring(7)}
                        userprofile={profile}
                        username="John Doe"
                        mail="johnasdfadfasdfasdfasdfsadfdoe@gmail.com"
                        onFollow={(id, isFollowing) => alert(`User ${id} is now ${isFollowing ? 'followed' : 'unfollowed'}`)}
                    />
                ))}
            </section>
        </div>
    )
}