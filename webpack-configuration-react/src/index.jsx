import React from "react";
import { createRoot } from 'react-dom';
import { App } from './App';

const rootElement = document.getElementById('root');
const container = createRoot(rootElement);
container.render(<App />)