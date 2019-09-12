import React, { Suspense } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import './App.scss'

import Layout from '../components/Layout/Layout';
import SkitsPage from './SkitsPage/SkitsPage';
import SkitPage from './SkitPage/SkitPage';
import Spinner from '../components/UI/Spinner/Spinner';
const CastPage = React.lazy( () => import('./CastPage/CastPage') );

// import CastMember from './CastMember/CastMember';


function App() {
  return (
	<BrowserRouter>
		<div className="App">
		  <Layout>
			<Switch>
				<Route path="/" exact component={SkitsPage} />
				<Route path="/skits/view/:id" exact component={SkitPage} />
				<Route path="/skits" component={SkitsPage} />
				
				<Route 
					path="/cast" 
					exact 
					render={ () => <Suspense fallback={<Spinner message="טוען..." />}>
							<CastPage />
						</Suspense>
					}
					/>
				<Route path="/cast/:id" exact component={CastPage} />

				<Route render={() => <h1>React 404</h1>} />
			</Switch>
		  </Layout>
		</div>
	</BrowserRouter>
  );
}

export default App;
