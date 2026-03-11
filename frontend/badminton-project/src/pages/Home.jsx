

import React from 'react'
import Carousel from 'react-bootstrap/Carousel';

// react icons ----
import { BsFillTrophyFill } from "react-icons/bs";
import "../style/globel.css"
import {  useNavigate } from 'react-router';
import { MdAdminPanelSettings } from "react-icons/md";


function Home() {
    const navigate = useNavigate();
    return (
        <>
            <div className='home-div'>
                <div className='carosel'>
                    <Carousel>
                        <Carousel.Item>
                           <img src="https://images.unsplash.com/photo-1626721105368-a69248e93b32?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                            <Carousel.Caption>
                                <h3>First slide label</h3>
                                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                          <img src="https://images.unsplash.com/photo-1708312604073-90639de903fc?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                            <Carousel.Caption>
                                <h3>Second slide label</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                           <img src="https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                            <Carousel.Caption>
                                <h3>Third slide label</h3>
                                <p>
                                    Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                                </p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>
                </div>
                <div className='sections'>


                    <div className='sections-items' onClick={()=>navigate('/tournaments')}>
                        <BsFillTrophyFill className='sections-icon' />
                        <p className='sections-text' >
                            Tournaments
                        </p>

                    </div>

                    <div className='sections-items' onClick={()=>navigate('/admin')}>
                        <MdAdminPanelSettings className='sections-icon' />

                        <p className='sections-text' >
                            Admin
                        </p>
                    </div>

                   
                </div>
            </div>
        </>
    )
}

export default Home
