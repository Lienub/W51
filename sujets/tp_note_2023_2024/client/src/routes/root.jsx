import { Link, Outlet } from 'react-router-dom';

export default function Root() {
  return (<>
    <header>
      <h2>w51 - <Link to="/semestres">Maquette</Link></h2>
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
