import React from 'react';
import {Link} from 'react-router-dom';
import {Container} from 'react-bootstrap';
import HeaderNav from '../navigations/HeaderNav';

export default function LegalPage() {
    return (
        <div>
            <HeaderNav />
            <Container>
                {/* =====DESKTOP VIEW==== */}
                <div
                    className=" d-none d-lg-block  d-md-none"
                    style={{maxWidth: '700px', margin: 'auto', marginTop: '20%'}}>
                    <Link to="/policy" style={{color: 'inherit', textDecoration: 'inherit'}}>
                        <p style={{fontWeight: 'bold', color: '#ffa500'}}>Policy and Privacy</p>
                    </Link>
                    <Link to="/terms&condition" style={{color: 'inherit', textDecoration: 'inherit'}}>
                        <p style={{fontWeight: 'bold', color: '#ffa500', marginBottom: '50%'}}>Terms and Conditions</p>
                    </Link>
                </div>
                {/* =====MOBILE VIEW==== */}
                <div
                    className=" d-lg-none  d-xs-block d-sm-block d-md-block "
                    style={{maxWidth: '700px', margin: 'auto', marginTop: '50%'}}>
                    <Link to="/policy" style={{color: 'inherit', textDecoration: 'inherit'}}>
                        <p style={{fontWeight: 'bold', color: '#ffa500'}}>Policy and Privacy</p>
                    </Link>
                    <Link to="/terms&condition" style={{color: 'inherit', textDecoration: 'inherit'}}>
                        <p style={{fontWeight: 'bold', color: '#ffa500', marginBottom: '50%'}}>Terms and Conditions</p>
                    </Link>
                </div>
            </Container>
        </div>
    );
}
