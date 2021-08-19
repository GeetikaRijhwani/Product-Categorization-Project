import './App.css';
import Index from './components/Index';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Rootcategory from './components/Rootcategory';
import Subcategory from './components/Subcategory';
import Products from './components/Products';

function App() {
	return (
		<div className="App">
			<Router>
				<Switch>
					<Route path="/" exact component={Index} />
					<Route path="/category" exact component={Rootcategory} />
					<Route path="/category/subcategory" exact component={Subcategory} />
					<Route path="/category/subcategory/product" exact component={Products} />


				</Switch>
			</Router>
		</div>
	);
}

export default App;
