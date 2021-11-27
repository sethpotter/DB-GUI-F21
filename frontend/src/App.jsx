import {useRoutes, BrowserRouter} from 'react-router-dom';
import {routes} from "./routes";
import './App.scss';

const Routing = () => {
	return useRoutes(routes);
}

function App () {
  return (
	<>
		<BrowserRouter>
			<Routing/>
		</BrowserRouter>
	</>
  );
}

export default App;
