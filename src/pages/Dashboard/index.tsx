import React from 'react';
import {AuthService} from 'services/auth.service';
import Container from 'typedi';
export default function Dashboard() {
  const authServices = Container.get(AuthService);
  const infoUser = authServices.getUser();
  console.log({infoUser});

  return <div>Dashbord</div>;
}
