import '@/assets/styles/createPost.css';
import ImageIcon from '@/assets/IconComponents/image';

function CreatePost({ user, profile, onTextClick, onPhotoVideoClick, onFellingClick }) {
    return (
        <div className="createPost">
            <section className="flex FY-center MB-1rem">
                <div className="profile">
                    <img src={profile} alt="user profile" />
                </div>
                <div className="text" onClick={onTextClick}>
                    <span>
                        {`What's on your mind, ${user}?`}
                    </span>
                </div>
            </section>

            <section className="flex FY-center MB-1rem">
                <div className="flex F-center flex FY-center mediaPostOptions" onClick={onPhotoVideoClick}>
                    <ImageIcon stroke='#4ade80' />
                    <span>Photo/Video</span>
                </div>

                <div className="flex F-center flex FY-center fellingPostOption" onClick={onFellingClick}>
                    <div>😊</div>
                    <span>Feeling/Activity</span>
                </div>
            </section>
        </div>
    );
}

export default CreatePost;