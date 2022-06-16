import React, { useContext, useEffect, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import Posts from './posts';

export default function Feed(props) {
  return (
    <>
      <Row>
        <Col lg='12' className='d-flex justify-content-center'>
          <Button variant='light'>Create Post</Button>
        </Col>
        <Col lg='12' className='d-flex justify-content-center mt-3 postDiv'>
          <h1>Posts</h1>
          <Posts />
        </Col>
      </Row>
    </>
  );
}
