import { hot } from 'react-hot-loader/root';
import { createElement } from 'react';
import { render } from 'react-dom';

import App from './app';

import './index.scss';

const Root = hot(App);

render(createElement(Root), document.getElementById('root'));
