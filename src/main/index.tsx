import React from 'react'
import ReactDOM from "react-dom/client";

import { Router } from '@/presentation/components'

import '@/presentation/styles/global.scss'

const root = ReactDOM.createRoot(document.getElementById("main") as HTMLElement);

import '@/presentation/styles/global.scss'

root.render(
  <Router />,
)
