
import { urlFor } from 'libs/client';
const HeroBanner = ({herobanner}) => {
 
  return (
    <div className='hero-banner-container'>
    <div>
        <p className='beats-solo'>{herobanner.smallText}</p>
        <h3>{herobanner.midText}</h3>
        <h1>{herobanner.largeText1}</h1>
        <img src={urlFor(herobanner.image)} alt='headphhones' className='hero-banner-image' />
       
        <button className='hero-banner-button' type='button'>{herobanner.buttonText}</button>
        
        <div className='desc'>
        <h5>Description</h5>
        <p>{herobanner.desc}</p>
        </div>
    </div>
    </div>
  )
}

export default HeroBanner