import { Carousel } from 'antd'
import React, { FunctionComponent } from 'react'
import './styles.scss'
import Packages from './packages'

export interface Props { }

const Home: FunctionComponent<Props> = () => {
  return (
    <>
      <Carousel autoplay autoplaySpeed={5000} className='mb--24' >
        <div >
          <div className='content_style' style={{ backgroundImage: 'url(https://images.hdqwalls.com/wallpapers/get-back-to-code-km.jpg)' }}></div>
        </div>
        <div >
          <div className='content_style' style={{ backgroundImage: 'url(https://i.imgur.com/JR8ilHf.jpg)' }}></div>
        </div>
        <div >
          <div className='content_style' style={{ backgroundImage: 'url(https://i.pinimg.com/originals/93/b3/77/93b37743f86030c989f116047a95ef19.jpg)' }}></div>
        </div>
        <div >
          <div className='content_style' style={{ backgroundImage: 'url(https://www.wallpaperup.com/uploads/wallpapers/2012/09/20/15537/6308362bb768cc6a787edf7463b41d5e-700.jpg)' }}></div>
        </div>
      </Carousel>
      <Packages /> 
    </>
  )
}

export default Home
