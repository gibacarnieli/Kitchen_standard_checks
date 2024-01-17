import Nav from './componentts/Nav.jsx'
import Footer from './componentts/Footer.jsx'
import { Outlet, useNavigation } from 'react-router-dom'

import Spinner from 'react-bootstrap/Spinner'
function App() {

  const navigation = useNavigation()  
  return (
    <>
      <Nav />
      <main>
        {
          navigation.state === 'idle' ?
          <Outlet />
          :
          <div className="centred">
            <Spinner animation='border' />
          </div>
        }
      </main>
      <Footer />
    </>
  )
}
export default App;