import React from 'react'
import ReactDOM from "react-dom/client";

import { Router } from '@/presentation/components'

const root = ReactDOM.createRoot(document.getElementById("main") as HTMLElement);

import '@/presentation/styles/global.scss'

root.render(
  <Router />,
)
