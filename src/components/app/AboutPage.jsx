import React from 'react';
import HeaderNav from '../navigations/HeaderNav';

export default function AboutPage() {
    return (
        <div>
            <HeaderNav/>
            <section id="about" className="text-center d-block">
                <div className="container">
                    <div>
                        {/* DESKTOP VIEW */}
                        <h3
                             className=" d-none d-lg-block  d-md-none"
                            style={{color: '#ffa500', marginTop: '10%', paddingBottom: '10px'}}>
                            <u>About Us</u>
                        </h3>
                        {/* MOBILE VIEW */}
                        <h3
                            className=" d-lg-none  d-xs-block d-sm-block d-md-block "
                            style={{color: '#ffa500', marginTop: '30%', paddingBottom: '10px'}}>
                            <u>About Us</u>
                        </h3>
                        <p>
                            Bellefu.com is a dynamic online marketplace dedicated to agriculture related activities
                            ensuring farmers, buyers and sellers of agricultural products have direct contact with other
                            agro-allied providers and manufacturing industries around the world. Bellefu is designed to
                            make searching for agro products available at your fingertips.
                        </p>
                        <p>Simply register,upload your products and start interacting with our diverse subscribers.</p>

                        <h3 style={{color: '#ffa500', paddingTop: '5%', paddingBottom: '10px'}}>
                            {' '}
                            <u>OUR MISSION</u>
                        </h3>
                        <p>To create a borderless agricultural community across the globe.</p>
                        <h3 style={{color: '#ffa500', paddingTop: '5%', paddingBottom: '10px'}}>
                            {' '}
                            <u>OUR VISION</u>
                        </h3>
                        <p>
                            To connect farmers and others in the value chain leading to sustainable healthy life style
                            through food and allied product.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}
