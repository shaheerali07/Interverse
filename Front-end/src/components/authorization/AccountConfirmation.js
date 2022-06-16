import React, { useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Api from '../../api/Api';
import { userActivateApi } from '../../constants';

export default function AccountConfirmation() {
  const { id } = useParams();
  useEffect(() => {
    // make api call
    Api.get(`${process.env.REACT_APP_BASE_URL}${userActivateApi(id)}`);
  }, []);

  return (
    <div className='container'>
      <Card bg='Light' border='info' style={{ marginTop: '10rem' }}>
        <Card.Header>Thank you for registering</Card.Header>
        <Card.Body>
          <Card.Title>Your account is successfully registered</Card.Title>
          <Card.Text>You can now sign in.</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}
