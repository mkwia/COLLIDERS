import './Jumbotron.css';
import collidersTeaser from '../images/collidersteaser.gif';

function Jumbotron() {
    return (
        <section className='jumbotron'>

            <div className='jt-container'>
                <div className='jt-image'>
                    <img src={collidersTeaser} alt='Gallery of COLLIDERS' />
                </div>
                <div className='jt-content'>
                    <h1>COLLIDERS</h1>
                    <p>
                        Colliders are a collection of 500 Generative Art pieces inspired by particle accelerators.
                    </p>
                    <p>
                        The higher the ID of your COLLIDER, the more spokes it will have and the more intricate organic shape it will draw.
                    </p>
                    <p>
                        <i>This is a Final Year Project for Computer Science at UWE Bristol.</i>
                    </p>
                    <p>
                        We appreciate the FTM protocol and community for providing such a great environment for artists and creators, at low fees!
                    </p>
                </div>
            </div>
        </section>
    )
}

export default Jumbotron;