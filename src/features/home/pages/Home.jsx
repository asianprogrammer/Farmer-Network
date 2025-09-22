import FollowerSuggest from '@/components/layout/FollowerSuggest';
import CreatePost from '@/components/layout/CreatePost';
import profile from '@/assets/images/logo.png';
import '@/assets/styles/home.css';


export default function Home() {
    return (<>
        <FollowerSuggest />

        <section className="feed-area">
            <CreatePost
                user="John"
                profile={profile}
                onTextClick={() => alert("Text Clicked")}
                onPhotoVideoClick={() => alert("Photo/Video Clicked")}
                onFellingClick={() => alert("Feelings/Activity Clicked")}
            />

        </section>
    </>)
}