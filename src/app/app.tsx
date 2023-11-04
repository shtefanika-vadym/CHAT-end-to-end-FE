import { withProviders } from 'app/hoks'
import { Routes } from 'app/routes'

import './style/index.css'

const App = () => {
  return (
    <main className='application-layout'>
      <Routes />
    </main>
  )
}

export default withProviders(App)
