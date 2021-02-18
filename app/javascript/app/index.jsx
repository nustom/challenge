import './assets/scss/global.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import toastr from 'toastr';

import Home from './Home';

//--------------------------------------------------------
// Global configurations
//--------------------------------------------------------
toastr.options = {
  positionClass : 'toast-top-full-width',
  hideDuration: 300,
  timeOut: 5000
}


document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Home />,
    document.body.appendChild(document.createElement('div'))
  )
})
