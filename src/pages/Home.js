import mainPic from "../assets/images/main.png"; 

export default function Home() {
    return (
        <div className="home-container">
            <header className="hero-header">
                <div className="hero-content">
                    <div className="hero-text">
                        <h2 className="hero-title">Cooking Made Fun and Easy: Unleash Your Inner Chef</h2>
                        <p className="hero-description">Discover recipes in your hand with the best recipe. Help you to find the easiest way to cook.</p>
                        <button className="hero-btn">
                            Explore Recipes
                            <i className="fas fa-arrow-right"></i>
                        </button>
                    </div>
                    <div className="hero-image">
                        <img src={mainPic} alt="main" />
                    </div>
                </div>
            </header>
        </div>
    );
}