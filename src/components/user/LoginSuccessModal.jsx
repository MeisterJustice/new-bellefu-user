import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import {useHistory } from 'react-router-dom';

const SuccessModal = (props) => {
  const history = useHistory()
    const onVerification = () => {
      history.push('/')
      window.location.reload()
    }

    const onHome = () => {
      history.push('/')
      window.location.reload()
    }
  
    return (
      <>
  
        <Modal
          show={props.show}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title style={{textAlign: 'center', fontSize: '20px'}}>{props.welcome} {props.name}, {props.welcome2}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
                    {!props.isVerified && (

                        <Button onClick={onVerification} className="mt-4 cursor" style={{borderColor: '#ffa500', backgroundColor: '#ffa500', color: 'white'}} size="lg" block>
                            {props.browse}
                        </Button>
                    )}
                    {props.isVerified && (

                        <Button onClick={onHome} className="mt-4 cursor" style={{borderColor: '#ffa500', backgroundColor: '#ffa500', color: 'white'}} size="lg" block>
                            {props.browse}
                        </Button>
                    )}
            </div>
          </Modal.Body>
        </Modal>
      </>
    );
  }

  export default SuccessModal
