import React from 'react'
import { Image } from '@chakra-ui/react'
import btcSrc from "../assets/btc.png"
import { motion } from 'framer-motion'
import "../styles/Home.css"

function Home() {
    return (
        <div className='home-container'>
            <h2>ExchangeP</h2>
            <div className='logo-box'>
                <motion.div style={{ height: "80vh" }} animate={{ translateY: "20px" }} transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }} >
                    <Image w={"full"} h={"full"} objectFit={"contain"} src={btcSrc} filter={"grayscale(1)"}/>
                </motion.div>
            </div>
        </div>
    )
}

export default Home