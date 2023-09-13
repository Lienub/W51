import { Link, Outlet } from 'react-router-dom';

export default function Root() {
  return (<>
    <header>
      <h2>Welcome to w51 - <Link to="/cocktails">Cocktails</Link></h2>
    </header>
    <main>
      <Outlet />
    </main>
    <footer>
      <em>Made with React & react-router</em>
    </footer>
  </>
  );
}